import admin from '@/utils/firebaseAdmin';

export default async (req, res) => {
  const { slug, api_key: apiKey } = req.body;

  if (slug && apiKey === process.env.NEXT_PUBLIC_WP_ARTICLE_KEY) {
    await admin.database().ref(`articles/${slug.replace('__trashed', '')}`).remove();

    res.status(200).send({
      slug,
    });
  } else {
    res.status(500).send('WP Article is required.');
  }
};
