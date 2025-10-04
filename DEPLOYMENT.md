# 🚀 GitHub Pages 部署指南

## 📋 快速部署

### 1. 推送代码
```bash
git add .
git commit -m "Update content"
git push origin main
```

### 2. GitHub Pages 自动构建
- 代码推送后自动触发构建
- 构建命令: `npm run build`
- 发布目录: `dist`

## 🎯 使用流程

### 本地开发
1. 启动 `npm run dev`
2. 访问 `http://localhost:8080/`
3. 直接编辑 `src/entries/` 中的 Markdown 文件

### 内容管理
1. 在 `src/entries/` 目录创建新的 `.md` 文件
2. 填写 Front Matter 信息
3. 编写 Markdown 正文
4. 提交到 Git 触发自动部署

## 🔧 故障排除

### 常见问题
- **构建失败**: 检查 GitHub Actions 日志
- **页面不显示**: 检查文件路径和 Front Matter 格式
- **样式问题**: 检查 CSS 文件路径

### 调试步骤
1. 检查 GitHub Actions 构建日志
2. 检查浏览器控制台错误
3. 验证 Markdown 文件格式

## 📚 相关链接
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Eleventy 文档](https://www.11ty.dev/)