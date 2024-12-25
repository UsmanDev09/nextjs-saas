import nodemailer from 'nodemailer';
import { stringify } from 'qs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);
enum EmailTemplate {
  ForgotPassword = 'ForgotPassword',
  VerifyEmail = 'VerifyEmail',
}

// const transporter = nodemailer.createTransport({
//   host: process.env.MAILHOG_HOST,
//   port: Number(process.env.MAILHOG_PORT),
//   secure: false,
// });

// Send email function
const sendEmail = async (
  recipient: string,
  subject: string,
  htmlContent: string,
): Promise<Response> => {
  try {
    const response = await resend.emails.send({
      from: `Shipsaas <${process.env.DOMAIN_EMAIL}>`,
      to: recipient,
      subject,
      html: htmlContent,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully!',
        details: response, // Include details about the sent email
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Failed to send email:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to send email',
        error: (error instanceof Error) ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
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
const sendForgotPasswordEmail = async (
  recipient: string,
  token: string,
  name?: string,
): Promise<nodemailer.SentMessageInfo> => {
  const subject = getTemplateTitle(EmailTemplate.ForgotPassword);
  const resetLink = `${process.env.FRONTEND_HOST_URL}/reset-password?${stringify({ token })}`;
  const htmlContent = `<p>Hi ${name},</p><p>Please click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`;

  return sendEmail(recipient, subject, htmlContent);
};

// Send Verification Email
const sendVerificationEmail = async (
  recipient: string,
  code: string,
  name: string|null,
): Promise<nodemailer.SentMessageInfo> => {
  const subject = getTemplateTitle(EmailTemplate.VerifyEmail);
  const htmlContent = `<p>Hi ${name},</p><p>Your verification code is: ${code}</p>`;

  return sendEmail(recipient, subject, htmlContent);
};

export { sendForgotPasswordEmail, sendVerificationEmail };
