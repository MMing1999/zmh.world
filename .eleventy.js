/** @type {import('@11ty/eleventy').UserConfig} */
module.exports = function (eleventyConfig) {
  // 1) 静态资源原样复制到输出目录（给图片/字体/CSS）
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // 2) 自定义过滤器：格式化日期为 YYYY-MM-DD
  eleventyConfig.addFilter("fmtDate", (dateObj) => {
    const d = new Date(dateObj);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
    // 用法：{{ page.date | fmtDate }}
  });

  // 3) 目录与模板引擎设置
  return {
    dir: { input: "src", output: "dist", includes: "_includes", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
