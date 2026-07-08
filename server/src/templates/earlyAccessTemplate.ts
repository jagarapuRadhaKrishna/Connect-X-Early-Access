/**
 * Early Access Confirmation Email Template
 * Responsive HTML email template for early access registration confirmation
 */

export const getEarlyAccessTemplate = (firstName: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ConnectX Early Access!</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      line-height: 1.6;
      color: #555;
      margin-bottom: 20px;
    }
    .benefits {
      background-color: #f9fafb;
      border-left: 4px solid #EF4444;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .benefits h3 {
      color: #1a1a1a;
      margin-top: 0;
      font-size: 18px;
    }
    .benefits ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .benefits li {
      margin: 8px 0;
      color: #555;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
      color: #ffffff;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
      box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
    }
    .footer {
      background-color: #1a1a1a;
      padding: 30px;
      text-align: center;
      color: #ffffff;
    }
    .footer p {
      margin: 5px 0;
      font-size: 14px;
      color: #a0a0a0;
    }
    .footer a {
      color: #EF4444;
      text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        border-radius: 0;
      }
      .header {
        padding: 30px 20px;
      }
      .content {
        padding: 30px 20px;
      }
      .header h1 {
        font-size: 24px;
      }
      .greeting {
        font-size: 18px;
      }
      .message {
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to ConnectX Early Access!</h1>
    </div>
    <div class="content">
      <p class="greeting">Hi ${firstName},</p>
      
      <p class="message">
        Thank you for joining the <strong>ConnectX Early Access</strong> program! 🎉
      </p>
      
      <p class="message">
        We're excited to have you with us as one of our early supporters. Your interest has been successfully recorded, and you'll be among the first to know when ConnectX officially launches.
      </p>
      
      <div class="benefits">
        <h3>What to expect:</h3>
        <ul>
          <li>Early access to the platform before the public launch</li>
          <li>Updates on new features and improvements</li>
          <li>Notifications when job opportunities become available</li>
          <li>Exclusive announcements and launch news</li>
        </ul>
      </div>
      
      <p class="message">
        We'll keep you informed every step of the way. In the meantime, stay tuned—we're working hard to build a better job platform for job seekers and recruiters.
      </p>
      
      <p class="message">
        Thank you for being part of the ConnectX journey.
      </p>
      
      <p class="message">
        Best regards,<br>
        <strong>Team ConnectX</strong>
      </p>
      
      <a href="#" class="cta-button">Stay Tuned</a>
    </div>
    <div class="footer">
      <p>📧 connectx.talent@gmail.com</p>
      <p>&copy; 2026 ConnectX. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `
}

export default getEarlyAccessTemplate
