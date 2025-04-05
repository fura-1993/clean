import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { IncomingForm, File, Files, Fields } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

type FormFields = {
  name: string
  email: string
  selectedService: string
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const form = new IncomingForm({
      maxFileSize: 50 * 1024 * 1024, // 50MB
    })

    const { fields, files } = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        resolve({ fields, files })
      })
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const attachments = []
    if (files.file) {
      const file = Array.isArray(files.file) ? files.file[0] : files.file
      if (file.originalFilename) {
        attachments.push({
          filename: file.originalFilename,
          content: fs.createReadStream(file.filepath),
        })
      }
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || '',
      to: process.env.EMAIL_USER || '',
      subject: '【お問い合わせ】新規のお問い合わせがありました',
      text: `
お名前or法人名等: ${fields.name}
メールアドレス: ${fields.email}
選択されたサービス: ${fields.selectedService}

メッセージ:
${fields.message}
      `,
      attachments,
    }

    await transporter.sendMail(mailOptions)

    // Clean up temporary files
    if (files.file) {
      const file = Array.isArray(files.file) ? files.file[0] : files.file
      fs.unlinkSync(file.filepath)
    }

    res.status(200).json({ message: 'お問い合わせを受け付けました。' })
  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({ error: 'サーバーエラーが発生しました。' })
  }
} 