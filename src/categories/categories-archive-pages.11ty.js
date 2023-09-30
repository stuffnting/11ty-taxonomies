const getContents = require('../_functions/taxonomy-term-archive-page-contents');
const getData = require('../_functions/taxonomy-term-archive-page-data');

class CategoriesArchivePages {
  data() {
    return {
      ...getData('categoriesAndPosts', 'categoriesSlugBase', 'Categories'),
      taxonomyName: 'Category',
    };
  }
  render(data) {
    // List the posts for the current term.

    return getContents('categoriesAndPosts', data);
  }
}

module.exports = CategoriesArchivePages;
