/**
 * @see {@link https://github.com/11ty/eleventy/issues/2365}
 * @see {@link https://github.com/stuffnting/11ty-notes/blob/main/pagination.md#use-paginationbefore-for-data-11ty-doesnt-want-to-paginate-paginate-js-maps}
 */

module.exports = (taxonomy, taxonomySlugBase) => {
  return {
    layout: 'layout.njk',
    pagination: {
      // 11ty can't use JS maps as pagination data, pretend to use collections.all.
      data: 'collections.all',
      alias: 'term',
      size: 1,
      before(paginationData, fullData) {
        /**
         * Ignore the original pagination dataset, and process the keyword map's keys into an array.
         * Each key is in the form {slug: "keyword-slug", title: "keyword Tile"}.
         */
        return Array.from(fullData.collections[taxonomy].keys());
      },
    },
    // data.keywordsSlugBase is set globally in eleventy.config.js
    permalink: (data) => `/${data[taxonomySlugBase]}/${data.term.slug}/`,
  };
};
