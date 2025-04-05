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
  selectedService: string;
  message: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await req.formData();

    const fields: Partial<ContactFormData> = {};
    const files: File[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // Check file size before adding
        if (value.size > 50 * 1024 * 1024) {
          return NextResponse.json({ error: `ファイルサイズが50MBを超えています: ${value.name}` }, { status: 413 });
        }
        if (files.length < 10) {
          files.push(value);
        } else {
          // Stop adding files if limit is reached (should also be handled by frontend)
          console.warn('Maximum file count (10) reached. Ignoring extra files.');
          break; // Stop processing further files if limit exceeded
        }
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
      service: 'gmail',
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
選択されたサービス: ${fields.selectedService || '選択なし'}

メッセージ:
${fields.message}

添付ファイル: ${attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : 'なし'}
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    // No temporary files to clean up when using req.formData()

    return NextResponse.json({ message: 'お問い合わせを受け付けました。' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    // Handle potential specific errors if needed
    if (error instanceof Error) {
      // Example: Check for specific error messages or types if applicable
    }
    return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
} 