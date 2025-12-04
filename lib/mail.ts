import nodemailer from 'nodemailer';

// Configure these in your .env.local file
// EMAIL_USER=your-email@gmail.com
// EMAIL_PASS=your-app-specific-password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendStatusEmail = async (
  email: string,
  username: string,
  round: number,
  domain: string
) => {
  // If credentials aren't set, log to console (for development/demo)
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`[Mock Email] To: ${email} | Subject: Round ${round} Update | User: ${username}`);
    return;
  }

  let subject = '';
  let htmlContent = '';

  const commonStyle = `
    font-family: sans-serif; 
    color: #333; 
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
  `;

  const header = `
    <div style="background-color: #000; padding: 15px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ccff00; margin: 0;">EDC Recruitment</h2>
    </div>
  `;

  switch (round) {
    case 1:
      subject = 'Update: EDC Recruitment Round 1';
      htmlContent = `
        ${header}
        <div style="padding: 20px;">
            <h3>Hello ${username},</h3>
            <p>Congratulations! You have cleared the initial screening for the <strong>${domain}</strong> domain.</p>
            <p>You have been shortlisted for <strong>Round 1</strong> (Personal Interview). Details regarding the schedule will be shared shortly.</p>
            <p>Best Regards,<br/>EDC Team</p>
        </div>
      `;
      break;
    case 2:
      subject = 'Update: Advanced to Round 2';
      htmlContent = `
        ${header}
        <div style="padding: 20px;">
            <h3>Great Job, ${username}!</h3>
            <p>We are pleased to inform you that you have successfully cleared Round 1.</p>
            <p>You are now advancing to <strong>Round 2</strong> (Technical/Task Round) for the <strong>${domain}</strong> domain.</p>
            <p>Keep up the momentum!</p>
            <p>Best Regards,<br/>EDC Team</p>
        </div>
      `;
      break;
    case 3:
      subject = 'Update: Final Interview Round';
      htmlContent = `
        ${header}
        <div style="padding: 20px;">
            <h3>Almost There, ${username}!</h3>
            <p>Your performance has been impressive. You have been selected for the <strong>Final Interview (Round 3)</strong>.</p>
            <p>This is the last step in the recruitment process for the <strong>${domain}</strong> domain.</p>
            <p>Best Regards,<br/>EDC Team</p>
        </div>
      `;
      break;
    case 4:
      subject = 'Congratulations! Welcome to EDC';
      htmlContent = `
        ${header}
        <div style="padding: 20px; border-left: 4px solid #ccff00;">
            <h2 style="color: #000;">Welcome to the Team!</h2>
            <p>Dear ${username},</p>
            <p>We are thrilled to invite you to join the <strong>Entrepreneurship Development Cell</strong>.</p>
            <p>You have been officially selected for the <strong>${domain}</strong> domain.</p>
            <p>Get ready to innovate, ideate, and incubate!</p>
            <p>Cheers,<br/>EDC NIT Durgapur</p>
        </div>
      `;
      break;
    default:
      return; // Do not send email for demotions or round 0
  }

  try {
    await transporter.sendMail({
      from: `"EDC Recruitment" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `<div style="${commonStyle}">${htmlContent}</div>`,
    });
    console.log(`Email sent to ${email} for Round ${round}`);
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error here to prevent blocking the API response
  }
};
