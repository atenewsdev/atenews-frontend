const generator = (article) => {
  let category = '';
  switch (
    article.categories?.nodes
      ? parseInt(article.categories.nodes[0].databaseId, 10)
      : parseInt(
        article.categories_detailed?.term_id
        || article.categories?.termId
        || article.categories?.term_id, 10,
      )
  ) {
    case 3:
    case 20:
    case 18:
    case 19:
    case 7:
      category = '/news';
      break;
    case 4:
    case 437:
    case 31:
      category = '/features';
      break;
    case 13:
    case 21:
    case 428:
    case 590:
      category = '/opinion';
      break;
    case 430:
    case 431:
      category = '/photos';
      break;
    default:
  }
  return `${category}/${article.slug}`;
};

module.exports = generator;
