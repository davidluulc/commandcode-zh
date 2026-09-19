// Command Code 界面汉化层 v1（个人本地使用，不修改应用任何逻辑）
// 原理：MutationObserver 监听界面渲染，把已知英文文案替换为中文
(() => {
  window.__zhProbe = 'v1.8';
  window.__zhStats = { walk: 0, translated: 0, obsFired: 0 };
  const D = {
    // 实测词表（2026-09-19 从真实界面抓取）
    'Command Code works inside a project folder so files, tools, and terminal commands stay in the right place.': 'Command Code 在项目文件夹内工作，文件、工具和终端命令各归其位。',
    'Pick a view, or press its shortcut.': '选择一个视图，或直接按快捷键。',
    'Uncommitted work, file by file': '未提交的改动，逐文件查看',
    'Preview your dev server': '预览你的开发服务器',
    'Browse and open project files': '浏览并打开项目文件',
    'Shells in this project': '此项目中的终端',
    'Open a project to begin': '打开一个项目开始',
    'New thread': '新对话', 'Active agents': '活跃智能体',
    'Pull requests': 'Pull 请求', 'Open a folder…': '打开文件夹…',
    'New folder…': '新建文件夹…', 'Open project': '打开项目',
    'Nothing open': '未打开任何内容', 'Browser': '浏览器',
    // 弹窗/模式菜单（实测补录 2026-09-19）
    'Always asks before making changes': '任何修改前都会先询问',
    'Runs edits and commands without asking': '编辑和命令都直接执行，不再询问',
    'Creates a plan before making changes': '先制定计划，再动手修改',
    'Accepts edits, asks before risky commands': '自动接受编辑，危险命令前仍会询问',
    'Ask for approval': '每次先确认', 'Auto-accept edits': '自动接受编辑',
    'Accepts edits': '自动接受编辑', 'Full access': '完全放手',
    'Mode': '模式', 'Effort': '思考力度',
    'Default': '默认', 'High': '高',
    'No chats yet': '还没有对话', 'What\'s keeping you up?': '这么晚了还在忙什么？',
    'What should we work on?': '今天做点什么？', 'What\'s the plan?': '接下来做什么？',
    'Late night': '夜深了',
    // 混拼修复 + 控件实测补录
    'Chats and projects': '对话与项目', 'Open a view': '打开一个视图',
    'Close sidebar': '关闭侧栏', 'Close window': '关闭窗口',
    'Search models': '搜索模型', 'Search threads': '搜索对话',
    'Add project': '添加项目', 'Add context': '添加上下文',
    'Views': '视图', 'Resize sidebar': '调整侧栏宽度',
    'Minimize': '最小化', 'Maximize': '最大化',
    'Toggle terminal': '切换终端', 'Show panel': '显示面板',
    'Context usage': '上下文用量', 'Permissions:': '权限：',
    'Shift+Tab cycles': 'Shift+Tab 循环切换',
    // ===== 设置页（实测全量抓取 2026-09-19）=====
    'App': '应用', 'Version, layout and the built-in terminal.': '版本、布局与内置终端。',
    'Currently in beta. You may run into bugs or unexpected behavior.': '目前处于公测阶段，可能遇到 bug 或意外行为。',
    'Up to date.': '已是最新版本。',
    'Alerts': '提醒', 'When a run finishes or the agent needs you.': '任务完成或智能体需要你时。',
    'When the window is in the background': '当窗口处于后台时',
    'Open workbench on launch': '启动时打开工作台',
    'Show the side panel when the app starts.': '应用启动时显示侧边面板。',
    'GPU acceleration': 'GPU 加速',
    'Smoother scrolling under heavy output. Turn off if you see glitches. Applies to new terminals.': '大量输出时滚动更顺滑，出现花屏可关闭。仅对新终端生效。',
    'Output flow control': '输出流控制',
    'Pause fast-printing commands until the screen catches up. Applies to new terminals.': '屏幕跟不上时暂停快速打印的命令。仅对新终端生效。',
    // 外观
    'Theme, type and the shape of the workspace.': '主题、字体与工作区形态。',
    'Interface': '界面', 'Scales text, spacing and controls together. Zoom shortcuts step through these sizes.': '文字、间距和控件同比例缩放。缩放快捷键在这些档位间切换。',
    'Diff layout': '差异布局', 'Applies to diffs opened from now on.': '仅对之后打开的差异生效。',
    'Unified': '统一视图', 'Shades of Purple Dark': '紫影 深色', 'Shades of Purple': '紫影',
    // 快捷键
    'Every key the app binds. Click a shortcut to change it.': '应用所有按键绑定，点击快捷键可修改。',
    'Global': '全局', 'Work from anywhere in the app': '在应用任何位置都生效',
    'Start a fresh conversation in the current project.': '在当前项目开启新对话。',
    'Archive current chat': '归档当前对话',
    'Move the open chat out of the sidebar.': '把当前对话移出侧边栏。',
    'Search and commands': '搜索与命令',
    'Open the command palette to jump to chats and files.': '打开命令面板，快速跳转对话和文件。',
    'Select chat 1 to 9': '选择第 1 至 9 个对话',
    'Jump to a chat by its position in the sidebar.': '按侧边栏位置跳转对话。',
    'Cannot be changed': '不可更改', 'Show or hide the chat list.': '显示或隐藏对话列表。',
    'Pick a folder to work in.': '选择要工作的文件夹。',
    'New window': '新建窗口', 'Open another Command Code window.': '打开另一个 Command Code 窗口。',
    'Open this settings screen.': '打开本设置页。',
    'Cycle permission mode': '循环切换权限模式',
    'Switch between Ask, Auto-accept edits and Plan from anywhere.': '在「每次确认、自动接受编辑、计划」间切换。',
    'Interrupt the run': '中断运行',
    'Stops the agent when nothing is selected; copies otherwise.': '无选中内容时停止智能体，否则执行复制。',
    'Make everything larger.': '放大所有内容。', 'Make everything smaller.': '缩小所有内容。',
    'Return to the default size.': '恢复默认大小。',
    'Reading the conversation': '阅读对话',
    'Expand or collapse all traces': '展开/折叠所有调用轨迹',
    'Show or hide every tool call in the conversation.': '显示或隐藏对话中的所有工具调用。',
    'Composer': '输入框', 'While the message box has focus': '消息框获得焦点时',
    'Enter sends and Shift+Enter breaks a line, or the reverse.': 'Enter 发送、Shift+Enter 换行，或反过来。',
    'Insert newline': '插入换行', 'Follows the send key.': '跟随发送键设置。',
    'Ask, Auto-accept edits, then Plan, while typing.': '输入时在「每次确认、自动接受、计划」间循环。',
    // 高级
    'Everything the CLI exposes through /config, in one place.': 'CLI /config 的所有选项，集中一处。',
    'Image vision': '图像视觉',
    'Describe attached images for models that cannot see them.': '为看不懂图片的模型描述附件图像。',
    'Ask on first use': '首次使用时询问',
    'Taste learning (this project)': '品味学习（本项目）',
    'Learn your coding style from this project only (same setting as /taste).': '仅从本项目学习你的代码风格（同 /taste 设置）。',
    'Inherit from user': '跟随用户设置', 'Background tasks': '后台任务',
    'Which model runs each task.': '各任务分别用哪个模型。',
    'Session titles': '会话标题', 'Names a session after its first exchange.': '用会话首轮对话命名。',
    'Compaction': '上下文压缩',
    'Summarizes long conversations when context fills up.': '上下文将满时自动总结长对话。',
    'Taste learning': '品味学习', 'Learns your coding style from your sessions.': '从你的会话中学习代码风格。',
    'Image descriptions': '图像描述',
    'Describes attached images so a text-only model can read them.': '为纯文本模型描述附件图片。',
    'Privacy': '隐私', 'Zero data retention': '零数据保留',
    'Only use providers that keep no data and never train on it. Models without one switch to a qualifying provider, which can cost more.': '只使用不保留数据、绝不用于训练的供应商。不满足的模型会切换到合规供应商，费用可能更高。',
    // 技能 / MCP / Taste
    'Instructions the agent follows. Install from skills.sh or a repo.': '智能体遵循的指令，可从 skills.sh 或仓库安装。',
    'Installed': '已安装', 'Browse': '浏览', 'Filter installed skills': '筛选已安装技能',
    'No project open. Changes save to your user settings.': '未打开项目，更改将保存到用户设置。',
    'User skills': '用户技能', 'In every project on this machine.': '本机所有项目通用。',
    'Model Context Protocol servers that give the agent tools.': '为智能体提供工具的 MCP 服务器。',
    'Servers': '服务器', 'No servers yet': '还没有服务器',
    'Add an MCP server to give the agent tools like a browser, a database or your docs.': '添加 MCP 服务器，给智能体浏览器、数据库或文档等工具。',
    'Add server': '添加服务器',
    'Preferences the agent learned from your sessions here.': '智能体从这些会话中学到的偏好。',
    'Nothing learned yet': '还没有学到任何偏好',
    'Learn from sessions': '从会话学习',
    'Quiet hours. Good time to build.': '安静时段，正是写代码的好时候。',
    'Good morning': '早上好', 'Good afternoon': '下午好', 'Good evening': '晚上好',
    '(latest)': '（最新）',
    // 长词优先
    'Check for updates': '检查更新', 'Message Command Code': '联系官方', 'Save changes': '保存更改',
    'View fullscreen': '全屏查看', 'Get started': '开始使用', 'Learn more': '了解更多',
    'Sign in with email': '邮箱登录', 'New conversation': '新对话', 'Copy code': '复制代码',
    'Sign out': '退出登录', 'Log out': '退出登录', 'Sign in': '登录', 'Sign up': '注册', 'Log in': '登录',
    'New chat': '新对话', 'New session': '新会话', 'New project': '新建项目',
    'Try again': '重试', 'Unknown error': '未知错误', 'Loading…': '加载中…', 'Loading': '加载中',
    'Settings': '设置', 'Preferences': '首选项', 'Account': '账户', 'Usage': '用量',
    'Credits': '额度', 'Billing': '账单', 'Upgrade': '升级', 'Plans': '套餐', 'Plan mode': '计划模式',
    'Agents': '智能体', 'Agent': '智能体', 'Skills': '技能', 'Skill': '技能',
    'Memory': '记忆', 'Plugins': '插件', 'Plugin': '插件', 'Models': '模型', 'Model': '模型',
    'Providers': '供应商', 'Provider': '供应商', 'Projects': '项目', 'Project': '项目',
    'Sessions': '会话', 'Session': '会话', 'Chats': '对话', 'Chat': '对话',
    'Terminal': '终端', 'Files': '文件', 'File': '文件', 'Changes': '更改', 'Change': '更改',
    'Commit': '提交', 'Branch': '分支', 'Preview': '预览', 'Workspace': '工作区',
    'Dashboard': '仪表盘', 'Feedback': '反馈', 'Shortcuts': '快捷键', 'About': '关于',
    'Download': '下载', 'Install': '安装', 'Restart': '重启', 'Update': '更新',
    'Theme': '主题', 'Appearance': '外观', 'Language': '语言', 'Invite': '邀请',
    'Team': '团队', 'Share': '分享', 'Export': '导出', 'Import': '导入',
    'Send': '发送', 'Stop': '停止', 'Resume': '继续', 'Continue': '继续',
    'Cancel': '取消', 'Save': '保存', 'Delete': '删除', 'Remove': '移除',
    'Edit': '编辑', 'Copy': '复制', 'Retry': '重试', 'Search': '搜索',
    'Filter': '筛选', 'Sort': '排序', 'Refresh': '刷新', 'Open': '打开',
    'Close': '关闭', 'Back': '返回', 'Next': '下一步', 'Done': '完成',
    'Error': '错误', 'Warning': '警告', 'Success': '成功', 'Overview': '概览',
    'Activity': '活动', 'Diff': '差异对比', 'Review': '审查', 'Approve': '批准',
    'Reject': '拒绝', 'Accept': '接受', 'Applied': '已应用', 'Copied': '已复制',
    'Dark': '深色', 'Light': '浅色', 'System': '跟随系统', 'Docs': '文档',
    'Documentation': '文档', 'Help': '帮助', 'Submit': '提交', 'Clear': '清空',
    'Reset': '重置', 'Enable': '启用', 'Disable': '禁用', 'Enabled': '已启用',
    'Disabled': '已禁用', 'Running': '运行中', 'Paused': '已暂停', 'Completed': '已完成',
    'Failed': '失败', 'Pending': '等待中', 'Today': '今天', 'Yesterday': '昨天',
    'Free': '免费', 'Monthly': '按月', 'Yearly': '按年', 'Profile': '个人资料',
    'Notifications': '通知', 'Advanced': '高级', 'General': '通用', 'Security': '安全',
    'Version': '版本', 'Release notes': '更新日志', "What's new": '新功能',
    'Zoom in': '放大', 'Zoom out': '缩小', 'Fullscreen': '全屏',
    'Ask anything': '随便问', 'Type a message…': '输入消息…', 'Send message': '发送消息'
  };
  const phrases = Object.keys(D).sort((a, b) => b.length - a.length);
  const SKIP = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'NOSCRIPT']);

  const esc = p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rxCache = {};
  const rx = p => rxCache[p] || (rxCache[p] = new RegExp('(?<!\\w)' + esc(p) + '(?!\\w)', 'g'));
  function tr(s) {
    if (!s) return s;
    const t = s.trim();
    if (D[t] && t === s.replace(/^ +| +$/g, '')) return s.replace(t, D[t]);
    let out = s;
    for (const p of phrases) {
      // 短单词只在整串精确匹配时翻译（由上方 exact 分支处理），
      // 子串替换仅用于多词短语或长句，避免 "Open a view"->"打开 a view" 式混拼
      if ((p.includes(' ') || p.length >= 10) && out.includes(p)) out = out.replace(rx(p), D[p]);
    }
    return out;
  }

  function walk(node) {
    window.__zhStats.walk++;
    if (node.nodeType === 3) {
      if (!node.nodeValue || !node.nodeValue.trim()) return;
      const p = node.parentElement;
      if (!p || SKIP.has(p.tagName)) return;
      const nv = tr(node.nodeValue);
      if (nv !== node.nodeValue) { window.__zhStats.translated++; node.nodeValue = nv; }
    } else if (node.nodeType === 1 && !SKIP.has(node.tagName)) {
      if (node.placeholder) { const v = tr(node.placeholder); if (v !== node.placeholder) node.placeholder = v; }
      if (node.title) { const v = tr(node.title); if (v !== node.title) node.title = v; }
      if (node.hasAttribute('aria-label')) { const v = tr(node.getAttribute('aria-label')); if (v !== node.getAttribute('aria-label')) node.setAttribute('aria-label', v); }
    }
  }

  function sweep(root) {
    walk(root);
    for (const child of root.childNodes) {
      if (child.nodeType === 1) sweep(child); else walk(child);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('lang', 'zh-CN');
    if (document.title === 'Command Code') document.title = 'Command Code';
    sweep(document.body || document);
    new MutationObserver(muts => {
      for (const m of muts) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(n => { if (n.nodeType === 1) sweep(n); else walk(n); });
        } else if (m.type === 'characterData') walk(m.target);
        else if (m.type === 'attributes') walk(m.target);
      }
    }).observe(document.body || document, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['title', 'aria-label', 'placeholder'] });
  });
})();
