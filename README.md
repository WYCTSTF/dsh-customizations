# dsh-customizations

本地对 DeepSeek Harness (DSH) Web GUI 的自制外观定制，以**独立插件**形式实现，
不修改 dsh 源码，因此**不需要 fork dsh**。

## 内容

| 路径 | 说明 |
|---|---|
| `plugins/dsh-whale-girl-decoration/` | 装饰插件：双叶理央毛玻璃主题（两套壁纸）+ 默认外观切换下拉 + 鲸鱼娘立绘 |
| `profile/` | 接入 profile 的配置说明（bundles + link 依赖） |
| `docs/class-hash-map.md` | ★ 前端构建哈希类对照表（升级适配的主要工作量在这里） |
| `docs/debug-recipes.md` | dsh 升级后重新定位哈希类的调试流程 |

## 安装（新机器 / 公司侧）

```bash
# 1. 把插件放进任意目录（示例：~/project/dsh-customizations/plugins/dsh-whale-girl-decoration）

# 2. 在 dsh profile 目录（~/.dsh/profiles/web/）里按 profile/README.md 接线
#    （bundles 追加插件名 + dependencies 加 link 依赖）

# 3. 重启 dsh web，浏览器强刷（Ctrl+Shift+R）
```

主题切换按钮在窗口左下角：默认外观 / 理央主题 Ⅰ / 理央主题 Ⅱ。
选择存 localStorage（key: `rio-theme-mode`），刷新保持。

## 升级适配（dsh 更新后主题失效时）

99% 的情况只是前端构建哈希类变了。打开 `plugins/.../client.js` 顶部的
`HASH` 表，按 `docs/debug-recipes.md` 的流程重新定位并更新表里的几个前缀即可。
