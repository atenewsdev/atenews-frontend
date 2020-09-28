const generator = (article) => {
  let category = '';
  switch (article.categories[0]) {
    case 3:
      category = '/news';
      break;
    case 4:
      category = '/features';
      break;
    case 13:
      category = '/opinion';
      break;
    case 431:
      category = '/photos';
      break;
  }
  return `${category}/${article.slug}`
}

module.exports = generator;