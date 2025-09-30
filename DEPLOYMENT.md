# 🚀 Netlify + Decap CMS 部署指南

## 📋 部署前准备

### 1. 推送代码到GitHub
```bash
git add .
git commit -m "Configure Decap CMS for production"
git push origin main
```

### 2. 在Netlify创建站点
1. 访问 [netlify.com](https://netlify.com)
2. 点击 "New site from Git"
3. 选择你的GitHub仓库
4. 构建设置会自动检测到 `netlify.toml`

## 🔐 Auth0 配置

### 1. 创建Auth0应用
1. 访问 [auth0.com](https://auth0.com)
2. 创建新应用，选择 "Single Page Application"
3. 记录以下信息：
   - Domain: `your-domain.auth0.com`
   - Client ID: `your-client-id`
   - Client Secret: `your-client-secret`

### 2. 配置Auth0应用
在Auth0应用设置中添加：
- **Allowed Callback URLs**: 
  ```
  https://zmhlife.netlify.app/.netlify/identity/callback
  ```
- **Allowed Logout URLs**: 
  ```
  https://zmhlife.netlify.app/admin/
  ```
- **Allowed Web Origins**: 
  ```
  https://zmhlife.netlify.app
  ```

### 3. 在Netlify配置Identity
1. 进入 Netlify 后台 → Site settings → Identity
2. 启用 "Enable Identity"
3. 在 "External providers" 中添加 Auth0
4. 填入Auth0的配置信息：
   - Domain: `your-domain.auth0.com`
   - Client ID: `your-client-id`
   - Client Secret: `your-client-secret`

## 📝 更新配置文件

### 1. 更新 `src/admin/config.yml`
将 `site_url` 替换为你的实际域名：
```yaml
site_url: "https://zmhlife.netlify.app"
```

### 2. 本地开发配置
本地开发时，临时修改 `config.yml`：
```yaml
backend:
  name: local_backend
  # name: git-gateway
  # branch: main
  # auth_type: pkce
```

## 🎯 使用流程

### 生产环境
1. 访问 `https://zmhlife.netlify.app/admin/`
2. 点击 "Login with Auth0"
3. 使用Auth0账号登录
4. 创建/编辑项目
5. 保存后自动推送到GitHub并触发重新构建

### 本地开发
1. 启动 `npx decap-server` (端口8081)
2. 启动 `npm run dev` (端口8080)
3. 访问 `http://localhost:8080/admin/`
4. 使用本地后端登录

## 🔧 故障排除

### 常见问题
1. **Auth0登录失败**: 检查回调URL配置
2. **图片上传失败**: 检查media_folder路径
3. **构建失败**: 检查GitHub仓库权限

### 调试步骤
1. 检查Netlify构建日志
2. 检查Auth0应用日志
3. 检查浏览器控制台错误

## 📚 相关链接
- [Decap CMS文档](https://decapcms.org/)
- [Netlify Identity文档](https://docs.netlify.com/visitor-access/identity/)
- [Auth0文档](https://auth0.com/docs)
