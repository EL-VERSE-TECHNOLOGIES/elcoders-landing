// Test email connection
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testEmailConnection() {
  console.log('\n🔍 Testing Email Configuration...\n');
  
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  console.log('EMAIL_USER:', emailUser);
  console.log('EMAIL_PASSWORD length:', emailPassword?.length);
  
  if (!emailUser || !emailPassword) {
    console.error('❌ Missing credentials!');
    return;
  }
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
    
    console.log('\n📧 Verifying Gmail connection...');
    const verified = await transporter.verify();
    
    if (verified) {
      console.log('✅ Gmail connection successful!');
      console.log('\nAttempting to send test email...\n');
      
      const info = await transporter.sendMail({
        from: emailUser,
        to: emailUser,
        subject: 'ELCODERS - Test Email',
        html: '<p>If you see this, email sending works! ✅</p>',
      });
      
      console.log('✅ Test email sent!');
      console.log('Message ID:', info.messageId);
    } else {
      console.error('❌ Gmail connection failed verification');
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
  }
}

testEmailConnection();
