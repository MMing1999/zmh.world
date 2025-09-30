---
section: xing
layout: layouts/project.njk
pageCSS: /assets/Css/project.css

title: "CMS 后台系统"
date: 2025-01-01
summary: "基于 Decap CMS 的内容管理后台，支持拖拽图片、Markdown 编辑、一键发布。"
cover: /assets/Pics/xing-portfolo-01-temp.jpg

categories: [design, dev]
tags: [cms, decap, eleventy, workflow]

period: 2025.01 – 2025.01
tools: [Decap CMS, Eleventy, GitHub Actions]
client: 自用
collaborators: ["@zhangminghua - 全栈开发"]
fee: 开源项目

links:
  demo: "http://localhost:8080/admin/"
  repo: "https://github.com/MMing1999/zmh.world"
  doc: "https://decapcms.org/docs/"
---

## 项目背景

为了提高内容创作效率，基于 Decap CMS（原 Netlify CMS）构建了一个可视化的内容管理后台。

## 核心功能

### 🖼️ 智能图片处理
- **多格式输出**：WebP + JPEG 自动生成
- **响应式尺寸**：400px, 800px, 1200px 三档适配
- **版权保护**：自动嵌入作者和版权信息
- **按分区存储**：xing（行·Doing）和 zhi（知·Zhi）独立管理

### 📝 所见即所得编辑
- **Markdown 支持**：实时预览，语法高亮
- **拖拽上传**：图片直接拖入编辑器
- **字段验证**：必填项检查，格式规范
- **一键发布**：保存即提交到 Git，自动部署

## 技术实现

### 后端架构
```yaml
# admin/config.yml
backend:
  name: github
  repo: MMing1999/zmh.world
  branch: main
  
media_folder: "src/assets/Pics/xing"
public_folder: "/assets/Pics/xing"
```

### 图片处理
```js
// .eleventy.js
eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt, widths = [400, 800, 1200]) {
  const copyrightInfo = {
    copyright: "© 2025 zhang minghua",
    author: "zhang minghua"
  };
  
  let metadata = await pluginImg(src, {
    widths: widths,
    formats: ["webp", "jpeg"],
    sharpWebpOptions: { quality: 80, metadata: copyrightInfo },
    sharpJpegOptions: { quality: 85, metadata: copyrightInfo }
  });
  
  return pluginImg.generateHTML(metadata, { alt, loading: "lazy" });
});
```

## 使用流程

1. **访问后台**：`http://localhost:8080/admin/`
2. **创建项目**：填写标题、摘要、封面等基础信息
3. **编辑内容**：Markdown 编辑器支持实时预览
4. **拖拽图片**：自动优化并保存到对应分区目录
5. **一键发布**：保存即触发 GitHub Actions 自动部署

## 效果展示

{% image "src/assets/Pics/xing-portfolo-01-temp.jpg", "CMS 后台界面预览", [400, 800] %}

## 未来规划

- [ ] 支持"知·Zhi"分区扩展
- [ ] 添加草稿发布功能
- [ ] 集成更多图片优化服务
- [ ] 支持批量导入导出
