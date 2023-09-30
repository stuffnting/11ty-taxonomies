/**
 * Turns an array of taxonomy terms into {slug, title} taxObject,
 * then checks the slugs against a list of allowed taxonomy terms.
 */
const taxObjectFilter = require('./tax-object');
const slugifyTermFilter = require('./slugify-tax');

module.exports = (terms, listToCheckAgainst) => {
  const termsFromPost = taxObjectFilter(terms);
  const allowedTerms = listToCheckAgainst;

  return termsFromPost.filter((termObj) =>
    allowedTerms.some((allowed) => slugifyTermFilter(allowed) === termObj.slug)
  );
};
