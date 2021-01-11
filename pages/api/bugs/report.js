import admin from '@/utils/firebaseAdmin';

export default async (req, res) => {
  const {
    error,
  } = req.body;

  await admin.firestore().collection('error').add({
    error,
    timestamp: new Date(),
  });

  res.status(200).send({
    error,
    timestamp: new Date(),
  });
};
