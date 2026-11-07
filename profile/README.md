# 接入 dsh profile 需要改动的两处（~/.dsh/profiles/web/）

## 1. package.json

```json
{
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "dsh-whale-girl-decoration"
      ]
    }
  },
  "dependencies": {
    "dsh-whale-girl-decoration": "link:/home/syh/project/dsh-whale-girl-decoration"
  }
}
```

- `bundles` 数组追加插件名
- `dependencies` 加 link 指向插件实际路径

## 2. cordis.patch.yml

无需改动。插件自带的 `cordis.patch.yml`（`- insert: id: whale-girl`）
会随 bundle 自动生效。

改完后重启 `dsh web`。
