module.exports = function (taxonomy, data) {
  let postList = '';
  data.collections[taxonomy].forEach((value, key) => {
    if (key.slug === data.term.slug) {
      postList = value.reduce((acc, post) => {
        return `<li><a href="${post.page.url}">${post.data.title}</a></li>\n${acc}`;
      }, '');
    }
  });

  const listOut = postList ? `<ul>\n${postList}</ul>\n` : `<p>No posts for this term.</p>`;

  return `<h1>${data.taxonomyName} index: ${data.term.title}</h1>\n${listOut}`;
};
