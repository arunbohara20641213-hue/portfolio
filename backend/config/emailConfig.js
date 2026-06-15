import nodemailer from 'nodemailer';

// Create transporter for Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Gmail App Password (16-character password)
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('✅ Email service configured and ready');
  }
});

export default transporter;
