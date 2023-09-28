/**
 * Trim a string and remove double spaces.
 * Then using the external dependency `title-case`,
 * change the case of a string to title case.
 * `title-case` is an npm dependency, listed in package.json.
 */
const { titleCase } = require('title-case');

module.exports = (cat) => titleCase(cat.replace(/\s+/g, ' ').trim());
