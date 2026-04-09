import nodemailer from 'nodemailer';
import { emailTemplates } from './email-templates';

// Initialize email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'elcoderssoftwares12@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

interface WelcomeEmailParams {
  name: string;
  email: string;
  amount?: string;
}

interface BookingConfirmationParams {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

/**
 * Send raw email
 */
export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'elcoderssoftwares12@gmail.com',
      to,
      subject,
      html,
    });
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

/**
 * Send welcome email to new signup
 */
export async function sendWelcomeEmail(params: WelcomeEmailParams) {
  const html = emailTemplates.welcomeEmail(params.name, params.amount);
  
  return sendEmail({
    to: params.email,
    subject: 'Welcome to ELCODERS – Your Kickoff Call & Next Steps',
    html,
  });
}

/**
 * Send booking confirmation email to client
 */
export async function sendBookingConfirmationEmail(params: BookingConfirmationParams) {
  const bookingDate = new Date(params.date);
  const formattedDate = bookingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = emailTemplates.bookingConfirmation({
    name: params.name,
    service: params.service,
    formattedDate,
    time: params.time,
    phone: params.phone,
    email: params.email,
    message: params.message,
  });

  return sendEmail({
    to: params.email,
    subject: `Booking Confirmed - ${params.service} on ${formattedDate}`,
    html,
  });
}

/**
 * Send admin notification for new booking
 */
export async function sendAdminNotificationEmail(params: BookingConfirmationParams) {
  const bookingDate = new Date(params.date);
  const formattedDate = bookingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = emailTemplates.adminNotification({
    name: params.name,
    email: params.email,
    phone: params.phone,
    service: params.service,
    formattedDate,
    time: params.time,
    message: params.message,
  });

  return sendEmail({
    to: process.env.EMAIL_USER || 'elcoderssoftwares12@gmail.com',
    subject: `New Booking Alert - ${params.name} (${params.service})`,
    html,
  });
}
