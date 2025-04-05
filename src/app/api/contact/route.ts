import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'すべてのフィールドを入力してください。' }, { status: 400 });
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASSWORD;

    if (!user || !pass) {
      console.error('Email credentials missing in environment variables.');
      return NextResponse.json({ error: 'サーバー設定エラーが発生しました。' }, { status: 500 });
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.lolipop.jp',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: user,
        pass: pass,
      },
      // Increase timeout to avoid connection issues
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000, // 10 seconds
      socketTimeout: 10000, // 10 seconds
    });

    // Verify connection configuration (optional, good for debugging)
    try {
        await transporter.verify();
        console.log('Server is ready to take our messages');
    } catch (verifyError) {
        console.error('Transporter verification failed:', verifyError);
        // Don't necessarily fail the request here, but log it
    }


    // Email options
    const mailOptions = {
      from: `"Webサイトお問い合わせ" <${user}>`, // Sender address (must be your email)
      to: user, // List of receivers (your email address)
      replyTo: email, // Set reply-to to the user's email
      subject: `Webサイトお問い合わせ: ${subject}`, // Subject line
      html: `
        <h1>Webサイトからのお問い合わせ</h1>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>件名:</strong> ${subject}</p>
        <hr>
        <p><strong>メッセージ内容:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>このメールは ${new Date().toLocaleString('ja-JP')} に送信されました。</small></p>
      `, // HTML body
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'お問い合わせありがとうございます。メッセージは正常に送信されました。' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    // Provide a generic error message to the client
    return NextResponse.json({ error: 'メッセージの送信中にエラーが発生しました。しばらくしてからもう一度お試しください。' }, { status: 500 });
  }
} 