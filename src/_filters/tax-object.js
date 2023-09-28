/**
 * Return an array, that for each of a post's terms contains an object
 * that has `slug` and `title` properties.
 * If there are no terms, use `uncategorised` as the term.
 */
const filterRawTax = require('./filter-raw-tax');
const slugifyTax = require('./slugify-tax');
const titleCaseTax = require('./title-case-tax');

module.exports = (cats) => {
  const taxRawArray = filterRawTax(cats);
  // No Taxonomy terms. Return a single element array containing a slug/title object.
  if (taxRawArray.length === 0) {
    return [{ slug: 'uncategorised', title: 'Uncategorised' }];
  }

  // An array of categories. Return an array containing a slug/title objects.
  return taxRawArray.map((cat) => ({
    slug: slugifyTax(cat),
    title: titleCaseTax(cat),
  }));
};
