import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Define a type for the expected form fields
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  selectedService: string;
  message: string;
}

// File processing constants
const MAX_FILES = 5;
const MAX_TOTAL_SIZE_MB = 20;
const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
const MAX_INDIVIDUAL_SIZE_BYTES = 50 * 1024 * 1024; // Keep individual check as safety

// Cached transporter for better performance
let cachedTransporter: nodemailer.Transporter | null = null;

// Utility function to get or create mailer transporter
const getTransporter = async (): Promise<nodemailer.Transporter> => {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  // Create new transporter if not cached
  const transporter = nodemailer.createTransport({
    host: 'smtp.lolipop.jp',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Verify connection configuration
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    cachedTransporter = transporter; // Cache for future use
    return transporter;
  } catch (error) {
    console.error('SMTP verification failed:', error);
    throw new Error('Failed to connect to email server');
  }
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const startTime = Date.now(); // Performance tracking
  
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await req.formData();

    // Process form data - use separate variables for better performance
    const fields: Partial<ContactFormData> = {};
    const files: File[] = [];
    let currentTotalSize = 0;

    // Process form data entries in parallel with Promise.all
    await Promise.all(
      Array.from(formData.entries()).map(async ([key, value]) => {
        if (value instanceof File) {
          // Skip empty files (zero bytes)
          if (value.size === 0) {
            return;
          }
          
          // Check total file count
          if (files.length >= MAX_FILES) {
            console.warn(`Maximum file count (${MAX_FILES}) reached on server. Ignoring extra file: ${value.name}`);
            return;
          }
          
          // Check individual file size
          if (value.size > MAX_INDIVIDUAL_SIZE_BYTES) {
            console.warn(`File size exceeds individual limit: ${value.name} (${(value.size / (1024 * 1024)).toFixed(2)}MB)`);
            return;
          }
          
          // Check if adding this file would exceed total size limit
          if (currentTotalSize + value.size > MAX_TOTAL_SIZE_BYTES) {
            console.warn(`Maximum total size (${MAX_TOTAL_SIZE_MB}MB) exceeded on server. Ignoring file: ${value.name}`);
            return;
          }

          // File passed all checks, add it
          files.push(value);
          currentTotalSize += value.size;
        } else {
          // Handle form fields
          fields[key as keyof ContactFormData] = value.toString();
        }
      })
    );
    
    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !fields[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({ error: `必須フィールドが入力されていません: ${missingFields.join(', ')}` }, { status: 400 });
    }

    // Process files in parallel
    const attachments = await Promise.all(
      files.map(async (file) => {
        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          return {
            filename: file.name,
            content: buffer,
          };
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          // Return a placeholder for failed file
          return {
            filename: `${file.name} (処理エラー)`,
            content: Buffer.from('File processing failed'),
          };
        }
      })
    );

    try {
      // Get or create transporter (cached for better performance)
      const transporter = await getTransporter();
      
      // Generate service emoji for subject line
      let serviceEmoji = '';
      switch (fields.selectedService) {
        case 'high-pressure': serviceEmoji = '💦'; break;
        case 'tile-cleaning': serviceEmoji = '🧹'; break;
        case 'carpet-cleaning': serviceEmoji = '✨'; break;
      }
      
      // Prepare and send email with better formatting
      const mailOptions = {
        from: process.env.EMAIL_USER || '',
        to: process.env.EMAIL_USER || '',
        subject: `${serviceEmoji}【お問い合わせ】新規のお問い合わせがありました` + 
                (attachments.length > 0 ? ` (${attachments.length}件の添付ファイルあり)` : ''),
        text: `
=================================
【新規お問い合わせ】
=================================

■ お客様情報
---------------------------------
お名前/法人名: ${fields.name}
メールアドレス: ${fields.email}
電話番号: ${fields.phone}
選択サービス: ${fields.selectedService || '指定なし'}
---------------------------------

■ メッセージ内容
---------------------------------
${fields.message}
---------------------------------

■ 添付ファイル情報
---------------------------------
${attachments.length > 0 
  ? attachments.map((a, index) => `${index + 1}. ${a.filename} (${(a.content.length / 1024).toFixed(1)}KB)`).join('\n')
  : 'なし'
}
=================================
処理時間: ${Date.now() - startTime}ms
        `,
        attachments,
      };

      // Send the email asynchronously
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully with ${attachments.length} attachments`);

      return NextResponse.json({
        message: 'お問い合わせを受け付けました。24時間以内に担当者よりご連絡いたします。',
        filesProcessed: files.length
      }, { status: 200 });
      
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json({ 
        error: 'メール送信中にエラーが発生しました。しばらく経ってからもう一度お試しください。' 
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Handle potential specific errors
    if (error instanceof Error) {
      if (error.message.includes('email server')) {
        return NextResponse.json({ error: 'メールサーバーに接続できませんでした。' }, { status: 503 });
      }
    }
    
    return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
  } finally {
    // Log total processing time
    console.log(`Total request processing time: ${Date.now() - startTime}ms`);
  }
} 