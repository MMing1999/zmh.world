# 项目说明文档（提醒自己用）

这是我个人网站（Eleventy 驱动）的约定与设定，记录一些关键点，避免忘记。

---

# 目录结构 IA（信息架构）

1. 首页（Home /）

    Hero（slogan + 网站说明）

    Intro（个人陈述 + 四宫格快速入口 → 知 / 行 / 合 / 一）

    Life Panorama（人生像素画 / 个人视觉元素）

    Footer（全站统一：快速链接 + 社交 + 版权）


2. 知（Knowing /zhi/）

    总览页 /zhi/

    标题 + 说明

    全站搜索框（lunr.js / Fuse.js）

    精选内容区（Collection / Observation / Writing / Reading 简要视图）

    Footer 快捷导航

    子模块

        Collection /zhi/collection/（列表 + 详情）

        Observation /zhi/observation/（照片网格 + lightbox）

        Writing /zhi/writing/（文章列表 + 详情）

        Reading /zhi/reading/（书籍卡片网格 + 详情）


3. 行（Doing /xing/）

    总览页 /xing/

        代表作精选（3–5 个跨领域项目）

        导航到子分类

    子分类

        Design /xing/design/

        Art /xing/art/

        Dev /xing/dev/

        Product /xing/product/

        Startup /xing/startup/

    作品详情页

        /xing/projects/slug/ （正本内容来自 src/entries/*.md，type=work）

4. 合（Combo /he/）

    About / CV /he/

    Principles /he/principles/

    Life Progress Bar /he/life-progress/

    ---

    

5. 一（One /yi/）

    年度电影总览 /yi/（时间轴 + 年份预览图）

    年份详情页 /yi/2025/（视频播放 / 可加密码访问）


6. 内容统一入口（entries）


    所有“正本内容”集中在这里： 

    每个 .md 文件通过 section + type + categories 自动分发到不同的列表与 URL。      

7. 总目录结构
    src/
  _includes/        # 模板、布局
  _data/            # 全局数据
  assets/           # 静态资源（图片、字体、CSS）

  entries/          # 🔑 所有正本文档（md 文件）
    personal-website.md #每个项目文件
    reading-ai-book.md #每个项目文件
    observation-streetphoto.md #每个项目文件
    note-eleventy-tips.md #每个项目文件

  zhi/              # 知 → 总览页 + 分类列表
    index.njk
    collection/index.njk
    observation/index.njk
    writing/index.njk
    reading/index.njk

  xing/             # 行 → 总览页 + 分类列表
    index.njk
    design/index.njk
    art/index.njk
    dev/index.njk
    product/index.njk
    startup/index.njk

  he/               # 合 → 总览页 + 子页
    index.njk
    principles/index.njk
    life-progress/index.njk

  yi/               # 一 → 总览页 + 年份详情
    index.njk
    2025/index.njk

  index.njk         # 首页

# Front Matter 关键字段

## 通用字段（所有内容都适用）

* **title**：内容标题，显示在详情页、卡片列表、浏览器标签等。
  示例：`"个人网站项目"`
* **date**：日期，决定内容的发布时间和排序（倒序显示最新）。
  示例：`2025-09-26`
* **section**：顶层分区，决定属于哪一大类。可选值：`zhi`（知）、`xing`（行）、`he`（合）、`yi`（一）。
* **type**：内容类型，决定详情页布局和 URL 规则。常见值：`work`、`note`、`observation`、`reading`、`collection`。
* **summary**：简短说明，用于列表页卡片展示。
* **cover**：封面图片路径，通常用于卡片和详情页头图。
  示例：`"{{ '/assets/Pics/demo.png' | url }}"`
* **tags**：关键词标签，自由定义，用于搜索和过滤。
  示例：`[portfolio, eleventy, brand]`

---

## 分类相关字段

* **categories**：作品分类（仅适用于 type=work）。一篇作品可以有多个分类，比如同时属于 `design` 和 `dev`。
* **tags**：更自由的关键词，可以跨类型使用，比如 `思考`、`UI`、`Eleventy`。

### Sections（顶层分区）

    用来决定内容属于哪一个大板块（URL 一级目录）。

    zhi → 知（知识库类）Collection / Observation / Writing / Reading

    xing → 行（作品与行动类）Design / Art / Dev / Product / Startup

    he → 合（关于与原则类）About / CV / Principles / Life Progress Bar

    yi → 一（年度电影类）Annual Movie 总览 / 
### Categories（作品子分类）

    主要用于 section: xing + type: work。一篇作品可多选。

    design → 设计类

    art → 艺术类

    dev → 开发类

    product → 产品类

    startup → 创业类

### Tags（自由标签）

    可用于任何 type（work/note/reading/observation/collection）。
    它们没有固定限制，主要作用是搜索、过滤、快速标注。

    常见示例：

    主题类：思考 / UI / 品牌 / 城市 / 摄影

    工具类：Figma / Eleventy / Blender / TouchDesigner

    场景类：portfolio / reading / note / research

    情绪类：反思 / 灵感 / 经验分享

---

## 作品（Work）专属字段

* **role**：你在项目中的角色，比如 `"Designer / Developer"`。
* **tools**：项目使用的工具或技术栈，比如 `[Figma, Eleventy]`。
* **links**：与项目相关的外部链接，比如 Demo 地址、GitHub 仓库。
  示例：`{ demo: "https://example.com", repo: "https://github.com/xxx" }`

---

## 阅读（Reading）专属字段

* **author**：作者名字。
* **rating**：你的评分，范围 0–5，可以渲染成星级或进度条。

---

## 观察（Observation）专属字段

* **location**：观察或拍摄地点，比如 `"Shanghai"`。
* **images**：图片数组，每张图包含 `src` 和 `alt`。
  示例：`[{src: "xxx.png", alt: "说明"}]`

---

## 收集（Collection）专属字段

* **items**：收集的条目数组，每个条目有 `title`、`link`、`note`。
  示例：`[{title: "灵感A", link: "https://…", note: "说明"}]`

---

## 字段关系小结

* **必填字段**：`title`、`date`、`section`、`type`
* **推荐字段**：`summary`、`cover`、`categories`（适用于作品）
* **可选字段**：

  * 作品（work）：可用 `role`、`tools`、`links`
  * 阅读（reading）：可用 `author`、`rating`
  * 观察（observation）：可用 `location`、`images`
  * 收集（collection）：可用 `items`





# 设计边界（提醒自己）

你现在的技术栈是：

Eleventy（11ty）：静态网站生成器（只输出静态文件）

GitHub Pages：静态网站托管（只会提供 HTML/CSS/JS，不提供数据库、后端逻辑）

所以我们可以从 “能做什么” 和 “做不到什么” 两个角度来明确边界。

✅ 你能做的

因为最终就是 静态文件 + 前端代码，所以任何纯前端的效果都能做：

1. 页面视觉/版式亮点

排版设计：响应式布局（Flex/Grid）、全屏滚动、分屏布局、瀑布流等。

自定义字体：引入 Google Fonts / Adobe Fonts / 自己的字体文件。

多主题切换：用 CSS 变量 + JS 切换（暗黑/亮色/个性主题）。

2. 动画与交互亮点

CSS 动画 / 过渡（transition, keyframes）：悬浮效果、渐变背景、按钮动效。

滚动动画（Scroll-based）：用 IntersectionObserver 或 GSAP ScrollTrigger
 实现进场动画、视差滚动。

SVG 动画：路径描边效果、图标微交互。

Lottie 动画：用 After Effects 导出的 JSON 文件，前端直接播放。

Three.js / Spline / Rive：可以在页面嵌入 WebGL 3D、交互动画。

3. 内容展示亮点

博客系统：Eleventy 自动生成文章列表、标签归档、分页。

作品集展示：卡片网格、点击弹出详情页，完全可控。

搜索（前端实现）：用 JSON 索引 + JavaScript 实现前端模糊搜索。

评论区（第三方接入）：比如 Gitalk（基于 GitHub issue）、Disqus、Giscus。

❌ 你做不到的（边界）

因为 GitHub Pages 没有数据库/后端执行环境，所以以下复杂功能会受限：

后端逻辑 / 动态交互

用户注册、登录（除非用 GitHub OAuth + 外部服务）

数据库操作（存储用户数据）

服务端 API（比如自己写的 Node/Python 服务器）

实时功能

聊天室、实时协作（需要 WebSocket/后端支持）

在线编辑/同步更新（除非接第三方服务）

重度动态内容

电商（库存、订单、支付，需要后端）

用户生成内容（UGC，需要数据库）

AI 接口实时调用（需要后端代理，不能直接在前端暴露 API Key）

🎨 设计时的亮点方向（推荐你聚焦的）

既然边界是「纯前端」，那你应该重点设计 视觉与交互层的亮点，这样成本低、效果酷：

版式（Layout）

Grid 大胆分栏，非对称排版

作品集用大图 + 卡片 hover 动效

博客页面可以玩「手稿感」or「极简留白」风格

动画（Motion）

首页 hero 加 大面积渐变 / 粒子动画 / 文本打字机效果

滚动触发的 分镜式叙事（scroll narrative）

Portfolio 页面做 进场缩放 / 滑入效果

微交互（Micro-interactions）

鼠标悬浮时按钮呼吸/抖动

图片 hover 出说明文字（毛玻璃背景）

切换主题（亮/暗/自定义色彩）

实验性展示

嵌入一个 Three.js 旋转物体 / 星空背景

用 Lottie 动效 给 Logo、图标加动感

用 CSS clip-path / mask 做创意裁切（波浪、斜切）

🚦 给你一句设计指导

👉 你的网站的亮点 应该来自视觉+交互，而不是功能复杂性。
Eleventy + GitHub Pages 的强项是：极快、极稳、可随便设计前端效果。

所以在设计时，你可以放开想象：

大胆的版式 + 色彩（表现你的设计力）

动效加分（让页面有生命力）

可维护的内容结构（Blog + Portfolio 让你能持续更新）


太好了，这就把「后端 & 数据库」在你当前栈（Eleventy + GitHub Pages）的能力边界讲清楚，并给出可落地的扩展方案。

1) 后端 / 数据库到底管什么？

后端（Server/Functions）：在服务器上跑的代码——保存和读取数据、鉴权登录、发邮件、支付回调、生成签名、定时任务、AI 接口代理等；同时保护密钥（API Key）。

数据库（DB）：把结构化/非结构化数据长期存起来并可查询（用户、文章、订单、评论、统计等）。

静态站（你现在的栈）：只有 HTML/CSS/JS。浏览器端的 JS 可以做交互，但没有安全的密钥存放处、没有可写的数据库、没有可运行的服务端逻辑。

2) 纯 Eleventy + GitHub Pages：能与不能
✅ 能（纯前端可实现）

所有视觉与交互：响应式排版、CSS 动画、SVG/Lottie、滚动触发动画、Three.js/Spline 嵌入等。

内容生成：11ty 在构建时把 Markdown → HTML；可做标签/分页/站点地图/RSS。

前端搜索：预生成 JSON 索引 + Lunr/Elasticlunr/Stork 在浏览器搜索（适合小中型站）。

第三方小挂件：统计（Plausible/Umami）、评论（Giscus/Utterances/Disqus）、客服聊天（Crisp/Intercom）、外链购买按钮（Gumroad/Lemon Squeezy）。

❌ 不能（或强烈不建议）

任何需要“安全密钥”的调用（OpenAI、Stripe 自定义金额、私有 API）——放前端会泄露 Key。

账号系统（注册/登录/角色权限）、用户生成内容（发帖、评论存库）、订单/库存。

服务端回调（支付成功回调、Webhook）、定时任务（夜间抓取/生成内容）、实时功能（聊天/协作）。

可写数据库（浏览器只能临时存：localStorage/IndexedDB，不适合共享和长期业务数据）。

例外：少数厂商允许纯前端受限公钥（如某些地图库 Token 绑定域名），但通用密钥绝不能放前端。

3) 常见需求 → 在你当前栈的实现方式
需求	纯 GitHub Pages	加一点点服务（无代码/低代码）
联系表单	用 Formspree/Getform（表单直连服务）或 Google Forms iframe	自己的 Serverless 函数转发到邮件/钉钉/Slack
评论	Giscus（GitHub Discussions）、Utterances（GitHub Issues）	自建评论=需要 DB/鉴权
站内搜索	11ty 构建期产出 search.json + 前端 Lunr	用 Algolia/Meilisearch 托管搜索（需要索引任务/函数）
CMS 在线编辑	Decap CMS + GitHub OAuth 代理（需单独部署 OAuth Proxy）	迁到 Netlify（Identity + Git Gateway）或用 Headless CMS（Contentful/Sanity/Notion API）
电商售卖数字品	Gumroad/Lemon Squeezy 购买按钮/小窗	Stripe Checkout + Serverless（生成 Payment Intent + Webhook 发货）→ 需换平台
图像处理/CDN	静态图	Cloudinary/Imgix 按 URL 动态裁剪/压缩
AI 功能	演示可用“无密钥公共 API”或 iframe	用 Cloudflare Workers/Vercel Functions 做 安全代理 调 OpenAI 等
4) 三种“升级路径”，按改动量从小到大
A. 纯前端增强（不改托管）

前端搜索：构建时输出 search.json → 前端 Lunr/Elasticlunr。

表单服务：Formspree/Getform/StaticForms（零后端）。

评论：Giscus/Utterances。

电商：Gumroad/LemonSqueezy “Buy Button” 嵌入（他们负责支付与发货）。

媒体优化：接 Cloudinary/Imgix（只改图片 URL）。

这条路适合你的 Blog + 作品集 MVP，上线最快。

B. 轻后端（保留 11ty，但换托管到支持函数的平台）

Netlify / Vercel / Cloudflare Pages：保留 11ty 代码，新增 Serverless Functions/Edge Functions：

做 邮件/表单转发、签名与密钥代理（安全调用第三方 API）

支付回调（Stripe Webhook）、生成下载链接、轻量数据写入（KV/SQLite/Firestore/Supabase）

定时任务（Netlify Scheduled, Vercel Cron, Cloudflare Cron Triggers）

Decap CMS 在 Netlify 最顺手（Identity + Git Gateway 无需自建 OAuth）。

这条路对“想加一点动态能力/AI代理/支付回调”的你非常友好，改动小、收益大。

C. 真·后端与数据库（BaaS 或全栈框架）

BaaS：Firebase（Auth + Firestore + Storage）、Supabase（Postgres + Auth + Edge Functions）、Appwrite、PocketBase。

全栈（若以后转）：Next.js/Nuxt/SvelteKit（SSR/SSG/ISR 混合）+ Vercel/Netlify/Cloudflare 部署。

这条路用于做账号体系、个人工作台、用户资料、订单管理等“应用级”功能。

5) 数据存储选型（最常见的 4 档）

浏览器本地：localStorage / IndexedDB

用途：访客主题偏好、最近浏览、临时草稿

局限：单机可见，不共享、不可靠

构建期产物：11ty 在构建时拉取外部数据（Data Cascade/Global Data）→ 生静态页

用途：把「不常变」的数据固化为静态内容（例如你自己的作品清单、文章索引）

局限：需要重新构建才能更新；不适合用户输入

第三方即服务：Formspree/Cloudinary/Algolia/Gumroad 等

用途：把某个单点能力外包出去

局限：数据分散在各平台；深度定制有限

BaaS/自管 DB：Supabase/Firebase/PlanetScale/Neon + Serverless

用途：你掌控数据结构、权限与查询

局限：需要写一点服务端函数与权限规则

6) 安全关键点（前端最容易踩坑）

不要把私钥放前端：OpenAI/Stripe/自家后端密钥一律放在 Serverless/后端的环境变量；前端只打到你自己的 API。

CORS & 域名白名单：BaaS/函数要配置允许的来源域名。

Auth 选择：公开站点（博客/作品集）不需要登录；若要后台投稿→考虑 Netlify Identity（或 Clerk/Auth0/Firebase Auth） + 受保护的函数。

Webhook/支付：必须有服务端验签；GitHub Pages 不适用。

7) 给你的“功能设计地图”（怎么在边界里做亮点）

马上能做的亮点（保留 GitHub Pages）：

版式：大胆 Grid/不等分排版、卡片 hover 毛玻璃、内容分镜式滚动叙事

动效：CSS keyframes + IntersectionObserver/GSAP；Logo 与图标用 Lottie

3D/图形：Three.js/Spline 仅在作品页加载（代码拆分避免全站变慢）

搜索：前端 Lunr；文章/项目打标签 + 过滤器

评论 & 表单：Giscus + Formspree

媒体：Cloudinary 一键生成不同尺寸/格式（webp/avif），速度拉满

如果你要“再进一步”（建议迁到 Netlify/Vercel/Cloudflare 其一）：

AI 功能：前端 → 你的函数代理 → OpenAI/自建模型推理

支付/发货：Stripe Checkout（函数生成意图 & Webhook 发下载链接）

轻数据：Supabase/Firebase 存用户留言、点赞、项目浏览数

CMS：Decap 在 Netlify 一把梭 / 或用 Headless CMS（Contentful/Sanity）

8) 一页决策

只做 Blog + 作品集 + 酷炫动效 → 继续 GitHub Pages（快、稳、免费）。

要表单/评论/外链售卖/搜索更好 → 仍可 GitHub Pages + 第三方服务。

要登录/支付回调/AI代理/写库 → 保留 11ty，但把站迁到 Netlify/Vercel/Cloudflare Pages，加少量 Functions。

要做应用（用户中心、数据后台） → 选 BaaS（Supabase/Firebase）+ Functions 或直接上 Next.js 等全栈。