import admin from '@/utils/firebaseAdmin';
import {
  verifyEmail as verifyTemplate,
  resetPassword,
} from '@/utils/mailTemplates';

const verifyEmail = async (email) => {
  const link = await admin.auth().generateEmailVerificationLink(email);
  await admin.firestore()
    .collection('mail')
    .add({
      to: email,
      message: {
        subject: 'Verify your email address',
        html: verifyTemplate(link),
      },
    });
};

const forgotPassword = async (email) => {
  const link = await admin.auth().generatePasswordResetLink(email);
  await admin.firestore()
    .collection('mail')
    .add({
      to: email,
      message: {
        subject: 'Reset your password',
        html: resetPassword(link),
      },
    });
};

export { verifyEmail, forgotPassword };
