# 🚀 树洞红包 - 部署指南

## 📋 前置要求

在开始之前，请确保你已经：

1. ✅ 注册了 [Supabase](https://supabase.com) 账号
2. ✅ 安装了 Node.js (v18+) 和 npm

## 🛠️ 快速开始

### 第一步：配置Supabase数据库

#### 1. 创建Supabase项目

1. 访问 [https://supabase.com](https://supabase.com) 并登录
2. 点击 "New Project" 创建新项目
3. 填写项目信息：
   - Project name: `tree-hole-app`（或你喜欢的名字）
   - Database Password: 设置一个强密码
   - Region: 选择最近的区域
4. 等待项目创建完成（约2分钟）

#### 2. 运行数据库迁移

1. 在Supabase项目中，点击左侧菜单的 "SQL Editor"
2. 点击 "New query"
3. 复制项目中的 `supabase/migrations/001_init_schema.sql` 文件内容
4. 粘贴到SQL编辑器中
5. 点击 "Run" 执行脚本
6. 确认所有表和函数都创建成功（应该看到绿色的成功提示）

#### 3. 获取API密钥

1. 点击左侧菜单的 "Project Settings"
2. 点击 "API" 标签
3. 复制以下信息：
   - `Project URL`（形如: https://xxxxx.supabase.co）
   - `anon public` key（一串很长的字符串）

### 第二步：配置环境变量

1. 在项目根目录，复制 `.env.example` 文件为 `.env.local`：
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. 编辑 `.env.local` 文件，填入你的Supabase配置：
   \`\`\`env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   \`\`\`

### 第三步：启动应用

\`\`\`bash
# 确保依赖已安装
npm install

# 启动开发服务器
npm run dev
\`\`\`

访问 `http://localhost:5173` 查看应用！

## ✅ 测试功能

### 1. 注册账号

1. 点击右上角 "注册"
2. 填写昵称、邮箱和密码
3. 注册成功后会自动登录，并获得 **100初始点数**

### 2. 发布树洞

1. 点击 "倾诉树洞"
2. 输入秘密内容
3. 拖动滑块设定点数价格（1-100）
4. 点击 "发布到树洞"

### 3. 倾听树洞

1. 点击 "倾听树洞"
2. 系统随机推送一个你未看过的树洞
3. 点击 "支付查看" 解锁完整内容
4. 查看后可以添加评论

### 4. 评论互动

1. 在秘密详情页底部输入评论
2. 秘密作者会收到实时通知
3. 所有评论者显示为 "momo" 保护隐私

### 5. 查看个人中心

1. 点击右上角用户图标
2. 查看钱包余额、收益统计
3. 查看发布的树洞和购买的树洞

## 🎨 功能特性

- ✨ **完全匿名**：所有用户显示为 "momo"
- 💰 **积分系统**：虚拟点数替代真实支付
- 🌲 **倾诉树洞**：匿名发布秘密
- 👂 **倾听树洞**：随机发现秘密
- 💬 **评论互动**：实时通知
- 📱 **响应式设计**：完美适配各种设备

## 🐛 常见问题

### Q: 注册后没有收到确认邮件？

A: Supabase默认开启了邮箱确认功能。在开发阶段，你可以：
1. 在Supabase项目中，点击 "Authentication" > "Policies"
2. 关闭 "Email Confirmations"
3. 或者在Supabase项目的 "Authentication" > "Users" 中手动确认用户

### Q: 找不到树洞？

A: 需要至少有2个用户，一个发布树洞，另一个才能倾听。你可以：
1. 注册多个测试账号
2. 分别发布一些树洞
3. 切换账号进行倾听

### Q: 支付失败？

A: 检查以下几点：
1. 确认你的点数余额充足
2. 确认不是自己发布的树洞（不能倾听自己的秘密）
3. 检查浏览器控制台是否有错误信息

## 🚀 部署到生产环境

应用已经准备好使用Lighthouse部署。完成所有功能测试后，可以执行部署任务。

## 📞 需要帮助？

如果遇到任何问题，请检查：
1. Supabase项目是否正确配置
2. 环境变量是否正确填写
3. 数据库迁移是否成功执行
4. 浏览器控制台是否有错误信息

祝你使用愉快！🌲✨
