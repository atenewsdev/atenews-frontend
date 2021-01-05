import admin from '@/utils/firebaseAdmin';
import fetch from 'node-fetch';
import trendFunction from '@/utils/trendFunction';

export default async (req, res) => {
  const articles = await (await admin.database().ref(`articles`).once('value')).val();
  const accessToken = (await admin.firestore().collection('keys').doc('facebook').get()).data().accessToken;
  const bearerToken = (await admin.firestore().collection('keys').doc('twitter').get()).data().bearerToken;

  await Promise.all(Object.keys(articles).sort((a, b) => {
    return articles[b].timestamp - articles[a].timestamp;
  }).slice(0, 20).map(async (slug) => {
    const article = articles[slug];
    let data = null;
    let twitterData = null;
    try {
      const response = await fetch(`https://graph.facebook.com/?id=https://atenews.ph/${slug}&fields=engagement&access_token=${accessToken}`);
      data = await response.json();
    } catch (err) {
      data = null;
    }

    try {
      const twitterResponse = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=from:atenews url:"/${slug}"&tweet.fields=public_metrics`, {
        method: 'get',
        headers: new fetch.Headers({
          'Authorization': `Bearer ${bearerToken}`,
        }),
      });
      twitterData = await twitterResponse.json();
    } catch (err) {
      twitterData = null;
    }

    let retweetCount = 0;
    try {
      if (twitterData) {
        if ('data' in twitterData) {
          retweetCount = twitterData.data[0].public_metrics.retweet_count + twitterData.data[0].public_metrics.quote_count;
          await admin.database().ref(`articles/${slug}`).update({
            retweetCount,
          });
        } else {
          const temp = await admin.database().ref(`articles/${slug}`).once('value');
          if (temp.exists) {
            retweetCount = 'retweetCount' in temp.val() ? temp.val().retweetCount : 0;
          }
        }
      }
    } catch (err) {
      retweetCount = 0;
    }

    if (data) {
      if (data.engagement) {
        await admin.database().ref(`articles/${slug}`).update({
          shareCount: data.engagement.share_count + retweetCount,
          trendScore: trendFunction(
            article.commentCount,
            data.engagement.share_count + retweetCount,
            article.totalReactCount,
            article.votesCount,
            article.timestamp ? new Date(article.timestamp) : 0
          ),
        });
      } else {
        await admin.database().ref(`articles/${slug}`).update({
          shareCount: article.shareCount + retweetCount,
          trendScore: trendFunction(
            article.commentCount,
            article.shareCount + retweetCount,
            article.totalReactCount,
            article.votesCount,
            article.timestamp ? new Date(article.timestamp) : 0
          ),
        });
      }
    } else {
      await admin.database().ref(`articles/${slug}`).update({
        shareCount: article.shareCount + retweetCount,
        trendScore: trendFunction(
          article.commentCount,
          article.shareCount + retweetCount,
          article.totalReactCount,
          article.votesCount,
          article.timestamp ? new Date(article.timestamp) : 0
        ),
      });
    }
  }).map(p => p.catch(error => {
    return null;
  })));

  res.status(200).send(true);
}