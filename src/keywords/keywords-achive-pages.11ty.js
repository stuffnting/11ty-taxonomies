const getContents = require('../_functions/taxonomy-term-archive-page-contents');
const getData = require('../_functions/taxonomy-term-archive-page-data');

class KeywordArchivePages {
  data() {
    return { ...getData('keywordsAndPosts', 'keywordsSlugBase'), taxonomyName: 'Keyword' };
  }
  render(data) {
    // List the posts for the current term.
    return getContents('keywordsAndPosts', data);
  }
}

module.exports = KeywordArchivePages;
