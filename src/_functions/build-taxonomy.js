/**
 * Taxonomy terms into a map, where the key is a {slug, title}
 * taxonomy term object, and the value is an array of posts in that category. Each key is
 * unique, so that categories are not duplicated within the map.
 */

const buildTaxonomy = (
  eleventyConfig,
  collectionAPI,
  dataKey = "",
  tag = "posts"
) => {
  // Get all the templates tagged `posts`
  const posts = collectionAPI.getFilteredByTag(tag);

  // Collect unique terms into a map key: {catSlug, catTitle} value: [postsInCat]
  let map = new Map();

  // Work through the posts, adding the terms to `map`.
  posts.reduce((map, post) => {
    // Get an array of slug/title taxonomy term objects for the post's categories.

    eleventyConfig
      .getFilter("taxObject")(post.data[dataKey])
      .forEach((taxObj) => {
        let mapTest = false;
        // For each slug/title taxonomy term object, test if it is already in `map` using the `slug` property.
        // Test slug/title taxonomy term object by looping through the map's current contents.
        map.forEach((value, key) => {
          // If match is found in the map's keys, reassign `mapTest`
          if (key.slug == taxObj.slug) {
            mapTest = { key, value };
            return;
          }
        });
        // If there are a match, add the post to that key. If no match make a new item in the map.
        mapTest
          ? map.set(mapTest.key, [...mapTest.value, post])
          : map.set(taxObj, [post]);
      });
    // posts.reduce return map (accumulator)
    return map;
  }, map);

  // Sort the final map of taxonomy terms alphabetically, using the `slug` of each slug/title key object.
  const sortedMap = new Map(
    [...map].sort((a, b) => String(a[0].slug).localeCompare(b[0].slug))
  );

  return sortedMap;
};

module.exports = buildTaxonomy;
