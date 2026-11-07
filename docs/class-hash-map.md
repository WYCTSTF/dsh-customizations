# 前端构建哈希类对照表

dsh web 前端用 CSS Modules，类名格式为 `<hash>_<name>`（如 `pI_x6G_frame`），
`<hash>` 前缀随每次构建变化，`<name>` 可读部分稳定。插件 `client.js` 顶部的
`HASH` 表集中维护这些前缀；dsh 升级后主题失效时，按 `debug-recipes.md`
重新定位并更新此表 + HASH 表。

## 当前映射（本地 dsh 版本，2026-11）

| HASH 键 | 当前值 | 来源包 | 覆盖内容与目的 |
|---|---|---|---|
| `layout` | `pI_x6G` | dsh-client-ui-layout | `frame`（整体背景转透明）、`sidebarCol`/`centerCol`/`bottomRow`（加 backdrop blur；bottomRow 自身背景转透明防白条） |
| `composer` | `uV2eYG` | chat UI（composer 区） | `root` 的白渐变背景转透明 |
| `chatView` | `wSkVaW` | chat UI（视图区） | `body`/`scrollBody` 的滚动白底转透明 |
| `sessionList` | `bhn1Oq` | dsh-client-ui-workspace | `fade`（会话列表底部 24px 渐隐条）转透明 |
| `settingsAccount` | `yHnPSG` | dsh-client-ui-settings-account | 侧栏设置触发钮（`trigger`）静止背景转透明，保留 hover |
| `settingsGeneral` | `VOzbGW` | dsh-client-ui-settings-general | `triggerRow`（无背景，仅备用） |

## 哈希无关的兜底选择器（一般不需随升级改动）

| 选择器片段 | 目的 |
|---|---|
| `[class*="composerSeat"]` | 输入框座位层：全宽"透明→白"渐变，毛玻璃下的白条元凶 |
| `[class*="bannerWrap"]` | 顶部 sticky 横幅底色转透明 |
| CSS 变量覆盖（body 级） | `--dsw-alias-bg-base` / `--dsw-specific-sidebar-fill` / `--dsw-alias-bg-layer-1/2/3` / `--dsw-alias-bg-module-platform` 调半透明；浅色在 `body`，深色在 `body[data-ds-dark-theme]` |

## 关键领域知识（不易重新发现的部分）

- 主题 CSS 变量定义在 **body 层**（`:root` 只有一部分），覆盖必须写在
  `html[...] body` 才能赢过 body 自身定义。
- `shell.overlay` slot 渲染在 frame 的 overlayLayer（z-index 20）内，
  子元素自动获得 pointer-events。
- 插件客户端代码（client.js）浏览器刷新即生效；插件服务端路由（index.js）
  改动需要重启 `dsh web` 进程。
- 白条类问题的通用套路：多层半透明白（bg-base/layer/渐隐条）alpha 复合，
  找到画它的那一层置 `background: transparent !important`。
