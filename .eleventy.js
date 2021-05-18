module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('site/scripts');
  eleventyConfig.addPassthroughCopy('site/styles/*.css');

  return {
    dir: {
      input: 'site',
      output: 'www',
      includes: '../_includes',
      data: '../_data'
    }
  }
}
