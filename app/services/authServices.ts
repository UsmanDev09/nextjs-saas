import prisma from '@/lib/prisma';
import UserStatus from '../(enums)/userStatus.enum';
import VerificationTokenType from '../(enums)/verificationTokenType.enum';
import {
  sendForgotPasswordEmail,
  sendVerificationEmail,
} from './mailerService';

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

    return { message: 'Email verified' };
  } catch (error) {
    return { message: `Error verifying email, ${error}` };
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

    if (
      user.status === UserStatus.Verified
      || user.status === UserStatus.Active
    ) {
      return { message: 'Email verified' };
    }

    const token = user.verificationTokens.find(
      (t) => t.type === VerificationTokenType.VerifyEmail,
    );
    const canSubmit = !token || new Date().getTime() - token.submitted_at.getTime() >= 60000;

    if (user.status === UserStatus.Pending && canSubmit) {
      const verificationToken = await prisma.usersVerificationToken.create({
        data: {
          userId: user.id,
          type: VerificationTokenType.VerifyEmail,
          token: Math.floor(1000 + Math.random() * 9000).toString(),
        },
      });
      if (verificationToken.token) {
        await sendVerificationEmail(
          user.email,
          verificationToken.token,
          user.username,
        );
      } else {
        return {
          message: 'Verification email cannot be sent as token is not received',
        };
      }
    }

    return { message: 'Verification email sent' };
  } catch (error) {
    return { message: `Failed to send verification email, ${error}` };
  }
};

const sendForgotPassword = async (
  email: string,
): Promise<{ message: string }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }
    const token = Math.floor(1000 + Math.random() * 9000).toString();

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
    return { message: `Failed to send reset email, ${error}` };
  }
};

const authorizationService = {
  verifyEmail,
  sendVerifyEmail,
  sendForgotPassword,
};

export default authorizationService;
