/**
 * Slugify a string using `@sindresorhus/slugify`, which
 * is a dependency of 11ty, therefore, does not appear in
 * package.json.
 */
const slugify = require('@sindresorhus/slugify');

module.exports = (term) => slugify(term);
