import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { 
    success: false, 
    message: 'Too many requests, please try again later.' 
  }
});

app.use('/api/', limiter);

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Allowed subjects
const ALLOWED_SUBJECTS = [
  "I'm new here",
  "Prayer Request",
  "Inquiry",
  "Book Appointment with Rev. Canon Richard Otieno",
  "Baptism"
];

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  const { name, email, phone, subject, message } = req.body;

  // Input validation
  if (!name || !email || !subject || !message) {
    console.log('Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields'
    });
  }

  // Validate subject
  if (!ALLOWED_SUBJECTS.includes(subject)) {
    console.log('Invalid subject:', subject);
    return res.status(400).json({
      success: false,
      message: 'Please select a valid subject from the dropdown'
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  try {
    // Prepare email content
    const adminMailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: 'ellyman2021@gmail.com',
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-radius: 4px; border-left: 4px solid #2c3e50;">
              <h3 style="margin-top: 0; color: #2c3e50;">Message:</h3>
              <p style="white-space: pre-line;">${message}</p>
            </div>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #7f8c8d;">
            This email was sent from the contact form on ACK St. Jude Miritini website.
          </p>
        </div>
      `
    };

    // Send confirmation email to user
    const userMailOptions = {
  from: `"ACK St. Jude Miritini" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `Thank you for contacting ACK St. Jude Miritini`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; padding: 20px;">
      <h2 style="color: #2c3e50; margin-bottom: 20px; text-align: center;">Thank You for Your Request</h2>
      
      <p style="margin: 30px 0; text-align: center; font-style: italic; color: #555;">
        We have received your request and our team will get back to you shortly.
      </p>
      
      <div style="margin: 40px 0 20px 0; font-family: Arial, sans-serif; line-height: 1.6;">
        <p style="margin: 30px 0 5px 0;">Yours sincerely,</p>
        <p style="margin: 30px 0 5px 0; font-weight: bold;">Vicar</p>
        <p style="margin: 5px 0; color: #333;">ACK St. Jude Miritini Parish</p>
        <p style="margin: 5px 0 0 0; color: #666;">Miritini, Mombasa, Kenya</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #7f8c8d; text-align: center;">
        <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
      </div>
    </div>
  `
};

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('Emails sent successfully');
    res.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});