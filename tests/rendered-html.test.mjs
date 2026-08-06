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
  assert.match(html, /美团 18号 会员日/);
  assert.match(html, /MURAD × 蔡徐坤/);
  assert.match(html, /查看详细案例/);
  assert.match(html, /href="\/campaigns\/bop"/);
  assert.match(html, /BOP × 迪丽热巴项目主视觉/);
  assert.match(html, /美团团购 × 肖战项目主视觉/);
  assert.match(html, /美团 18号 会员日项目主视觉/);
  assert.match(html, /MURAD × 蔡徐坤项目主视觉/);
  assert.match(html, /此为40\+账号三阶段传播项目/);
  assert.match(html, /保障爆发期和长尾期执行侧零延期、零漏发/);
  assert.match(html, /3条/);
  assert.match(html, /高表现内容/);
  assert.match(html, /最高自然流点赞/);
  assert.match(html, /has-inline-suffix/);
  assert.doesNotMatch(html, /panel-sphere|project-core|project-orbit/);
  assert.match(html, /精选品牌营销案例/);
  assert.match(html, /品牌有卖点，但内容太像广告？/);
  assert.match(html, /Campaign 项目统筹与复杂项目落地能力/);
  assert.match(html, /内容判断/);
  assert.match(html, /热点与用户情绪洞察｜自然流内容判断｜账号调性匹配｜短视频选题与脚本/);
  assert.match(html, /品牌内容/);
  assert.match(html, /传播议题提炼｜话题词与内容方向｜品牌信息原生化表达｜明星和热点内容策划｜脚本与成片审核/);
  assert.match(html, /社交媒体/);
  assert.match(html, /抖音内容运营｜微博话题传播｜账号定位与栏目规划｜内容矩阵｜平台数据复盘/);
  assert.match(html, /项目管理/);
  assert.match(html, /客户沟通｜项目排期｜账号资源分配｜多轮反馈管理｜跨团队协作｜风险预警与数据验收/);
  assert.match(html, /id="project-bop"/);
  assert.doesNotMatch(html, /点击探索|已选中/);
  assert.match(html, /tabindex="0"/);
  assert.match(html, /CONTENT &amp; SOCIAL/);
  assert.match(html, /我关注的不只是内容有没有发布/);
  assert.match(html, /查看四个完整案例/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("server-renders every extended portfolio page", async () => {
  const routes = [
    ["/campaigns", [/独立案例目录/, /BOP × 迪丽热巴/, /查看详细案例/]],
    ["/campaigns/bop", [/BOP 多账号品牌传播/, /三阶段节点集中/, /品牌任务与自然流兼顾/, /客户反馈不确定性/, /建立双维度内容审核标准/, /685\.4万\+/, /9\.7万\+/, /40\+ 账号/, /3条/, /高表现内容/, /20条/, /品牌小蓝词/, /展开高表现视频/, /6PLDP6rFPZQ/, /19NEkWXN6Ms/, /5xtG-vvvcps/, /2\.3万/, /106万/, /1\.5万/, /36万/, /1\.2万/, /28万/]],
    ["/campaigns/meituan-xiaozhan", [/美团团购 × 肖战代言传播/, /376万\+/, /40条/]],
    ["/campaigns/meituan-membership", [/美团 1218 会员日/, /#比月圆还准时的是老己的爱/, /1894\.3万/]],
    ["/campaigns/murad", [/MURAD × 蔡徐坤代言官宣/, /12\.3万/, /10 个娱乐账号/]],
    ["/content-social", [/会火大明星/, /科技真探 Techdetective/, /5000万\+/]],
    ["/about", [/湖南广播电视台娱乐频道/, /浙江传媒学院/, /IELTS 6\.5/]],
    ["/contact", [/1430943020@qq\.com/, /完整号码请查看简历/, /品牌内容营销/]],
  ];

  for (const [pathname, patterns] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
    const html = await response.text();
    for (const pattern of patterns) assert.match(html, pattern);
    if (pathname === "/campaigns/bop") {
      assert.doesNotMatch(html, /SELECTED WORKS/);
    }
    if (pathname.startsWith("/campaigns/") && pathname !== "/campaigns/") {
      assert.match(html, /返回主页面/);
      assert.match(html, new RegExp(`href="/#project-${pathname.split("/").at(-1)}"`));
      assert.doesNotMatch(html, /返回案例目录|返回四个案例目录|查看案例目录/);
    }
  }
});

test("keeps each detailed campaign isolated", async () => {
  const isolatedRoutes = [
    ["/campaigns/bop", [/美团团购 × 肖战代言传播/, /美团 1218 会员日/, /MURAD × 蔡徐坤代言官宣/]],
    ["/campaigns/meituan-xiaozhan", [/BOP 多账号品牌传播/, /美团 1218 会员日/, /MURAD × 蔡徐坤代言官宣/]],
    ["/campaigns/meituan-membership", [/BOP 多账号品牌传播/, /美团团购 × 肖战代言传播/, /MURAD × 蔡徐坤代言官宣/]],
    ["/campaigns/murad", [/BOP 多账号品牌传播/, /美团团购 × 肖战代言传播/, /美团 1218 会员日/]],
  ];

  for (const [pathname, forbiddenPatterns] of isolatedRoutes) {
    const html = await (await render(pathname)).text();
    for (const pattern of forbiddenPatterns) assert.doesNotMatch(html, pattern);
  }
});

test("keeps the site deployable and self-contained", async () => {
  const [
    page,
    campaigns,
    campaignDetail,
    fixedPhoneVideo,
    remotePhoneVideo,
    contentSocial,
    about,
    contact,
    layout,
    css,
    packageJson,
  ] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/campaigns/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/campaigns/CampaignDetailPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/campaigns/FixedPhoneVideo.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/campaigns/RemotePhoneVideo.tsx", import.meta.url), "utf8"),
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
  assert.match(css, /\.problem-card:hover,[\s\S]*translateY\(-9px\) scale\(1\.015\)/);
  assert.match(css, /\.problem-card-copy[\s\S]*margin-top: 42px/);
  assert.match(css, /\.problem-card-copy strong[\s\S]*left: 30px[\s\S]*bottom: 30px/);
  assert.doesNotMatch(page, /panel-sphere|project-core|project-orbit/);
  assert.doesNotMatch(page, /project\.role\.slice\(1\)\.map\(\(role\) => <li/);
  assert.match(page, /\/campaigns\/\$\{project\.slug\}/);
  assert.match(page, /accent: "#8f7cff"/);
  assert.match(page, /accent: "#ff914d"/);
  assert.match(page, /accent: "#c8ff37"/);
  assert.match(css, /\.project-campaign-title[\s\S]*font-family: "YouSheBiaoTiHei"/);
  assert.doesNotMatch(css, /3px 3px 0 #20f980|6px 6px 0 #050505/);
  assert.match(page, /className="project-role-summary"/);
  assert.match(css, /\.project-showcase \{[\s\S]*overflow: hidden[\s\S]*border-radius: 38px[\s\S]*linear-gradient\(112deg/);
  assert.match(css, /\.project-role-panel[\s\S]*background: transparent/);
  assert.match(css, /\.project-result-panel[\s\S]*background: transparent/);
  assert.match(css, /\.project-role-panel h4[\s\S]*font-weight: 900/);
  assert.match(css, /\.project-role-content[\s\S]*justify-content: center/);
  assert.match(css, /\.project-role-summary[\s\S]*text-align: center/);
  assert.match(css, /\.problem-card h3[\s\S]*font-weight: 800/);
  assert.match(css, /\.capability-subheading h3[\s\S]*font-weight: 800/);
  assert.match(css, /\.project-subject \{[\s\S]*background: transparent/);
  assert.match(css, /\.project-campaign-title-meituan-membership[\s\S]*font-size: clamp/);
  assert.match(css, /\.project-role-panel > span,[\s\S]*white-space: nowrap/);
  assert.match(css, /\.project-subject-meituan-membership img[\s\S]*width: 104%[\s\S]*bottom: 5%[\s\S]*translateX\(-50%\)/);
  assert.match(css, /\.project-subject-meituan-xiaozhan img[\s\S]*width: 105%[\s\S]*translateX\(-50%\)/);
  assert.match(css, /\.project-subject-murad img[\s\S]*width: 116%[\s\S]*translateX\(-50%\)/);
  assert.match(css, /\.project-result-panel strong\.has-inline-suffix em[\s\S]*color: #ff4f45/);
  assert.match(page, /\/meituan-membership-person-v3\.png/);
  assert.match(css, /\.campaign-detail-page \.case-tags span:hover/);
  assert.match(css, /\.campaign-detail-page \.case-role-copy li:hover/);
  assert.match(css, /\.campaign-detail-page \.case-process-grid article:hover/);
  assert.match(css, /\.case-result-grid div:hover,[\s\S]*translateY\(-10px\)/);
  assert.match(css, /\.case-result-grid div:hover::before/);
  assert.match(css, /\.case-result-grid div:hover strong/);
  assert.match(css, /\.case-video-showcase\[open\] \.case-video-chevrons/);
  assert.match(css, /\.case-phone-grid/);
  assert.match(css, /\.case-video-viewport \{[\s\S]*aspect-ratio: 9 \/ 16/);
  assert.match(css, /\.case-native-video \{[\s\S]*object-fit: contain[\s\S]*pointer-events: none/);
  assert.match(css, /\.case-video-play-toggle \{[\s\S]*touch-action: manipulation/);
  assert.match(campaignDetail, /open\.douyin\.com\/player\/video/);
  assert.match(campaignDetail, /FixedPhoneVideo/);
  assert.match(campaignDetail, /RemotePhoneVideo/);
  assert.match(fixedPhoneVideo, /<video/);
  assert.match(fixedPhoneVideo, /draggable=\{false\}/);
  assert.match(remotePhoneVideo, /<iframe/);
  assert.match(remotePhoneVideo, /allowFullScreen/);
  assert.doesNotMatch(css, /\.project-subject \{[\s\S]*background-size: 42px 42px/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*\.project-showcase \{[\s\S]*grid-template-columns: 1fr/);
  assert.match(css, /font-family: "YouSheBiaoTiHei"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/hero-q-excited-cutout-v3.png", import.meta.url)),
    access(new URL("../public/hero-q-happy-cutout-v3.png", import.meta.url)),
    access(new URL("../public/hero-q-expectant-cutout-v3.png", import.meta.url)),
    access(new URL("../public/bop-dilireba.png", import.meta.url)),
    access(new URL("../public/meituan-xiaozhan.png", import.meta.url)),
    access(new URL("../public/meituan-membership-person-v3.png", import.meta.url)),
    access(new URL("../public/murad-caixukun.png", import.meta.url)),
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
