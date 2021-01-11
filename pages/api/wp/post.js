import admin from '@/utils/firebaseAdmin';
import trendFunction from '@/utils/trendFunction';

export default async (req, res) => {
  const {
    title, slug, date, categories_detailed: categoriesDetailed, trashed, api_key: apiKey,
  } = req.body;

  if (
    title
    && slug
    && date
    && categoriesDetailed
    && apiKey === process.env.NEXT_PUBLIC_WP_ARTICLE_KEY
    && trashed !== null
  ) {
    const categories = {};
    let i = 0;
    categoriesDetailed.forEach((category) => {
      const { term_id: termId, name, slug: catSlug } = category;
      categories[i] = { termId, name, catSlug };
      i += 1;
    });

    await admin.database().ref(`articles/${slug.replace('__trashed', '')}`).set({
      title,
      categories,
      timestamp: new Date(date).getTime(),
      commentCount: 0,
      shareCount: 0,
      reactCount: {
        angry: 0,
        disgusted: 0,
        happy: 0,
        sad: 0,
        worried: 0,
      },
      totalReactCount: 0,
      trendScore: trendFunction(0, 0, 0, 0, new Date(date).getTime()),
      votesCount: 0,
      trashed: trashed === '1',
    });

    await Promise.all(categoriesDetailed.map(async (category) => {
      await admin.messaging().send({
        data: {
          title,
          categoriesDetailed,
          slug,
        },
        topic: `${category.term_id}`,
      });
    }));

    res.status(200).send({
      title,
      categories,
      timestamp: new Date(date),
    });
  } else {
    res.status(500).send('WP Article is required.');
  }
};
