import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://portfolio.example/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete 3D portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>廖沁｜品牌内容营销与社交传播<\/title>/);
  assert.match(html, /HI, I(?:&#x27;|')M LIAOQIN/);
  assert.match(html, /让品牌想说的话/);
  assert.match(html, /品牌内容营销 \/ 内容策略/);
  assert.match(html, /BOP × 迪丽热巴/);
  assert.match(html, /美团团购 × 肖战/);
  assert.match(html, /美团 1218 会员日/);
  assert.match(html, /MURAD × 蔡徐坤/);
  assert.match(html, /CONTENT &amp; SOCIAL/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("keeps the site deployable and self-contained", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /framer-motion/);
  assert.match(page, /lucide-react/);
  assert.match(page, /廖沁-品牌内容营销与内容策略-CV\.pdf/);
  assert.match(layout, /品牌内容营销与社交传播/);
  assert.match(css, /#0c0c0c/i);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/hero-q-excited-cutout-v3.png", import.meta.url)),
    access(new URL("../public/hero-q-happy-cutout-v3.png", import.meta.url)),
    access(new URL("../public/hero-q-expectant-cutout-v3.png", import.meta.url)),
    access(new URL("../public/wechat-qr.jpg", import.meta.url)),
    access(new URL("../public/廖沁-品牌内容营销与内容策略-CV.pdf", import.meta.url)),
    access(new URL("../dist/server/index.js", import.meta.url)),
    access(new URL("../dist/.openai/hosting.json", import.meta.url)),
  ]);
});
