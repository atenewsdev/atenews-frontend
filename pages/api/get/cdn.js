import admin from '@/utils/firebaseAdmin';

export default async (req, res) => {
  const accessToken = (await admin.firestore().collection('keys').doc('custom').get()).data().cdn;
  res.status(200).send({ key: accessToken });
}