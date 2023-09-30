/**
 * If there are multiple, or single terms in an array,
 * return the array.
 * If there is a single term as a string, return a single
 * element array containing the string.
 * Otherwise, return an empty array.
 */

module.exports = (terms) =>
  terms && Array.isArray(terms) && terms.length > 0
    ? terms
    : typeof terms === 'string'
    ? [terms]
    : [];
