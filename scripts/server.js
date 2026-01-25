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

// Baptism application endpoint
app.post('/api/baptism', async (req, res) => {
  console.log('Received baptism application:', req.body);
  const {
    parentName,
    parentEmail,
    parentPhone,
    parentAddress,
    candidateName,
    candidateAge,
    candidateBirthDate,
    candidateGender,
    baptismType,
    preferredDate,
    preferredTime,
    godparents,
    additionalInfo,
    isMember,
    hasAttendedClasses,
    agreement
  } = req.body;

  // Input validation
  if (!parentName || !parentEmail || !parentPhone || !candidateName || !candidateAge || !candidateBirthDate || !candidateGender || !baptismType || !preferredDate || !preferredTime) {
    console.log('Missing required baptism fields');
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields'
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(parentEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  // Validate agreement
  if (!agreement) {
    return res.status(400).json({
      success: false,
      message: 'Please agree to the baptism commitment statement'
    });
  }

  try {
    // Prepare email content for admin
    const adminMailOptions = {
      from: `"${parentName}" <${process.env.EMAIL_USER}>`,
      to: 'ellyman2021@gmail.com',
      replyTo: parentEmail,
      subject: `BAPTISM APPLICATION - ${candidateName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 74, 173, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a5f7a 0%, #2c7da0 100%); padding: 30px 20px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: #ffd700; opacity: 0.2; border-radius: 50%; transform: translate(30px, -30px);"></div>
            <div style="position: absolute; bottom: 0; left: 0; width: 80px; height: 80px; background: #ffd700; opacity: 0.15; border-radius: 50%; transform: translate(-20px, 20px);"></div>
            <div style="font-size: 3rem; margin-bottom: 10px;">✝</div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; position: relative; z-index: 1;">Baptism Application</h1>
            <p style="color: #ffd700; margin: 8px 0 0 0; font-size: 16px; font-weight: 500; position: relative; z-index: 1;">ACK St. Jude Miritini Parish</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 25px;">
            <!-- Candidate Information -->
            <div style="background: #ffffff; padding: 25px; border-radius: 10px; border: 1px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0, 74, 173, 0.08); margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 4px; height: 24px; background: linear-gradient(180deg, #ffd700 0%, #ffb347 100%); border-radius: 2px; margin-right: 12px;"></div>
                <h2 style="color: #1a5f7a; margin: 0; font-size: 20px; font-weight: 600;">Candidate Information</h2>
              </div>
              
              <div style="background: #f8f9ff; padding: 20px; border-radius: 8px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${candidateName}</p>
                  </div>
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Age:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${candidateAge}</p>
                  </div>
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Date of Birth:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${candidateBirthDate}</p>
                  </div>
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Gender:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${candidateGender}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Parent/Guardian Information -->
            <div style="background: #ffffff; padding: 25px; border-radius: 10px; border: 1px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0, 74, 173, 0.08); margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 4px; height: 24px; background: linear-gradient(180deg, #ffd700 0%, #ffb347 100%); border-radius: 2px; margin-right: 12px;"></div>
                <h2 style="color: #1a5f7a; margin: 0; font-size: 20px; font-weight: 600;">Parent/Guardian Information</h2>
              </div>
              
              <div style="background: #f8f9ff; padding: 20px; border-radius: 8px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${parentName}</p>
                  </div>
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</span>
                    <p style="margin: 5px 0 0 0;">
                      <a href="mailto:${parentEmail}" style="color: #1a5f7a; text-decoration: none; font-weight: 500;">${parentEmail}</a>
                    </p>
                  </div>
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${parentPhone}</p>
                  </div>
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Address:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${parentAddress || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Baptism Details -->
            <div style="background: #ffffff; padding: 25px; border-radius: 10px; border: 1px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0, 74, 173, 0.08); margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 4px; height: 24px; background: linear-gradient(180deg, #ffd700 0%, #ffb347 100%); border-radius: 2px; margin-right: 12px;"></div>
                <h2 style="color: #1a5f7a; margin: 0; font-size: 20px; font-weight: 600;">Baptism Details</h2>
              </div>
              
              <div style="background: #f8f9ff; padding: 20px; border-radius: 8px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Type:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${baptismType.charAt(0).toUpperCase() + baptismType.slice(1)} Baptism</p>
                  </div>
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Preferred Date:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${preferredDate}</p>
                  </div>
                  <div style="grid-column: 1 / -1;">
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Preferred Time:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${preferredTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Information -->
            ${godparents || additionalInfo ? `
            <div style="background: #ffffff; padding: 25px; border-radius: 10px; border: 1px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0, 74, 173, 0.08); margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 4px; height: 24px; background: linear-gradient(180deg, #ffd700 0%, #ffb347 100%); border-radius: 2px; margin-right: 12px;"></div>
                <h2 style="color: #1a5f7a; margin: 0; font-size: 20px; font-weight: 600;">Additional Information</h2>
              </div>
              
              ${godparents ? `
              <div style="background: linear-gradient(135deg, #fff9e6 0%, #fffef9 100%); padding: 15px; border-radius: 8px; border-left: 4px solid #ffd700; margin-bottom: 15px;">
                <h3 style="margin: 0 0 10px 0; color: #1a5f7a; font-size: 16px; font-weight: 600;">Godparents:</h3>
                <p style="white-space: pre-line; color: #2c3e50; margin: 0; line-height: 1.6; font-size: 14px;">${godparents}</p>
              </div>
              ` : ''}
              
              ${additionalInfo ? `
              <div style="background: linear-gradient(135deg, #fff9e6 0%, #fffef9 100%); padding: 15px; border-radius: 8px; border-left: 4px solid #ffd700;">
                <h3 style="margin: 0 0 10px 0; color: #1a5f7a; font-size: 16px; font-weight: 600;">Additional Information:</h3>
                <p style="white-space: pre-line; color: #2c3e50; margin: 0; line-height: 1.6; font-size: 14px;">${additionalInfo}</p>
              </div>
              ` : ''}
            </div>
            ` : ''}

            <!-- Church Information -->
            <div style="background: #ffffff; padding: 25px; border-radius: 10px; border: 1px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0, 74, 173, 0.08); margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 4px; height: 24px; background: linear-gradient(180deg, #ffd700 0%, #ffb347 100%); border-radius: 2px; margin-right: 12px;"></div>
                <h2 style="color: #1a5f7a; margin: 0; font-size: 20px; font-weight: 600;">Church Information</h2>
              </div>
              
              <div style="background: #f8f9ff; padding: 20px; border-radius: 8px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Church Member:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${isMember ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <span style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Attended Classes:</span>
                    <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${hasAttendedClasses ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #1a5f7a 0%, #2c7da0 100%); padding: 20px; text-align: center;">
            <p style="margin: 0; color: #ffffff; font-size: 12px; opacity: 0.9;">
              This baptism application was submitted on ${new Date().toLocaleDateString()}.
            </p>
            <div style="margin-top: 10px;">
              <span style="color: #ffd700; font-size: 20px;">✝</span>
            </div>
          </div>
        </div>
      `
    };

    // Send confirmation email to parent/guardian
    const userMailOptions = {
      from: `"ACK St. Jude Miritini" <${process.env.EMAIL_USER}>`,
      to: parentEmail,
      subject: `Baptism Application Received - ${candidateName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 74, 173, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a5f7a 0%, #2c7da0 100%); padding: 30px 20px; text-align: center; position: relative;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%); border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center;">
              <span style="color: #ffffff; font-size: 24px; font-weight: bold;">✓</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Baptism Application Received!</h1>
            <p style="color: #ffd700; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">ACK St. Jude Miritini Parish</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px; text-align: center;">
            <div style="background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0, 74, 173, 0.08); margin-bottom: 30px;">
              <h2 style="color: #1a5f7a; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Dear ${parentName},</h2>
              <p style="color: #2c3e50; margin: 0 0 25px 0; line-height: 1.6; font-size: 16px;">
                Thank you for submitting the baptism application for <strong>${candidateName}</strong>. We have received your request and will process it with prayer and care.
              </p>
            </div>
            
            <div style="background: linear-gradient(135deg, #fff9e6 0%, #fffef9 100%); padding: 25px; border-radius: 10px; border: 1px solid #ffe4b5;">
              <h3 style="color: #1a5f7a; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
              <div style="color: #2c3e50; line-height: 1.6; font-size: 15px; text-align: left;">
                <p style="margin: 0 0 10px;">✓ Our parish team will review your application. </p>
                <p style="margin: 0 0 10px;">✓ We will contact you to confirm baptism preparation classes</p>
                <p style="margin: 0 0 10px;">✓ We will finalize the baptism date and time with you</p>
                <p style="margin: 0;">✓ We will provide guidance on godparent selection and ceremony details</p>
              </div>
            </div>
          </div>
          
          <!-- Signature -->
          <div style="padding: 0 30px 30px 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <p style="color: #1a5f7a; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">From the Vicar</p>
              <p style="color: #2c3e50; margin: 5px 0; font-size: 16px; font-weight: 500;">Rev. Canon Richard Otieno</p>
              <p style="color: #666; margin: 5px 0; font-size: 14px;">ACK St. Jude Miritini Parish</p>
            </div>
            <div style="margin-top: 20px;">
              <span style="color: #ffd700; font-size: 24px;">✝</span>
            </div>
          </div>
        </div>
      `
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('Baptism application emails sent successfully');
    res.json({
      success: true,
      message: 'Your baptism application has been submitted successfully! We will contact you within 2-3 business days to discuss the next steps.'
    });

  } catch (error) {
    console.error('Error sending baptism application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit baptism application. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

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
      subject: `${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 74, 173, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #004aad 0%, #0066cc 100%); padding: 30px 20px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: #ffd700; opacity: 0.2; border-radius: 50%; transform: translate(30px, -30px);"></div>
            <div style="position: absolute; bottom: 0; left: 0; width: 80px; height: 80px; background: #ffd700; opacity: 0.15; border-radius: 50%; transform: translate(-20px, 20px);"></div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; position: relative; z-index: 1;">ACK St. Jude Miritini</h1>
            <p style="color: #ffd700; margin: 8px 0 0 0; font-size: 16px; font-weight: 500; position: relative; z-index: 1;">New Contact Form Submission</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 25px;">
            <div style="background: #ffffff; padding: 25px; border-radius: 10px; border: 1px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0, 74, 173, 0.08);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 4px; height: 24px; background: linear-gradient(180deg, #ffd700 0%, #ffb347 100%); border-radius: 2px; margin-right: 12px;"></div>
                <h2 style="color: #004aad; margin: 0; font-size: 20px; font-weight: 600;">Contact Details</h2>
              </div>
              
              <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <div style="margin-bottom: 15px;">
                  <span style="color: #0066cc; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Subject:</span>
                  <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${subject}</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <span style="color: #0066cc; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">From:</span>
                  <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${name}</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <span style="color: #0066cc; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</span>
                  <p style="margin: 5px 0 0 0;">
                    <a href="mailto:${email}" style="color: #004aad; text-decoration: none; font-weight: 500; transition: color 0.3s;">${email}</a>
                  </p>
                </div>
                
                ${phone ? `
                <div style="margin-bottom: 15px;">
                  <span style="color: #0066cc; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone:</span>
                  <p style="color: #2c3e50; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${phone}</p>
                </div>
                ` : ''}
              </div>
              
              <div style="background: linear-gradient(135deg, #fff9e6 0%, #fffef9 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #ffd700;">
                <h3 style="margin: 0 0 15px 0; color: #004aad; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                  <span style="width: 8px; height: 8px; background: #ffd700; border-radius: 50%; margin-right: 10px;"></span>
                  Message:
                </h3>
                <p style="white-space: pre-line; color: #2c3e50; margin: 0; line-height: 1.6; font-size: 15px;">${message}</p>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #004aad 0%, #0066cc 100%); padding: 20px; text-align: center;">
            <p style="margin: 0; color: #ffffff; font-size: 12px; opacity: 0.9;">
              This email was sent from the contact form on ACK St. Jude Miritini website.
            </p>
            <div style="margin-top: 10px;">
              <span style="color: #ffd700; font-size: 20px;">✟</span>
            </div>
          </div>
        </div>
      `
    };

    // Send confirmation email to user
    const userMailOptions = {
      from: `"ACK St. Jude Miritini" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting ACK St. Jude Miritini`,
      html: `    
          <!-- Content -->
          <div style="padding: 40px 30px; text-align: center;">
            <div style="background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0, 74, 173, 0.08); margin-bottom: 30px;">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%); border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center;">
                <span style="color: #ffffff; font-size: 24px; font-weight: bold;">✓</span>
              </div>
              <h2 style="color: #004aad; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">We've Received Your Message</h2>
              <p style="color: #2c3e50; margin: 0 0 25px 0; line-height: 1.6; font-size: 16px;">
                Thank you for reaching out to us. Your message has been successfully received and our team will get back to you shortly.
              </p>
              <div style="background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #ffd700; text-align: left;">
                <p style="margin: 0; color: #0066cc; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Reference:</p>
                <p style="margin: 5px 0 0 0; color: #2c3e50; font-size: 16px; font-weight: 500;">${subject}</p>
              </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #fff9e6 0%, #fffef9 100%); padding: 25px; border-radius: 10px; border: 1px solid #ffe4b5;">
              <h3 style="color: #004aad; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
              <div style="color: #2c3e50; line-height: 1.6; font-size: 15px;">
                <p style="margin: 0 0 10px 0;"> Our team reviews your message</p>
                <p style="margin: 0;"> You'll receive a personalized response</p>
              </div>
            </div>
          </div>
          
          <!-- Signature -->
          <div style="padding: 0 30px 30px 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <p style="color: #0066cc; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">From the Vicar</p>
              <p style="color: #2c3e50; margin: 5px 0; font-size: 16px; font-weight: 500;">Rev. Canon Richard Otieno</p>
              <p style="color: #666; margin: 5px 0; font-size: 14px;">ACK St. Jude Miritini Parish</p>
            </div>
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