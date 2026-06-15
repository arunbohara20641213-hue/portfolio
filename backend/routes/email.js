import transporter from '../config/emailConfig.js';

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name, email, and message',
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address',
    });
  }

  try {
    // Send email to portfolio owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'arunbohara20641213@gmail.com',
      subject: `New Message from ${name} - Portfolio Contact`,
      text: `
You have received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Message:
${message}
      `,
      replyTo: email, // Reply directly to the visitor
    });

    // Send confirmation email to visitor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Message Received - Arun Bohara Portfolio',
      text: `
Hi ${name},

Thank you for reaching out! I've received your message and will get back to you as soon as possible.

Best regards,
Arun Bohara
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully! I will get back to you soon.',
    });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
    });
  }
};
