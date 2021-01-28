/* eslint-disable camelcase */
import admin from '@/utils/firebaseAdmin';
import trendFunction from '@/utils/trendFunction';

import fetch from 'node-fetch';

export default async (req, res) => {
  const posts = await fetch('https://atenews.ph/wp-json/wp/v2/posts?per_page=50').then((_res) => _res.json());
  posts.forEach(({
    title, slug, date, categories_detailed,
  }) => {
    const categories = {};
    let i = 0;
    categories_detailed.forEach((category) => {
      const { term_id, name, slug: catSlug } = category;
      categories[i] = { term_id, name, slug: catSlug };
      i += 1;
    });

    admin.database().ref(`articles/${slug.replace('__trashed', '')}`).set({
      title: title.rendered,
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
      trashed: false,
    });
  });

  res.status(200).send({
    debug: true,
  });
};
