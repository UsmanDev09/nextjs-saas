import nodemailer from 'nodemailer';
import { stringify } from 'qs';
enum EmailTemplate {
  ForgotPassword = 'ForgotPassword',
  VerifyEmail = 'VerifyEmail',
}

const transporter = nodemailer.createTransport({
  host: process.env.MAILHOG_HOST,
  port: Number(process.env.MAILHOG_PORT),
  secure: false,
});

// Send email function
const sendEmail = async (recipient: string, subject: string, htmlContent: string): Promise<nodemailer.SentMessageInfo> => {
  const mailOptions = {
    from: `"Shaper" <${process.env.MAILER_EMAIL_FROM}>`,
    to: recipient,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
};

// Get template title
const getTemplateTitle = (templateId: EmailTemplate): string => {
  const titles: Record<EmailTemplate, string> = {
    [EmailTemplate.ForgotPassword]: 'Reset password',
    [EmailTemplate.VerifyEmail]: 'Email Confirmation',
  };
  return titles[templateId];
};

// Send Forgot Password Email
const sendForgotPasswordEmail = async (recipient: string, token: string, name?: string): Promise<nodemailer.SentMessageInfo> => {
  const subject = getTemplateTitle(EmailTemplate.ForgotPassword);
  const resetLink = `${process.env.FRONTEND_HOST_URL}/reset-password?${stringify({ token })}`;
  const htmlContent = `<p>Hi ${name},</p><p>Please click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`;

  return sendEmail(recipient, subject, htmlContent);
};

// Send Verification Email
const sendVerificationEmail = async (recipient: string, code: string, name: string): Promise<nodemailer.SentMessageInfo> => {
  const subject = getTemplateTitle(EmailTemplate.VerifyEmail);
  const htmlContent = `<p>Hi ${name},</p><p>Your verification code is: ${code}</p>`;

  return sendEmail(recipient, subject, htmlContent);
};

export {
  sendForgotPasswordEmail,
  sendVerificationEmail,
};
