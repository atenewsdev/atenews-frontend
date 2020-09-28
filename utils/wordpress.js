const Wordpress = require('wpapi');

const wp = new Wordpress({
  endpoint: `https://atenews.ph/wp-json`
})

module.exports = wp;