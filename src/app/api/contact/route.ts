import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Note: config export is not needed for App Router Route Handlers

// Define a type for the expected form fields (optional but good practice)
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  selectedService: string;
  message: string;
}

const MAX_FILES = 5;
const MAX_TOTAL_SIZE_MB = 20;
const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
const MAX_INDIVIDUAL_SIZE_BYTES = 50 * 1024 * 1024; // Keep individual check as safety

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await req.formData();

    const fields: Partial<ContactFormData> = {};
    const files: File[] = [];
    let currentTotalSize = 0;

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // Check total file count
        if (files.length >= MAX_FILES) {
            console.warn(`Maximum file count (${MAX_FILES}) reached on server. Ignoring extra file: ${value.name}`);
            continue; // Skip adding this file
        }
        // Check total size
        if (currentTotalSize + value.size > MAX_TOTAL_SIZE_BYTES) {
            console.warn(`Maximum total size (${MAX_TOTAL_SIZE_MB}MB) exceeded on server. Ignoring file: ${value.name}`);
            continue; 
        }

        files.push(value);
        currentTotalSize += value.size;

      } else {
        // Assign fields, handling potential multiple values if needed (though unlikely for text fields here)
        if (key in fields) {
          // Handle case where a field might appear multiple times (e.g., checkboxes)
          // For this form, we assume single values for text fields
          console.warn(`Duplicate field found: ${key}. Using the first value.`);
        } else {
          fields[key as keyof ContactFormData] = value;
        }
      }
    }
    
    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !fields[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({ error: `必須フィールドが入力されていません: ${missingFields.join(', ')}` }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.lolipop.jp',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const attachments = await Promise.all(files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return {
        filename: file.name,
        content: buffer,
      };
    }));

    const mailOptions = {
      from: process.env.EMAIL_USER || '',
      to: process.env.EMAIL_USER || '',
      subject: '【お問い合わせ】新規のお問い合わせがありました' + (attachments.length > 0 ? ` (${attachments.length}件の添付ファイルあり)` : ''),
      text: `
お名前or法人名等: ${fields.name}
メールアドレス: ${fields.email}
電話番号: ${fields.phone}
選択されたサービス: ${fields.selectedService || '選択なし'}

メッセージ:
${fields.message}

添付ファイル: ${attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : 'なし'}
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    // No temporary files to clean up when using req.formData()

    return NextResponse.json({ message: 'お問い合わせを受け付けました。' }, { status: 200 }); // Original success response
  } catch (error) {
    console.error('Error processing contact form:', error);
    // Handle potential specific errors if needed
    if (error instanceof Error) {
      // Example: Check for specific error messages or types if applicable
    }
    return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
} 