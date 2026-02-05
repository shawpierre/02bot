# 📦 部署指南

## 使用 Lighthouse 部署

### 前置要求

1. 确保应用在本地运行正常
2. 确保 Supabase 配置正确
3. 所有功能测试通过

### 部署步骤

#### 1. 构建生产版本

\`\`\`bash
npm run build
\`\`\`

这会在 `dist/` 目录生成优化后的生产文件。

#### 2. 部署到 Lighthouse

当你准备好部署时，使用CodeBuddy的Lighthouse集成功能：

1. 在CodeBuddy IDE中，确保项目已构建
2. 使用部署工具将应用部署到Lighthouse实例
3. 配置环境变量（VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY）
4. 获取部署后的URL

#### 3. 验证部署

部署完成后，访问生成的URL并测试以下功能：

- ✅ 用户注册和登录
- ✅ 发布树洞
- ✅ 倾听树洞
- ✅ 支付和解锁
- ✅ 评论功能
- ✅ 实时通知
- ✅ 个人中心

### 环境变量配置

确保在生产环境中设置以下环境变量：

\`\`\`
VITE_SUPABASE_URL=你的Supabase项目URL
VITE_SUPABASE_ANON_KEY=你的Supabase Anon Key
\`\`\`

### 性能优化建议

1. **启用CDN**: 静态资源通过CDN加速
2. **启用Gzip压缩**: 减小传输文件大小
3. **配置缓存策略**: 静态资源长缓存
4. **监控性能**: 使用Supabase监控数据库查询性能

### 安全检查

- ✅ 所有API密钥使用环境变量
- ✅ Supabase RLS策略已启用
- ✅ 敏感词过滤已启用
- ✅ 用户输入已验证

## 🎉 完成！

应用已成功部署到生产环境！

现在用户可以：
- 🌲 匿名分享秘密
- 👂 倾听他人的故事
- 💬 温暖的评论互动
- 💰 通过积分系统获得回报

祝运营顺利！
