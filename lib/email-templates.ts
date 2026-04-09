/**
 * Email Templates for ELCODERS
 */

const emailBase = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #333; 
        line-height: 1.6;
      }
      .container { 
        max-width: 600px; 
        margin: 0 auto; 
        padding: 20px; 
        background: #f8f9fa;
      }
      .wrapper {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .header { 
        background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); 
        color: white; 
        padding: 30px 20px; 
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
      }
      .header p {
        margin: 8px 0 0 0;
        font-size: 14px;
        opacity: 0.9;
      }
      .content { 
        padding: 30px 20px; 
      }
      .section {
        margin-bottom: 25px;
      }
      .section h2 {
        font-size: 18px;
        color: #0ea5e9;
        margin-top: 0;
        margin-bottom: 15px;
        font-weight: 600;
      }
      .step {
        background: #f0f9ff;
        border-left: 4px solid #0ea5e9;
        padding: 15px;
        margin: 12px 0;
        border-radius: 4px;
      }
      .step-title {
        font-weight: 600;
        color: #0ea5e9;
        margin: 0 0 8px 0;
        font-size: 15px;
      }
      .step p {
        margin: 5px 0;
        font-size: 14px;
      }
      .link-box {
        display: inline-block;
        background: #0ea5e9;
        color: white;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        margin: 8px 0;
        font-size: 14px;
      }
      .link-box:hover {
        background: #0284c7;
      }
      .details { 
        background: white; 
        padding: 15px; 
        border-left: 4px solid #0ea5e9; 
        margin: 10px 0;
        border-radius: 4px;
      }
      .details p {
        margin: 8px 0;
        font-size: 14px;
      }
      .details strong { 
        color: #1e293b; 
      }
      .footer { 
        border-top: 1px solid #e5e7eb;
        padding: 20px;
        text-align: center; 
        color: #666; 
        font-size: 12px;
        background: #f8f9fa;
      }
      .footer p {
        margin: 5px 0;
      }
      .discount-box {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
        color: white;
        padding: 20px;
        border-radius: 8px;
        margin: 15px 0;
        text-align: center;
      }
      .discount-code {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 2px;
        margin: 10px 0;
        font-family: 'Courier New', monospace;
      }
      .logo {
        font-weight: 700;
        font-size: 16px;
        color: #0ea5e9;
      }
      a {
        color: #0ea5e9;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      .social-links {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #e5e7eb;
      }
      .social-links a {
        display: inline-block;
        margin-right: 15px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="wrapper">
        ${content}
      </div>
    </div>
  </body>
</html>
`;

export const emailTemplates = {
  /**
   * Welcome email sent immediately after signup
   * EMAIL 1 (Immediate - 0 min after signup)
   */
  welcomeEmail: (userName: string, amount?: string) => {
    const content = `
      <div class="header">
        <div style="margin-bottom: 15px;">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="ELCODERS" style="max-width: 200px; height: auto; display: inline-block;">
        </div>
        <h1 style="margin: 15px 0 5px 0;">Welcome to ELCODERS</h1>
        <p style="margin: 0; font-size: 16px;">You're in. Let's ship code.</p>
      </div>
      
      <div class="content">
        <p>Hi <strong>${userName}</strong>,</p>
        
        <p style="font-size: 16px; font-weight: 500; color: #0ea5e9; margin: 20px 0;">You're in. Welcome to ELCODERS.</p>
        
        <p style="font-size: 15px; margin-bottom: 25px;">Here's what happens next:</p>
        
        <div class="step" style="background: #f8fcff; border-left: 5px solid #0ea5e9;">
          <div class="step-title" style="font-size: 16px;">📅 STEP 1: Your Kickoff Call</div>
          <p style="margin: 8px 0 12px 0; font-size: 14px;">
            <a href="https://calendly.com/elcoderssoftwares12/30min" style="color: #0ea5e9; font-weight: 600; text-decoration: none;">https://calendly.com/elcoderssoftwares12/30min</a>
          </p>
        </div>
        
        <div class="step" style="background: #f8fcff; border-left: 5px solid #0ea5e9; margin-top: 15px;">
          <div class="step-title" style="font-size: 16px;">⏱️ STEP 2: Before the Call (5 min prep)</div>
          <ul style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li>Have your GitHub/Lab repo URL ready</li>
            <li>Know the ONE bug or task you want fixed first</li>
            <li>That's it. No SOW. No paperwork.</li>
          </ul>
        </div>
        
        <div class="step" style="background: #f8fcff; border-left: 5px solid #0ea5e9; margin-top: 15px;">
          <div class="step-title" style="font-size: 16px;">🎁 STEP 3: Your Discount</div>
          <p style="margin: 8px 0; font-size: 14px;">Code <strong>ELVERSE40</strong> is active. First 7 days at 40% off.</p>
          ${amount ? `<p style="margin: 8px 0; font-size: 14px; color: #1e293b;">Your card will be charged <strong>$${amount}/day</strong> starting tomorrow.</p>` : '<p style="margin: 8px 0; font-size: 14px; color: #1e293b;">Your card will be charged starting tomorrow.</p>'}
        </div>
        
        <div class="section" style="margin-top: 25px; padding-top: 25px; border-top: 2px solid #e5e7eb;">
          <p style="font-size: 15px; margin: 0 0 12px 0;"><strong>📞 Need to reschedule?</strong></p>
          <p style="margin: 8px 0; font-size: 14px;">
            <a href="https://calendly.com/elcoderssoftwares12/30min" style="color: #0ea5e9; font-weight: 600; text-decoration: none;">https://calendly.com/elcoderssoftwares12/30min</a>
          </p>
          <p style="margin: 8px 0; font-size: 14px;">
            <a href="https://elcoders-devs.vercel.app/" style="color: #0ea5e9; font-weight: 600; text-decoration: none;">https://elcoders-devs.vercel.app/</a>
          </p>
        </div>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 14px; line-height: 1.8;">
          Talk soon,<br><br>
          <strong style="font-size: 15px;">Cebastian Jerry</strong><br>
          <span style="color: #666;">Sales, ELCODERS</span><br>
          <span style="color: #666;">EL VERSE TECHNOLOGIES</span>
        </p>
      </div>
      
      <div class="footer">
        <p><strong class="logo" style="font-size: 18px;">ELCODERS</strong></p>
        <p style="color: #999; font-size: 11px; margin-top: 10px;">Daily Velocity. Zero Fluff.</p>
        <div class="social-links">
          <a href="https://wa.link/oktez7">WhatsApp</a>
          <a href="https://x.com/ElVerse27">Twitter</a>
          <a href="https://elcoders-devs.vercel.app/">Website</a>
        </div>
        <p>&copy; 2026 EL VERSE TECHNOLOGIES. All rights reserved.</p>
      </div>
    `;
    return emailBase(content);
  },

  /**
   * Booking confirmation email sent to client
   */
  bookingConfirmation: (params: {
    name: string;
    service: string;
    formattedDate: string;
    time: string;
    phone: string;
    email: string;
    message?: string;
  }) => {
    const content = `
      <div class="header">
        <h1>Booking Confirmed! 🎉</h1>
        <p>Your appointment with ELCODERS has been scheduled.</p>
      </div>
      
      <div class="content">
        <p>Hi ${params.name},</p>
        
        <h2 style="color: #0ea5e9; margin-bottom: 15px;">Appointment Details</h2>
        
        <div class="details">
          <p><strong>Service:</strong> ${params.service}</p>
          <p><strong>Date:</strong> ${params.formattedDate}</p>
          <p><strong>Time:</strong> ${params.time}</p>
        </div>

        <div class="details">
          <p><strong>Contact:</strong> ${params.phone}</p>
          <p><strong>Email:</strong> ${params.email}</p>
        </div>

        ${params.message ? `
        <div class="details">
          <p><strong>Project Details:</strong></p>
          <p>${params.message.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}

        <div class="section">
          <h2>What's Next</h2>
          <p>Our team will reach out to you shortly to confirm the appointment. We'll send you a meeting link 24 hours before your scheduled time.</p>
          
          <p><strong>Quick Links:</strong></p>
          <ul style="padding-left: 20px;">
            <li><a href="https://wa.link/oktez7">Chat with us on WhatsApp</a></li>
            <li><a href="mailto:elcoderssoftwares12@gmail.com">Send us an email</a></li>
            <li><a href="https://x.com/ElVerse27">Follow us on Twitter</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer">
        <p><strong class="logo">ELCODERS</strong> - Daily Velocity, Zero Fluff</p>
        <p>&copy; 2026 EL VERSE TECHNOLOGIES. All rights reserved.</p>
      </div>
    `;
    return emailBase(content);
  },

  /**
   * Admin notification email for new booking
   */
  adminNotification: (params: {
    name: string;
    email: string;
    phone: string;
    service: string;
    formattedDate: string;
    time: string;
    message?: string;
  }) => {
    const content = `
      <div class="header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
        <h1>New Booking Alert 📬</h1>
      </div>
      
      <div class="content">
        <h2 style="color: #1e293b; margin-bottom: 15px;">Client Information</h2>
        
        <div class="details">
          <p><strong>Name:</strong> ${params.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${params.email}">${params.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${params.phone}">${params.phone}</a></p>
        </div>

        <h2 style="color: #1e293b; margin-bottom: 15px;">Booking Details</h2>
        
        <div class="details">
          <p><strong>Service:</strong> ${params.service}</p>
          <p><strong>Date:</strong> ${params.formattedDate}</p>
          <p><strong>Time:</strong> ${params.time}</p>
        </div>

        ${params.message ? `
        <h2 style="color: #1e293b; margin-bottom: 15px;">Project Details</h2>
        <div class="details">
          <p>${params.message.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}

        <div class="section">
          <p style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 0;">
            <strong>⚠️ Action Required:</strong> Please reach out to the client to confirm the booking and send the meeting details.
          </p>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>ELCODERS Admin Panel</strong></p>
        <p>&copy; 2026 EL VERSE TECHNOLOGIES. All rights reserved.</p>
      </div>
    `;
    return emailBase(content);
  },

  /**
   * OTP verification email
   */
  otpCode: (userName: string, otp: string) => {
    const content = `
      <div class="header">
        <h1>Verify Your Email 🔐</h1>
        <p>Your one-time password</p>
      </div>
      
      <div class="content">
        <p>Hi ${userName},</p>
        
        <p>To complete your signup with ELCODERS, please verify your email address using the code below:</p>
        
        <div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 30px; text-align: center; margin: 25px 0;">
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; font-weight: 600; text-transform: uppercase;">Your Verification Code</p>
          <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0ea5e9; font-family: 'Courier New', monospace; margin: 0;">
            ${otp}
          </div>
          <p style="margin: 15px 0 0 0; font-size: 12px; color: #666;">Valid for 10 minutes</p>
        </div>
        
        <div class="step">
          <div class="step-title">⏱️ This code expires in 10 minutes</div>
          <p>If you didn't request this code, you can safely ignore this email.</p>
        </div>
        
        <div class="section">
          <h2>What happens next?</h2>
          <p>After verifying your email:</p>
          <ul style="padding-left: 20px;">
            <li>You'll be welcomed to ELCODERS</li>
            <li>Receive your kickoff call link</li>
            <li>Get the ELVERSE40 discount code (40% off)</li>
            <li>Start shipping code within 24 hours</li>
          </ul>
        </div>
        
        <div class="section">
          <p style="color: #666; font-size: 12px;">
            <strong>Security Note:</strong> Never share your verification code with anyone. ELCODERS will never ask for your code via email, phone, or social media.
          </p>
        </div>
      </div>
      
      <div class="footer">
        <p><strong class="logo">ELCODERS</strong> - Daily Velocity, Zero Fluff</p>
        <p>&copy; 2026 EL VERSE TECHNOLOGIES. All rights reserved.</p>
      </div>
    `;
    return emailBase(content);
  },
};
