import admin from '@/utils/firebaseAdmin';
import { verifyEmail } from '@/utils/email';

export default async (req, res) => {
  let email = '';
  let username = '';
  let password = '';
  if (req.method === 'POST') {
    // Process a POST request
    email = req.body.email;
    username = req.body.username;
    password = req.body.password;
    try {
      const user = await admin.auth().createUser({
        email,
        password,
      });

      await Promise.all([
        admin.firestore().doc(`users/${user.uid}`).set({
          username,
          displayName: username,
        }, { merge: true }),
        verifyEmail(email),
      ]);
      res.status(200).json({ message: 'success' });
    } catch (err) {
      res.status(500).json({
        ...err, email, username, password,
      });
    }
  } else {
    res.status(404).send({ message: 'not found' });
    // Handle any other HTTP method
  }
};
