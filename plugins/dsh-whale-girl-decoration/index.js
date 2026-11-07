import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Package root: index.js sits at lib/index.js in the pet layout, but this
// bundle keeps index.js at the package root, so '..' resolves to the package.
const PACKAGE_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)));
const ASSETS = resolve(PACKAGE_ROOT, 'assets');

const IMAGES = [
  { path: '/whale-girl/whale-girl.png', file: resolve(ASSETS, 'whale-girl.png'), type: 'image/png' },
  { path: '/rio-theme/bg-1.jpg', file: resolve(ASSETS, 'rio-theme-1.jpg'), type: 'image/jpeg' },
  { path: '/rio-theme/bg-2.jpg', file: resolve(ASSETS, 'rio-theme-2.jpg'), type: 'image/jpeg' },
];

export const inject = ['webServer'];

export function apply(ctx) {
  for (const img of IMAGES) {
    ctx.effect(() => ctx.webServer.register({
      kind: 'exact',
      path: img.path,
      handler: async (_req, res) => {
        const data = await readFile(img.file);
        res.writeHead(200, {
          'content-type': img.type,
          'content-length': data.length,
          'cache-control': 'public, max-age=3600',
        });
        res.end(data);
      },
    }), `whale-girl: ${img.path} route`);
  }
}
