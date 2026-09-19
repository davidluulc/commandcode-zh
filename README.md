# Command Code 中文汉化包 🇨🇳

[Command Code](https://commandcode.ai) 桌面版（beta）目前没有中文界面。这个项目通过**注入一层运行时翻译器**，把界面实时替换为中文——不修改应用任何逻辑、不改一行官方代码、随时可一键卸载。

> ⚠️ 非官方项目，仅供个人学习使用。官方将来若推出原生中文，本包即可光荣退役。

## ✨ 特性

- **零侵入**：翻译层是独立的 `zh.js`，仅在 `index.html` 里加一行 `<script>` 引用；原版文件自动备份为 `index.html.orig`
- **动态翻译**：基于 `MutationObserver` 实时翻译，兼容 React 动态渲染、弹窗、悬浮提示（aria-label / placeholder / title）
- **词表驱动**：约 230 条词条覆盖主界面、模式菜单、设置全部 7 个子页面
- **单词边界安全**：短词只做整串精确匹配，不会把 "Accepts" 切成「接受s」、不会误伤 "Qwen 3.7 Max" 这类模型名
- **防混拼**：多词短语才允许子串替换，杜绝「搜索 models」这类中英夹杂
- **代码零污染**：`<code>` / `<pre>` / 终端输出一律不翻译，AI 写的代码不会被动

## 📦 安装

前提：已安装 [Command Code 桌面版](https://commandcode.ai/zh/desktop)（Windows）。

```powershell
git clone https://github.com/davidluulc/commandcode-zh.git
cd commandcode-zh
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

然后**完全退出** Command Code（含托盘图标）再重新打开，界面即为中文。

## 🔄 应用更新后恢复汉化

Command Code 自动更新会覆盖安装目录，汉化随之失效。重新执行一次即可：

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

## 🗑️ 卸载

```powershell
powershell -ExecutionPolicy Bypass -File .\uninstall.ps1
```

恢复英文原版，无任何残留。

## 🔧 工作原理

1. `install.ps1` 把 `zh.js` 复制进应用的渲染目录，并在 `index.html` 的 `</body>` 前注入一行脚本引用（应用 CSP 允许同源脚本加载）
2. `zh.js` 注册 `MutationObserver` 监听所有 DOM 变化，对文本节点和常见属性做词典替换
3. 初始全量扫描 + 增量监听双保险，覆盖 React 的异步渲染

排查技巧：带 `--remote-debugging-port=9222` 参数启动应用，即可用 DevTools 协议检查页面状态（本项目开发期即用此方法定位了 4 个引擎级 bug）。

## ➕ 词典贡献

发现没翻译的界面文字？两种方式：

1. 直接编辑 `zh.js` 顶部 `D` 词典对象，加一行 `'English': '中文'`，重启应用
2. 提 Issue 附上英文原文和位置，或直接发 PR

## ⚠️ 已知限制

- 覆盖约 90% 的常见界面，长尾文案仍在补充中
- 应用更新可能改变文案用词，需要同步更新词表
- 仅测试了 Windows v0.1.35；macOS / Linux 路径不同，脚本需自行调整

## 📄 许可证

[MIT](./LICENSE) —— 词典文案可随意取用，署名即可。
