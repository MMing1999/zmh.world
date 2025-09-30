# 📝 内容管理后台使用指南

## 🚀 快速开始

### 1. 配置仓库地址
编辑 `admin/config.yml` 文件，将第 3 行的仓库地址改为你的实际 GitHub 仓库：
```yaml
repo: MMing1999/zmh.world  # 🔧 请替换为你的实际 GitHub 仓库地址
```

### 2. 配置版权信息
编辑 `.eleventy.js` 文件，修改第 82-86 行的版权信息：
```js
const copyrightInfo = {
  copyright: "© 2025 zhang minghua",  // 🔧 请修改为你的版权信息
  author: "zhang minghua",            // 🔧 请修改为你的姓名
  creator: "zhang minghua"           // 🔧 请修改为你的姓名
};
```

### 3. 访问后台
- **本地开发**：`http://localhost:8080/admin/`
- **线上环境**：`https://你的域名/admin/`

## 📁 文件结构

```
coding/
├── admin/                    # 后台管理文件
│   ├── index.html           # 后台入口页面
│   ├── config.yml           # 后台配置文件
│   └── README.md            # 使用说明（本文件）
├── src/
│   └── assets/
│       └── Pics/
│           ├── xing/        # 行·Doing 项目图片
│           └── zhi/         # 知·Zhi 文章图片（未来扩展）
```

## 🖼️ 图片处理功能

### 自动优化
- **多格式输出**：WebP + JPEG
- **响应式尺寸**：400px, 800px, 1200px
- **压缩优化**：WebP 80% 质量，JPEG 85% 质量
- **版权信息**：自动嵌入作者和版权信息

### 使用方式
在 Markdown 中使用图片短代码：
```markdown
{% image "/assets/Pics/xing/your-image.jpg", "图片描述", [400, 800, 1200] %}
```

## 📝 创建项目流程

1. **访问后台** → 点击"新建项目"
2. **填写基础信息**：
   - 项目标题
   - 发布日期（自动填充当前日期）
   - 项目摘要
   - 封面图片（拖拽上传）
3. **设置分类标签**：
   - 分类：design, art, dev, product, startup
   - 标签：自定义标签
4. **填写项目详情**（可选）：
   - 时间周期
   - 使用工具
   - 客户/委托方
   - 合作者
   - 报酬/价格
5. **添加链接**（可选）：
   - 演示地址
   - 代码仓库
   - 文档链接
6. **编写正文**：支持 Markdown 语法，图片可拖拽插入
7. **保存发布**：自动提交到 Git，触发自动部署

## 🔧 高级配置

### 扩展其他分区
如需添加"知·Zhi"分区，取消注释 `admin/config.yml` 文件末尾的配置块。

### 图片存储优化
如需使用 Uploadcare 进行额外图片优化，在 `admin/config.yml` 中配置：
```yaml
media_library:
  name: uploadcare
  config:
    publicKey: "your-uploadcare-key"
```

## 🛠️ 故障排除

### 登录问题
如果 GitHub 登录失败，可以：
1. 使用公共 OAuth 服务（已配置）
2. 自建 GitHub OAuth App

### 图片不显示
1. 检查图片路径是否正确
2. 确认图片已上传到对应分区目录
3. 使用图片短代码而非直接 Markdown 语法

### 部署问题
1. 确认 GitHub Actions 工作流正常
2. 检查仓库权限设置
3. 查看构建日志排查错误

## 📞 技术支持

如有问题，请检查：
1. 控制台错误信息
2. GitHub Actions 构建日志
3. 网络连接状态
