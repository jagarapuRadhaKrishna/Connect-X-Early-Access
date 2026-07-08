import nodemailer from 'nodemailer';
import { config } from '../config';
import { Student, EmailLog } from '../models';
import { getEarlyAccessTemplate } from '../templates/earlyAccessTemplate';
import { getCandidateApplicationTemplate } from '../templates/candidateApplicationTemplate';

/**
 * Create and configure the Nodemailer transporter
 * Reads SMTP credentials from environment variables for security
 */
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});

/**
 * Verify transporter connection during server startup
 */
export const verifyTransporter = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('✅ Email transporter verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error);
    return false;
  }
};

/**
 * Send Early Access Confirmation Email
 * Uses the new responsive HTML template
 * Returns success/failure without throwing errors (non-blocking)
 */
export const sendEarlyAccessEmail = async (name: string, email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const firstName = name.split(' ')[0] || name;
    const mailOptions = {
      from: config.email.from,
      to: email,
      subject: 'Welcome to ConnectX Early Access! 🎉',
      html: getEarlyAccessTemplate(firstName)
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Early Access email sent to ${email}`);

    return { success: true, message: 'Confirmation email sent.' };
  } catch (error) {
    console.error('❌ Failed to send Early Access email:', error);
    return { success: true, message: 'Submission saved successfully. Email could not be sent.' };
  }
};

/**
 * Legacy sendWelcomeEmail - kept for backward compatibility
 * Now uses the new template
 */
export const sendWelcomeEmail = async (student: Student): Promise<void> => {
  try {
    const firstName = student.full_name.split(' ')[0] || student.full_name;
    const mailOptions = {
      from: config.email.from,
      to: student.email,
      subject: 'Welcome to ConnectX Early Access! 🎉',
      html: getEarlyAccessTemplate(firstName)
    };

    await transporter.sendMail(mailOptions);

    // Log email
    await EmailLog.create({
      student_id: student.id,
      email_type: 'welcome',
      recipient: student.email,
      subject: 'Welcome to ConnectX Early Access!',
      status: 'sent',
      sent_at: new Date()
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    
    // Log failed email
    await EmailLog.create({
      student_id: student.id,
      email_type: 'welcome',
      recipient: student.email,
      subject: 'Welcome to ConnectX Early Access!',
      status: 'failed',
      error_message: error instanceof Error ? error.message : 'Unknown error'
    });
    
    throw error;
  }
};

export const sendApprovalEmail = async (student: Student): Promise<void> => {
  try {
    const mailOptions = {
      from: config.email.from,
      to: student.email,
      subject: 'Congratulations! Your ConnectX Early Access is Approved 🎊',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ConnectX Early Access Approved</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #22C55E 0%, #16a34a 100%);
              border-radius: 10px;
              padding: 40px;
              color: white;
            }
            .content {
              background: white;
              border-radius: 10px;
              padding: 30px;
              margin-top: 20px;
              color: #333;
            }
            .button {
              display: inline-block;
              background: #22C55E;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎉 Congratulations!</h1>
          </div>
          <div class="content">
            <p>Dear ${student.full_name},</p>
            <p>We're excited to inform you that your ConnectX Early Access application has been <strong>APPROVED</strong>!</p>
            
            <p><strong>Registration ID:</strong> ${student.registration_id}</p>
            
            <p>You now have exclusive early access to ConnectX's AI-powered career platform. Get ready to experience:</p>
            <ul>
              <li>AI Resume Builder with ATS optimization</li>
              <li>Career Copilot for personalized guidance</li>
              <li>Mock interviews with AI feedback</li>
              <li>Professional networking opportunities</li>
              <li>And much more!</li>
            </ul>
            
            <p>We'll notify you when the platform is ready for you to explore. Keep an eye on your inbox for launch announcements!</p>
            
            <p>Best regards,<br>The ConnectX Team</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    await EmailLog.create({
      student_id: student.id,
      email_type: 'approval',
      recipient: student.email,
      subject: 'Congratulations! Your ConnectX Early Access is Approved',
      status: 'sent',
      sent_at: new Date()
    });
  } catch (error) {
    console.error('Failed to send approval email:', error);
    
    await EmailLog.create({
      student_id: student.id,
      email_type: 'approval',
      recipient: student.email,
      subject: 'Congratulations! Your ConnectX Early Access is Approved',
      status: 'failed',
      error_message: error instanceof Error ? error.message : 'Unknown error'
    });
    
    throw error;
  }
};

export const sendRejectionEmail = async (student: Student, reason: string): Promise<void> => {
  try {
    const mailOptions = {
      from: config.email.from,
      to: student.email,
      subject: 'Update on Your ConnectX Early Access Application',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ConnectX Application Update</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 10px;
              padding: 40px;
              color: white;
            }
            .content {
              background: white;
              border-radius: 10px;
              padding: 30px;
              margin-top: 20px;
              color: #333;
            }
            .reason {
              background: #fef3f3;
              border-left: 4px solid #EF4444;
              padding: 15px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Application Update</h1>
          </div>
          <div class="content">
            <p>Dear ${student.full_name},</p>
            <p>Thank you for your interest in ConnectX Early Access. After careful review, we regret to inform you that your application could not be approved at this time.</p>
            
            <div class="reason">
              <strong>Reason:</strong><br>
              ${reason}
            </div>
            
            <p>Please don't be discouraged. We encourage you to apply again in the future when you meet the requirements. ConnectX is continuously evolving, and we'd love to have you as part of our community.</p>
            
            <p>If you have any questions or would like more information, please feel free to reach out to our support team.</p>
            
            <p>Best regards,<br>The ConnectX Team</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    await EmailLog.create({
      student_id: student.id,
      email_type: 'rejection',
      recipient: student.email,
      subject: 'Update on Your ConnectX Early Access Application',
      status: 'sent',
      sent_at: new Date()
    });
  } catch (error) {
    console.error('Failed to send rejection email:', error);
    
    await EmailLog.create({
      student_id: student.id,
      email_type: 'rejection',
      recipient: student.email,
      subject: 'Update on Your ConnectX Early Access Application',
      status: 'failed',
      error_message: error instanceof Error ? error.message : 'Unknown error'
    });
    
    throw error;
  }
};

export const sendLaunchAnnouncementEmail = async (student: Student): Promise<void> => {
  try {
    const mailOptions = {
      from: config.email.from,
      to: student.email,
      subject: '🚀 ConnectX is Now Live! Your Early Access Awaits',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ConnectX is Live!</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #E63946 0%, #ff6b6b 100%);
              border-radius: 10px;
              padding: 40px;
              color: white;
            }
            .content {
              background: white;
              border-radius: 10px;
              padding: 30px;
              margin-top: 20px;
              color: #333;
            }
            .button {
              display: inline-block;
              background: #E63946;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 We're Live!</h1>
          </div>
          <div class="content">
            <p>Dear ${student.full_name},</p>
            <p>The moment you've been waiting for is here - <strong>ConnectX is now LIVE!</strong></p>
            
            <p>As an Early Access member, you can now:</p>
            <ul>
              <li>Build your AI-powered resume</li>
              <li>Get personalized career guidance</li>
              <li>Connect with top companies</li>
              <li>Access exclusive job opportunities</li>
            </ul>
            
            <p>Log in now using your registration ID: <strong>${student.registration_id}</strong></p>
            
            <a href="https://connectx.ai/login" class="button">Access ConnectX Now</a>
            
            <p>Welcome to the future of career development!</p>
            
            <p>Best regards,<br>The ConnectX Team</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    await EmailLog.create({
      student_id: student.id,
      email_type: 'launch_announcement',
      recipient: student.email,
      subject: 'ConnectX is Now Live! Your Early Access Awaits',
      status: 'sent',
      sent_at: new Date()
    });
  } catch (error) {
    console.error('Failed to send launch announcement email:', error);
    
    await EmailLog.create({
      student_id: student.id,
      email_type: 'launch_announcement',
      recipient: student.email,
      subject: 'ConnectX is Now Live! Your Early Access Awaits',
      status: 'failed',
      error_message: error instanceof Error ? error.message : 'Unknown error'
    });
    
    throw error;
  }
};

/**
 * Send Candidate Job Application Confirmation Email
 * Uses the new responsive HTML template
 * Returns success/failure without throwing errors (non-blocking)
 */
export const sendCandidateApplicationEmail = async (
  candidateName: string,
  candidateEmail: string,
  jobTitle: string,
  applicationId: string,
  applicationDate: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const firstName = candidateName.split(' ')[0] || candidateName;
    const mailOptions = {
      from: config.email.from,
      to: candidateEmail,
      subject: "We've Received Your Job Application",
      html: getCandidateApplicationTemplate(firstName, jobTitle, applicationId, applicationDate)
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Candidate application email sent to ${candidateEmail}`);

    return { success: true, message: 'Confirmation email sent.' };
  } catch (error) {
    console.error('❌ Failed to send candidate application email:', error);
    return { success: true, message: 'Submission saved successfully. Email could not be sent.' };
  }
};

export const sendCareerConfirmationEmail = async (candidateName: string, email: string, jobTitle: string): Promise<void> => {
  try {
    const mailOptions = {
      from: config.email.from,
      to: email,
      subject: 'Thank You for Applying to ConnectX 🚀',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #1e293b;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
              border-radius: 12px 12px 0 0;
              padding: 30px;
              color: white;
              text-align: center;
            }
            .content {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-top: none;
              border-radius: 0 0 12px 12px;
              padding: 30px;
            }
            h1 { margin: 0; font-size: 24px; font-weight: 800; }
            p { margin: 0 0 16px 0; }
            .footer {
              text-align: center;
              margin-top: 35px;
              color: #64748b;
              font-size: 12px;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ConnectX Careers</h1>
          </div>
          <div class="content">
            <p>Hi ${candidateName},</p>
            <p>Thank you for applying for the <strong>${jobTitle}</strong> position at <strong>ConnectX</strong>.</p>
            <p>We truly appreciate the time and effort you invested in submitting your application and learning more about our company.</p>
            <p>Our recruitment team is currently reviewing your application. If your profile matches our requirements, we'll reach out to you regarding the next steps in the hiring process.</p>
            <p>We appreciate your interest in becoming a part of ConnectX and wish you the very best.</p>
            <p>Best Regards,</p>
            <p><strong>ConnectX Talent Team</strong><br>📧 <a href="mailto:${config.email.careerEmail}">${config.email.careerEmail}</a></p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
            <p>&copy; 2026 ConnectX. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Failed to send career confirmation email:', error)
    throw error
  }
}

export const sendCareerHRNotificationEmail = async (details: {
  candidateName: string
  email: string
  phone: string
  jobTitle: string
  experience: string
  location: string
  resumeUrl: string
  date: string
}): Promise<void> => {
  try {
    const mailOptions = {
      from: config.email.from,
      to: config.email.careerEmail,
      subject: `New Career Application - ${details.candidateName} - ${details.jobTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 25px;
              background-color: #fafafa;
            }
            h2 { color: #d32f2f; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            td { padding: 8px 0; border-bottom: 1px solid #eee; }
            td.label { font-weight: bold; width: 130px; color: #555; }
            .btn {
              display: inline-block;
              background: #d32f2f;
              color: white !important;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 20px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>New Career Application Received</h2>
            <p>A new job application has been received with the following candidate details:</p>
            
            <table>
              <tr>
                <td class="label">Name:</td>
                <td>${details.candidateName}</td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td>${details.email}</td>
              </tr>
              <tr>
                <td class="label">Phone:</td>
                <td>${details.phone}</td>
              </tr>
              <tr>
                <td class="label">Position:</td>
                <td>${details.jobTitle}</td>
              </tr>
              <tr>
                <td class="label">Experience:</td>
                <td>${details.experience}</td>
              </tr>
              <tr>
                <td class="label">Location:</td>
                <td>${details.location}</td>
              </tr>
              <tr>
                <td class="label">Submitted At:</td>
                <td>${details.date}</td>
              </tr>
            </table>
            
            <p style="margin-top: 20px;">
              <a href="${details.resumeUrl}" class="btn" target="_blank">View Candidate Resume</a>
            </p>
            
            <p style="font-size: 12px; color: #777; margin-top: 30px;">
              Please review the application and contact the candidate if shortlisted.
            </p>
          </div>
        </body>
        </html>
      `
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Failed to send HR notification email:', error)
    throw error
  }
}

export const sendSupportNotificationEmail = async (subject: string, details: any): Promise<void> => {
  try {
    const mailOptions = {
      from: config.email.from,
      to: config.email.supportEmail,
      subject: `New Support Request - ${subject}`,
      text: `New support request received.\n\nDetails:\n${JSON.stringify(details, null, 2)}`
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Failed to send support notification email:', error)
    throw error
  }
}
