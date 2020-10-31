const Wordpress = require('wpapi');

const wp = new Wordpress({
  endpoint: 'https://atenews.ph/wp-json',
});

wp.relatedPosts = wp.registerRoute('sections/v1', '/related/(?P<id>\\d+)');

module.exports = wp;
