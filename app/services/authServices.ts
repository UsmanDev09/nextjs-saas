import { PrismaClient } from "@prisma/client";
import UserStatus from "../(enums)/userStatus.enum";
import VerificationTokenType from "../(enums)/verificationTokenType.enum";
import { sendForgotPasswordEmail, sendVerificationEmail } from "./mailerService";
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
interface User {
  id: string;
  email: string;
  role: string;
}
const verifyEmail = async (userId: string, code: string) => {
    try {
      
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          verificationTokens: {
            where: {
              token: code,
              type: VerificationTokenType.VerifyEmail, 
            },
          },
        },
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      if (user.verificationTokens.length === 0) {
        throw new Error('Invalid token');
      }
      await prisma.user.update({
        where: { id: userId },
        data: {
          status: UserStatus.Active,
          emailVerified: new Date(),
        },
      });
  
      return { message: "Email verified" };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to verify email');
    }
  };
  const sendVerifyEmail = async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { verificationTokens: true },
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      if (user.status==UserStatus.Verified || user.status==UserStatus.Active) {
        return { message: "Email verified" };
      }
  
      const token = user.verificationTokens.find(t => t.type === VerificationTokenType.VerifyEmail);
      const canSubmit = !token || (new Date().getTime() - token.submitted_at.getTime()) >= 60000;
  
      if (user.status==UserStatus.Pending && canSubmit) {
        const verificationToken = await prisma.usersVerificationToken.create({
          data: {
            userId: user.id,
            type: VerificationTokenType.VerifyEmail,
            token: jwt.sign({},JWT_SECRET, { expiresIn: '1h' }),
          },
        });
        if(verificationToken.token)
        {
          await sendVerificationEmail(user.email, verificationToken.token, user.username);
        }else
        {
          return { message: "Verification email cannot be sent as token is not received" };
        }
      }
  
      return { message: "Verification email sent" };
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  };
  const sendForgotPasswordEmailService = async (email: string): Promise<{ message: string }> => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        throw new Error('User not found');
      }
      const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' });
      await prisma.usersVerificationToken.create({
        data: {
          userId: user.id,
          token,
          type: VerificationTokenType.PasswordReset,
        },
      });
  
      // Send reset email
      await sendForgotPasswordEmail(user.email, token);
  
      return { message: 'Reset Email sent successfully' };
    } catch (error) {
      console.error('Error sending forgot password email:', error);
      throw new Error('Failed to send reset email');
    }
  };
const createJwtTokenPair = async (user: User) => {
  const payload = { email: user.email, sub: user.id, role: user.role };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};
export {
    verifyEmail,
    sendVerifyEmail,
    sendForgotPasswordEmailService,
    createJwtTokenPair
}