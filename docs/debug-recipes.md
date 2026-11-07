# 调试流程：dsh 升级后重新定位哈希类

主题失效（背景丢失 / 白条回归 / 模糊消失）时的排查步骤。

## 0. 先分清是哪一层失效

| 症状 | 层级 | 处理 |
|---|---|---|
| 连"变色"都没有 | 客户端脚本没加载 / CSS 变量层级变了 | 强刷 Ctrl+Shift+R；确认 `document.getElementById('rio-theme-style')` 存在 |
| 变色但背景图没了 | 服务端路由或 body 背景问题 | 确认 `/rio-theme/bg-1.jpg` 可访问；**index.js 改过就要重启 `dsh web`** |
| 变色有图但某处白条/白块 | 某个元素的半透明/渐变背景 | 走下面的定位流程 |
| 模糊消失 | backdrop-filter 的哈希类失效 | 更新 `HASH.layout` |

## 1. 定位白块是哪个元素画的

在白块位置取一个点（横坐标 x, 离底 y），Console 执行：

```js
copy(document.elementsFromPoint(x, y)
  .map(e => e.tagName + ' cls=' + String(e.className).slice(0, 80)).join('\n'))
```

输出是从最上层到 body 的完整元素堆叠。最上面带可见背景的元素通常就是画白块的。

## 2. 确认它实际画的背景

```js
copy([...document.querySelectorAll('把该元素的选择器放这里')]
  .map(e => { const s = getComputedStyle(e);
    return String(e.className).slice(0, 50)
      + ' | bgc=' + s.backgroundColor
      + ' | bgi=' + s.backgroundImage.slice(0, 60); }).join('\n'))
```

`bgc` 不是 `rgba(0,0,0,0)` 或 `bgi` 是 `linear-gradient(...)` 的就是元凶。

## 3. 提取新哈希前缀并更新

类名形如 `<hash>_<name>`。取 hash 部分（如 `wSkVaW_body` → `wSkVaW`），
对照 `class-hash-map.md` 找到对应 HASH 键，更新 `client.js` 顶部的 `HASH` 表。
完全新增的元素则在 THEME_CSS 里加一条 `[class*="<hash>_<name>"]` 覆盖，
并在对照表中登记。

## 4. 验证

强刷（Ctrl+Shift+R）。插件客户端代码刷新即生效；若改了 index.js（路由/资源）
需重启 `dsh web` 进程。
