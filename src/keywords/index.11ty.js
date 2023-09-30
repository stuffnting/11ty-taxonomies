class KeywordsIndexPage {
  data() {
    return {
      layout: 'taxonomy-index-page.njk',
      title: 'Keywords Index Page',
      eleventyComputed: {
        taxSlugBase: (data) => data.keywordsSlugBase,
        taxonomy: (data) => data.collections.keywordsAndPosts,
      },
    };
  }
}

module.exports = KeywordsIndexPage;
