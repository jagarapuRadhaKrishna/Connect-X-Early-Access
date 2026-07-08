/**
 * Candidate Job Application Confirmation Email Template
 * Responsive HTML email template for job application confirmation
 */

export const getCandidateApplicationTemplate = (
  firstName: string,
  jobTitle: string,
  applicationId: string,
  applicationDate: string
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - ConnectX</title>
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
      background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
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
    .job-card {
      background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
      border: 2px solid #8B5CF6;
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
    }
    .job-card h2 {
      color: #6366F1;
      margin-top: 0;
      font-size: 22px;
      margin-bottom: 15px;
    }
    .job-card p {
      margin: 8px 0;
      color: #4b5563;
      font-size: 15px;
    }
    .job-card strong {
      color: #1a1a1a;
    }
    .summary {
      background-color: #f9fafb;
      border-left: 4px solid #8B5CF6;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .summary h3 {
      color: #1a1a1a;
      margin-top: 0;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .summary-item:last-child {
      border-bottom: none;
    }
    .summary-label {
      font-weight: 600;
      color: #374151;
    }
    .summary-value {
      color: #6b7280;
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
      color: #8B5CF6;
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
      .job-card {
        padding: 20px;
      }
      .job-card h2 {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>We've Received Your Job Application</h1>
    </div>
    <div class="content">
      <p class="greeting">Hi ${firstName},</p>
      
      <p class="message">
        Thank you for applying through <strong>ConnectX</strong>.
      </p>
      
      <p class="message">
        We've successfully received your application for:
      </p>
      
      <div class="job-card">
        <h2>${jobTitle}</h2>
        <p>Our team will review your application carefully. If your profile matches the role, we'll contact you with the next steps.</p>
      </div>
      
      <div class="summary">
        <h3>Application Summary:</h3>
        <div class="summary-item">
          <span class="summary-label">Application ID:</span>
          <span class="summary-value">${applicationId}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Position:</span>
          <span class="summary-value">${jobTitle}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Applied On:</span>
          <span class="summary-value">${applicationDate}</span>
        </div>
      </div>
      
      <p class="message">
        Please keep an eye on your email for updates regarding your application.
      </p>
      
      <p class="message">
        Thank you for choosing ConnectX, and we wish you the very best in your job search.
      </p>
      
      <p class="message">
        Best regards,<br>
        <strong>Team ConnectX</strong>
      </p>
    </div>
    <div class="footer">
      <p>📧 Career & Applications: <a href="mailto:connectx.talent@gmail.com">connectx.talent@gmail.com</a></p>
      <p>📧 Support: <a href="mailto:connectx.talent@gmail.com">connectx.talent@gmail.com</a></p>
      <p>&copy; 2026 ConnectX. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `
}

export default getCandidateApplicationTemplate
