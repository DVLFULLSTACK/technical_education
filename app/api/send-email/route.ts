import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

// Định nghĩa kiểu dữ liệu cho body request
interface EmailRequestBody {
  to: string;
  subject: string;
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse body từ request
    const body: EmailRequestBody = await request.json();

    const { to, subject, text } = body;
    console.log(to, subject, text)
    // Kiểm tra dữ liệu đầu vào
    if (!to || !subject || !text) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Cấu hình transporter cho Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Hoặc dùng SMTP server khác
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER as string, // Đảm bảo user không undefined/null
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS as string, // App Password hoặc mật khẩu
      },
    });

    // Nội dung email
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER, // Email gửi
      to, // Email nhận
      subject, // Tiêu đề
      text, // Nội dung
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

    // Trả về phản hồi thành công
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);

    // Trả về lỗi
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}
