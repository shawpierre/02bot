# 🌲 树洞红包 - Tree Hole Gift

一个神秘森林风格的匿名树洞社交平台，用户可以匿名分享秘密并设定点数价格，其他用户通过随机"挖掘"方式发现秘密，选择是否付费支持。所有用户统一显示为"momo"保护隐私。

## ✨ 功能特性

- 🎭 **完全匿名**: 所有用户显示为"momo"，保护隐私
- 💰 **积分系统**: 使用虚拟点数替代真实支付
- 🌲 **倾诉树洞**: 匿名发布秘密，设定点数价格
- 👂 **倾听树洞**: 随机发现秘密，付费解锁完整内容
- 💬 **评论互动**: 秘密支持匿名评论，洞主收到实时通知
- 📱 **响应式设计**: 完美适配桌面端、平板和移动端

## 🛠️ 技术栈

- **前端**: React 18 + TypeScript + Vite
- **样式**: Tailwind CSS + CSS Modules
- **路由**: React Router v6
- **状态管理**: React Context API
- **后端服务**: Supabase (BaaS)
- **数据库**: PostgreSQL (Supabase)
- **实时通讯**: Supabase Realtime
- **认证**: Supabase Auth

## 📦 安装运行

### 1. 克隆项目

\`\`\`bash
git clone <your-repo-url>
cd tree-hole-app
\`\`\`

### 2. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 3. 配置Supabase

#### 创建Supabase项目

1. 访问 [https://supabase.com](https://supabase.com) 并登录
2. 点击 "New Project" 创建新项目
3. 记录项目的 `URL` 和 `anon key`

#### 运行数据库迁移

1. 打开Supabase项目的SQL编辑器
2. 将 `supabase/migrations/001_init_schema.sql` 文件内容复制粘贴到编辑器
3. 点击 "Run" 执行SQL脚本，创建所有表和策略

#### 配置环境变量

复制 `.env.example` 为 `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

编辑 `.env.local` 文件，填入你的Supabase配置:

\`\`\`env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

### 4. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

访问 `http://localhost:5173` 查看应用。

## 📁 项目结构

\`\`\`
tree-hole-app/
├── public/              # 静态资源
├── src/
│   ├── components/      # 组件
│   │   ├── common/      # 通用组件
│   │   ├── layout/      # 布局组件
│   │   └── features/    # 功能组件
│   ├── pages/           # 页面组件
│   ├── contexts/        # Context状态管理
│   ├── hooks/           # 自定义Hooks
│   ├── services/        # API服务层
│   ├── types/           # TypeScript类型
│   └── utils/           # 工具函数
├── supabase/            # 数据库迁移脚本
└── ...
\`\`\`

## 🎨 设计风格

- **色调**: 深灰色系 + 神秘蓝绿色
- **特效**: 毛玻璃效果、萤火虫飘动、悬停发光
- **氛围**: 神秘森林、静谧治愈

## 🚀 部署

项目完成后将使用 Lighthouse 部署到云端。

\`\`\`bash
npm run build
\`\`\`

## 📝 开发说明

### Supabase数据库表结构

- `users`: 用户信息
- `wallets`: 用户钱包（点数余额）
- `secrets`: 树洞秘密
- `comments`: 评论
- `notifications`: 通知
- `transactions`: 交易记录
- `user_secret_views`: 用户查看记录

### 核心功能流程

1. **注册登录**: Supabase Auth自动创建用户和钱包（初始100点数）
2. **发布秘密**: 输入内容 → 敏感词过滤 → 设定价格 → 存入数据库
3. **随机倾听**: 查询未查看的秘密 → 随机选择 → 展示预览 → 付费解锁
4. **评论互动**: 发表评论 → 创建通知 → Realtime推送给洞主
5. **积分流转**: 支付点数 → 买家扣除 → 卖家增加 → 记录交易

## 🔒 隐私保护

- 所有用户名统一显示为 "momo"
- 真实用户ID仅在后端使用
- 使用Supabase RLS策略保护数据安全
- 敏感内容过滤

## 📄 License

MIT

## 👥 贡献

欢迎提交Issue和Pull Request！
