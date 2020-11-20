const Wordpress = require('wpapi');

const wp = new Wordpress({
  endpoint: 'https://atenews.ph/wp-json',
});

wp.relatedPosts = wp.registerRoute('sections/v1', '/related/(?P<id>\\d+)');
wp.usersEmail = wp.registerRoute('sections/v1', '/user/(?P<email>[\\d\\D]+)');
wp.staffs = wp.registerRoute('sections/v1', '/staffs');

module.exports = wp;
