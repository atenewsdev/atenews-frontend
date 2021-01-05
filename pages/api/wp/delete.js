import admin from '@/utils/firebaseAdmin';

export default async (req, res) => {
  let { slug, api_key } = req.body;

  if (slug && api_key === process.env.NEXT_PUBLIC_WP_ARTICLE_KEY) {
    await admin.database().ref(`articles/${slug.replace('__trashed', '')}`).remove();

    res.status(200).send({
      slug
    })
  } else {
    res.status(500).send('WP Article is required.')
  }
}