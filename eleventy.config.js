const buildTaxonomy = require('./src/_functions/build-taxonomy');

module.exports = (eleventyConfig) => {
  /****************************************************************************
   * Keywords style taxonomies
   ****************************************************************************/

  // Filters used for slugs and titles for the taxonomies.
  eleventyConfig.addFilter('slugifyTax', require('./src/_filters/slugify-tax.js'));
  eleventyConfig.addFilter('titleCaseTax', require('./src/_filters/title-case-tax.js'));
  eleventyConfig.addFilter('filterRawTax', require('./src/_filters/filter-raw-tax.js'));

  // Utilises the other 3 filters to make objects in the form {slug: slugName, title: titleName}
  eleventyConfig.addFilter('taxObject', require('./src/_filters/tax-object.js'));

  // Utilises the taxObject filter, then checks the terms against a list of allowed terms.
  eleventyConfig.addFilter('taxCheckAgainstList', require('./src/_filters/tax-check-against-list'));

  /**
   * Build the `keywords` taxonomy for `posts`.
   */
  eleventyConfig.addCollection('keywordsAndPosts', (collectionAPI) => {
    return buildTaxonomy(eleventyConfig, collectionAPI, 'keywords', 'posts');
  });

  // Slug base for keyword archive pages and index; e.g. /keyword/dogs/
  eleventyConfig.addGlobalData('keywordsSlugBase', 'keywords');

  /**
   * Build the `categories` taxonomy for `posts`.
   */
  eleventyConfig.addCollection('categoriesAndPosts', (collectionAPI) => {
    return buildTaxonomy(eleventyConfig, collectionAPI, 'categories', 'posts', 'catsForPosts');
  });

  // Slug base for categories archive pages and index; e.g. /keyword/dogs/
  eleventyConfig.addGlobalData('categoriesSlugBase', 'categories');

  /****************************************************************************
   * Drafts
   *
   * Drafts are published `start` is run, but not `build`.
   * See "Set the environment variable" below.
   *
   * @see {@link https://www.11ty.dev/docs/quicktips/draft-posts/}
   * @see {@link https://nodejs.org/api/process.html#processenv}
   ***************************************************************************/
  // When `permalink` is false, the file is not written to disk
  eleventyConfig.addGlobalData('eleventyComputed.permalink', function () {
    return (data) => {
      // Always skip during non-watch/serve builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return false;
      }
      return data.permalink;
    };
  });

  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections.
  // Oddly, even with `permalink: false` the post is added to collections, even though the file itself is not written.
  eleventyConfig.addGlobalData('eleventyComputed.eleventyExcludeFromCollections', function () {
    return (data) => {
      // Always exclude from non-watch/serve builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return true;
      }
      return data.eleventyExcludeFromCollections;
    };
  });

  // Set the environment variable
  eleventyConfig.on('eleventy.before', ({ runMode }) => {
    if (runMode === 'serve' || runMode === 'watch') {
      // process.env is a node thing.
      process.env.BUILD_DRAFTS = true;
    }
  });

  /****************************************************************************
   * Return config options
   ***************************************************************************/
  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
    },
  };
};
