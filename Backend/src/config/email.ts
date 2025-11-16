import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} as nodemailer.TransportOptions);

// Verify connection
transporter.verify((error: Error | null) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('📧 Email transporter ready');
  }
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const mailOptions = {
      from: `"BTMC Foundation" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to: ${options.to}`);
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to BTMC Foundation!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Welcome to BTMC Foundation!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for joining the BTMC Foundation community. We're excited to have you with us!</p>
        <p>You can now access all our courses, events, and spiritual resources.</p>
        <p>If you have any questions, feel free to reach out to us.</p>
        <br>
        <p>With blessings,<br>The BTMC Foundation Team</p>
      </div>
    `
  }),
  enrollmentConfirmation: (name: string, courseName: string) => ({
    subject: `Enrollment Confirmation - ${courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Enrollment Confirmed!</h2>
        <p>Dear ${name},</p>
        <p>Your enrollment in <strong>${courseName}</strong> has been confirmed.</p>
        <p>We look forward to having you in our course. You will receive further instructions soon.</p>
        <br>
        <p>With blessings,<br>The BTMC Foundation Team</p>
      </div>
    `
  })
};

export default transporter;