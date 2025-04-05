import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { IncomingForm, File, Files, Fields } from 'formidable';
import fs from 'fs';
import path from 'path';

// Note: config export is not needed for App Router Route Handlers

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const form = new IncomingForm({
      maxFileSize: 50 * 1024 * 1024, // 50MB per file
      multiples: true, // Allow multiple files for the same field name
    });

    const { fields, files } = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const attachments: { filename: string; content: fs.ReadStream }[] = []; // Explicit type
    const uploadedFiles = files.file ? (Array.isArray(files.file) ? files.file : [files.file]) : [];

    if (uploadedFiles.length > 10) {
      // Although frontend should prevent this, add a backend check
      return NextResponse.json({ error: '添付できるファイルは10個までです。' }, { status: 400 });
    }

    for (const file of uploadedFiles) {
      if (file.originalFilename) {
        attachments.push({
          filename: file.originalFilename,
          content: fs.createReadStream(file.filepath),
        });
      }
    }

    // Extract fields and provide default values if they are arrays (though less likely here)
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name || '';
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email || '';
    const selectedService = Array.isArray(fields.selectedService) ? fields.selectedService[0] : fields.selectedService || '';
    const message = Array.isArray(fields.message) ? fields.message[0] : fields.message || '';

    const mailOptions = {
      from: process.env.EMAIL_USER || '',
      to: process.env.EMAIL_USER || '',
      subject: '【お問い合わせ】新規のお問い合わせがありました' + (attachments.length > 0 ? ` (${attachments.length}件の添付ファイルあり)` : ''),
      text: `
お名前or法人名等: ${name}
メールアドレス: ${email}
選択されたサービス: ${selectedService}

メッセージ:
${message}

添付ファイル: ${attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : 'なし'}
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    // Clean up temporary files
    for (const file of uploadedFiles) {
      fs.unlinkSync(file.filepath);
    }

    return NextResponse.json({ message: 'お問い合わせを受け付けました。' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    // Check if the error is a formidable error (e.g., file size limit exceeded)
    if (error instanceof Error && 'httpCode' in error) {
      const formidableError = error as any;
      if (formidableError.httpCode === 413) { // Payload Too Large
        return NextResponse.json({ error: 'ファイルサイズが大きすぎます。50MB以下にしてください。' }, { status: 413 });
      }
    }
    return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
} 