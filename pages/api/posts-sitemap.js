import { SitemapStream, streamToPromise } from 'sitemap';
import slugGenerator from '@/utils/slugGenerator';
import WP from '@/utils/wordpress';

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // List of posts
    const [
      posts1,
      posts2,
      posts3,
      posts4,
      posts5,
      posts6,
      posts7,
      posts8,
      posts9,
      oldPosts,
    ] = await Promise.all([
      WP.posts().page(1),
      WP.posts().page(2),
      WP.posts().page(3),
      WP.posts().page(4),
      WP.posts().page(5),
      WP.posts().page(6),
      WP.posts().page(7),
      WP.posts().page(8),
      WP.posts().page(9),
      WP.posts().page(10),
    ]);
    const posts = [
      ...posts1,
      ...posts2,
      ...posts3,
      ...posts4,
      ...posts5,
      ...posts6,
      ...posts7,
      ...posts8,
      ...posts9,
    ];

    const categories = [
      '/',
      '/news/university',
      '/news/local',
      '/news/national',
      '/news/sports',
      '/features',
      '/features/montage',
      '/features/artists',
      '/opinion/column',
      '/opinion/editorial',
      '/opinion/blueblood',
      '/photos/featured',
    ];

    categories.forEach((category) => {
      smStream.write({
        url: category,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    // Create each URL row
    posts.forEach((post) => {
      smStream.write({
        url: slugGenerator(post),
        changefreq: 'daily',
        priority: 0.5,
      });
    });

    oldPosts.forEach((post) => {
      smStream.write({
        url: slugGenerator(post),
        changefreq: 'never',
        priority: 0.3,
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
};
