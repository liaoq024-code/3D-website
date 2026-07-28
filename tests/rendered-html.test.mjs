import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://portfolio.example${pathname}`, {
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
  assert.match(html, /品牌内容营销与社交传播展示/);
  assert.match(html, /科技达人内容总播放量/);
  assert.doesNotMatch(html, />科技内容播放</);
  assert.match(html, /营销项目品牌方一览/);
  assert.match(html, /美团品牌 Logo/);
  assert.match(html, /华为品牌 Logo/);
  assert.match(html, /BOP × 迪丽热巴/);
  assert.match(html, /美团团购 × 肖战/);
  assert.match(html, /美团 1218 会员日/);
  assert.match(html, /MURAD × 蔡徐坤/);
  assert.match(html, /精选品牌营销案例/);
  assert.match(html, /品牌有卖点，但内容太像广告？/);
  assert.match(html, /Campaign 项目统筹与复杂项目落地能力/);
  assert.match(html, /点击探索/);
  assert.match(html, /aria-pressed="false"/);
  assert.match(html, /CONTENT &amp; SOCIAL/);
  assert.match(html, /我关注的不只是内容有没有发布/);
  assert.match(html, /查看四个完整案例/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("server-renders every extended portfolio page", async () => {
  const routes = [
    ["/campaigns", [/BOP 多账号品牌传播/, /#比月圆还准时的是老己的爱/, /376万\+/]],
    ["/content-social", [/会火大明星/, /科技真探 Techdetective/, /5000万\+/]],
    ["/about", [/湖南广播电视台娱乐频道/, /浙江传媒学院/, /IELTS 6\.5/]],
    ["/contact", [/1430943020@qq\.com/, /完整号码请查看简历/, /品牌内容营销/]],
  ];

  for (const [pathname, patterns] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
    const html = await response.text();
    for (const pattern of patterns) assert.match(html, pattern);
  }
});

test("keeps the site deployable and self-contained", async () => {
  const [page, campaigns, contentSocial, about, contact, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/campaigns/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content-social/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /framer-motion/);
  assert.match(page, /lucide-react/);
  assert.match(page, /廖沁-品牌内容营销与内容策略-CV\.pdf/);
  assert.match(campaigns, /campaignCases/);
  assert.match(contentSocial, /科技内容统筹/);
  assert.match(about, /工作经历/);
  assert.match(contact, /wechat-qr\.jpg/);
  assert.match(layout, /品牌内容营销与社交传播/);
  assert.match(css, /#0c0c0c/i);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.brand-logo-media[\s\S]*place-items: center/);
  assert.match(css, /\.brand-logo-media img[\s\S]*object-fit: contain/);
  assert.match(css, /@keyframes brand-logo-scroll-left[\s\S]*from \{ transform: translateX\(0\)/);
  assert.match(css, /to \{ transform: translateX\(calc\(-50% - 7px\)\)/);
  assert.match(css, /\.hero-description-main[\s\S]*white-space: nowrap/);
  assert.match(css, /\.hero-cover-tagline-wrap[\s\S]*position: absolute/);
  assert.match(css, /\.hero-cover-tagline-heading > span[\s\S]*white-space: nowrap/);
  assert.match(css, /\.problem-card h3[\s\S]*font-size: clamp\(1\.4rem, 1\.8vw, 2rem\)/);
  assert.match(css, /\.problem-card\.is-active[\s\S]*translateY\(-9px\) scale\(1\.015\)/);
  assert.match(css, /\.problem-card-copy[\s\S]*margin-top: 23px/);
  assert.match(css, /font-family: "YouSheBiaoTiHei"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/hero-q-excited-cutout-v3.png", import.meta.url)),
    access(new URL("../public/hero-q-happy-cutout-v3.png", import.meta.url)),
    access(new URL("../public/hero-q-expectant-cutout-v3.png", import.meta.url)),
    access(new URL("../public/fonts/YouSheBiaoTiHei.woff2", import.meta.url)),
    access(new URL("../public/brand-logos/fitted-v3/meituan.png", import.meta.url)),
    access(new URL("../public/brand-logos/fitted-v3/huawei.png", import.meta.url)),
    access(new URL("../public/brand-logos/fitted-v3/bop.png", import.meta.url)),
    access(new URL("../public/brand-logos/fitted-v3/murad.png", import.meta.url)),
    access(new URL("../public/brand-logos/fitted-v3/urban-revivo.png", import.meta.url)),
    access(new URL("../public/brand-logos/fitted-v3/ambrosial.png", import.meta.url)),
    access(new URL("../public/brand-logos/fitted-v3/maogeping.png", import.meta.url)),
    access(new URL("../public/brand-logos/fitted-v3/nexxus.png", import.meta.url)),
    access(new URL("../public/brand-logos/fitted-v3/jiajia.png", import.meta.url)),
    access(new URL("../public/wechat-qr.jpg", import.meta.url)),
    access(new URL("../public/廖沁-品牌内容营销与内容策略-CV.pdf", import.meta.url)),
    access(new URL("../dist/server/index.js", import.meta.url)),
    access(new URL("../dist/.openai/hosting.json", import.meta.url)),
  ]);
});
