const keywordsObj = require('../_filters/tax-object');
const categoriesObj = require('../_filters/tax-check-against-list');

module.exports = {
  layout: 'blog-layout.njk',
  tags: ['posts'],
  // `page.fileSlug` is included incase two posts have the same `title`
  permalink: '/blog/{{page.fileSlug}}/{{ title | slugify }}/',
  eleventyComputed: {
    // Make can object out of the keywords
    keywordsObj: (data) => keywordsObj(data.keywords, data.catsForPosts),
    categoriesObj: (data) => categoriesObj(data.categories, data.catsForPosts),
  },
};
