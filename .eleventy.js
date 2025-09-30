/** @type {import('@11ty/eleventy').UserConfig} */
module.exports = function (eleventyConfig) {
  /* ------------------------------------------
   * 0) 开发体验 & 约定
   * ------------------------------------------ */

  // 让 Eleventy 监听 assets 和 entries 目录的变化（图片、CSS、JS…）
  eleventyConfig.addWatchTarget("src/assets");
  eleventyConfig.addWatchTarget("src/entries");

  // 在模板里可用 env 变量（例如根据环境切换统计脚本）
  eleventyConfig.addGlobalData("env", process.env.NODE_ENV || "development");

  // 设置默认布局
  eleventyConfig.addGlobalData("layout", "layouts/base.njk");


  /* ------------------------------------------
   * 1) 静态资源直拷（不经过模板引擎）
   * ------------------------------------------ */

  // 把 /src/assets 原样拷贝到 /dist/assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // 正本旁的插图（放在 entries 旁边时）也允许直拷
  eleventyConfig.addPassthroughCopy("src/entries/**/*.{png,jpg,jpeg,gif,webp,svg}");

  // 后台管理界面
  eleventyConfig.addPassthroughCopy("admin");


  /* ------------------------------------------
   * 2) 过滤器（Filters）
   * ------------------------------------------ */

  // 日期格式化：YYYY-MM-DD
  eleventyConfig.addFilter("fmtDate", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    if (isNaN(d)) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  });

  // 资产路径规范化（相对/绝对都变绝对），并过 Eleventy 自带 url 过滤器
  eleventyConfig.addFilter("asset", (p = "") => {
    if (!p) return p;
    const normalized = p.startsWith("/") ? p : "/" + p;
    return eleventyConfig.getFilter("url")(normalized);
  });

  // 限制数组长度的小工具（模板里常用）
  eleventyConfig.addFilter("limit", (arr, n = 10) =>
    Array.isArray(arr) ? arr.slice(0, n) : arr
  );

  // slug/别名（可以拿来做 tags 页面或 id）
  try {
    const slugify = require("@sindresorhus/slugify");
    eleventyConfig.addFilter("slug", (str = "") => slugify(String(str)));
  } catch (_) {
    // 可选依赖，没装也不影响
  }


  /* ------------------------------------------
   * 3) 插件安装与配置
   * ------------------------------------------ */

  // 安装 RSS 插件（提供日期格式等工具）
  const pluginRss = require("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(pluginRss);

  // 图片短代码支持（使用 @11ty/eleventy-img）
  const pluginImg = require("@11ty/eleventy-img");
  eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt, widths = [400, 800, 1200]) {
    if (!src) throw new Error("Missing image src");
    
    // 🔧 版权信息配置 - 请根据需要修改
    const copyrightInfo = {
      Creator: "Zhang Minghua",
      "Copyright Notice": "© 2025 Zhang Minghua. All Rights Reserved. 版权所有，禁止未经许可的使用。",
      "Rights Usage Terms": "仅限个人浏览和学习，禁止商用或修改。For personal viewing and study only. Commercial use prohibited without permission.",
      "Contact Info": "minghua.work@gmail.com"
    };
    
    let metadata = await pluginImg(src, {
      widths: widths,
      formats: ["webp", "jpeg"],
      urlPath: "/img/",
      outputDir: "./dist/img/",
      sharpWebpOptions: { 
        quality: 80,
        metadata: copyrightInfo
      },
      sharpJpegOptions: { 
        quality: 85,
        metadata: copyrightInfo
      },
    });
    return pluginImg.generateHTML(metadata, {
      alt,
      loading: "lazy",
      decoding: "async",
    });
  });


  /* ------------------------------------------
   * 4) 集合（Collections）
   * ------------------------------------------ */

  // 功能函数定义
  function lowerCats(item) {
    const arr = (item?.data?.categories) || [];
    return Array.isArray(arr) ? arr.map(s => String(s).toLowerCase()) : [];
  }

  // 来源定义
  const ENTRY_GLOB_ALL = "src/entries/**/*.{md,njk}";
  const CATS = ["design", "art", "dev", "product", "startup"];

  // 是否启用草稿过滤：front matter 里 isDraft: true 时默认不输出
  const showDrafts = process.env.ELEVENTY_DRAFTS === "true";
  const notDraft = (item) => showDrafts || !item.data?.isDraft;

  // 行：全部（仅 section === 'xing'）
  eleventyConfig.addCollection("xing_all", (api) =>
    api.getFilteredByGlob(ENTRY_GLOB_ALL)
      .filter((it) => it.data?.section === "xing")
      .filter(notDraft)
      .sort((a, b) => b.date - a.date)
  );

  // 行：按照五大类再拆分
  for (const cat of CATS) {
    eleventyConfig.addCollection(`xing_${cat}`, (api) =>
      api.getFilteredByGlob(ENTRY_GLOB_ALL)
        .filter((it) => it.data?.section === "xing" && lowerCats(it).includes(cat))
        .filter(notDraft)
        .sort((a, b) => b.date - a.date)
    );
  }


  /* ------------------------------------------
   * 5) 数据合并与引擎、目录设置
   * ------------------------------------------ */

  // 深度合并 data（同名 key 不会互相覆盖）
  eleventyConfig.setDataDeepMerge(true);

  return {
    // 目录结构
    dir: {
      input: "src",          // 源码目录
      output: "dist",        // 构建输出目录
      includes: "_includes", // 布局/片段目录
      data: "_data",         // 全局数据目录
    },
    // 模板引擎
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

    // 站点前缀（自定义域名保持 "/"）
    pathPrefix: "/",
  };
};