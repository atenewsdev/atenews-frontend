const generator = (article) => {
  let category = '';
  switch (article.categories_detailed[0].term_id) {
    case 3:
      category = '/news';
      break;
    case 4:
      category = '/features';
      break;
    case 13:
    case 21:
    case 428:
    case 590:
      category = '/opinion';
      break;
    case 431:
      category = '/photos';
      break;
  }
  return `${category}/${article.slug}`
}

module.exports = generator;