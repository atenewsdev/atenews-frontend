/* eslint-disable camelcase */
import admin from '@/utils/firebaseAdmin';

export default async (req, res) => {
  const {
    slug,
  } = req.body;

  if (slug) {
    await admin.database().ref(`articles/${slug.replace('__trashed', '')}`).update({
      viewsCount: admin.database.ServerValue.increment(1),
    });

    res.status(200).send(slug);
  } else {
    res.status(500).send('Slug is required.');
  }
};
