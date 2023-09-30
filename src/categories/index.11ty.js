class KeywordsIndexPage {
  data() {
    return {
      layout: 'taxonomy-index-page.njk',
      title: 'Categories Index Page',
      eleventyComputed: {
        taxSlugBase: (data) => data.categoriesSlugBase,
        taxonomy: (data) => data.collections.categoriesAndPosts,
      },
    };
  }
}

module.exports = KeywordsIndexPage;
