/**
 * @see {@link https://github.com/11ty/eleventy/issues/2365}
 */
class KeywordArchivePages {
  data() {
    return {
      layout: 'layout.njk',
      pagination: {
        // 11ty can't use JS maps as pagination data.
        data: 'collections.all',
        alias: 'keywordObj',
        size: 1,
        before(paginationData, fullData) {
          /**
           * Ignore the original pagination data set, and process the keyword map's keys into an array.
           * Each key is in the form {slug: "keyword-slug", title: "keyword Tile"}.
           */
          return Array.from(fullData.collections.keywordsAndPosts.keys());
        },
      },
      eleventyComputed: {
        title: (data) => data.keywordObj.title,
      },
      // data.keywordsSlugBase is set globally in eleventy.ocnfig.js
      permalink: (data) => `/${data.keywordsSlugBase}/${data.keywordObj.slug}/`,
    };
  }
  render(data) {
    // List the posts for the current keywordObj.
    let postList = '';
    data.collections.keywordsAndPosts.forEach((value, key) => {
      if (key.slug === data.keywordObj.slug) {
        postList = value.reduce(
          (acc, post) => `<li><a href="${post.page.url}">${post.data.title}</a></li>\n${acc}`,
          ''
        );
      }
    });
    postList = postList || `<p>No Posts</p>`;
    return `<h1>Keyword index: ${data.keywordObj.title}</h1>\n<ul>\n${postList}</ul>`;
  }
}

module.exports = KeywordArchivePages;
