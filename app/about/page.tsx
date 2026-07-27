import {
  InnerFooter,
  InnerHero,
  InnerNav,
  PageLink,
} from "../components/InnerPageShell";

const abilityStructure = [
  {
    number: "01",
    title: "内容判断",
    items: ["热点与用户情绪洞察", "自然流内容判断", "账号调性匹配", "短视频选题与脚本"],
  },
  {
    number: "02",
    title: "品牌内容",
    items: ["传播议题提炼", "话题词与内容方向", "品牌信息原生化表达", "明星和热点内容策划", "脚本与成片审核"],
  },
  {
    number: "03",
    title: "社交媒体",
    items: ["抖音内容运营", "微博话题传播", "账号定位与栏目规划", "内容矩阵", "平台数据复盘"],
  },
  {
    number: "04",
    title: "项目管理",
    items: ["客户沟通", "项目排期", "账号资源分配", "多轮反馈管理", "跨团队协作", "风险预警与数据验收"],
  },
];

const experience = [
  {
    time: "2026.01 — 至今",
    company: "北京火钳刘明传媒有限公司｜会火",
    role: "科技达人内容统筹",
    description:
      "统筹 3 个科技达人账号的选题、脚本、分镜、拍摄及后期协同，负责内容规划、账号数据复盘、流程搭建与团队带训。",
  },
  {
    time: "2025.07 — 2025.10",
    company: "北京火钳刘明传媒有限公司｜会火",
    role: "客户服务部 PM 内部轮岗",
    description:
      "作为主 PM 独立统筹 BOP、美团团购 × 肖战等品牌项目，负责客户沟通、账号分配、内容审核、发布推进及数据验收。",
  },
  {
    time: "2024.07 — 2026.01",
    company: "北京火钳刘明传媒有限公司｜会火",
    role: "内容运营｜娱乐与品牌营销",
    description:
      "负责会火大明星、娱乐喵呜酱等账号日常内容运营，并参与 10+ 个品牌内容营销项目。",
  },
  {
    time: "2024.01 — 2024.05",
    company: "湖南广播电视台娱乐频道",
    role: "娱乐内容运营与制作人助理",
    description:
      "参与湖南娱乐、摸鱼剧星、山茶花娱乐等账号运营，个人完成 300+ 条热点短视频选题、制作与发布，并参与品牌广告内容及热点冲榜项目。",
  },
];

const directions = [
  "品牌内容营销",
  "社交媒体营销",
  "品牌传播策划",
  "内容策略",
  "达人及账号营销",
  "Campaign 项目统筹",
];

export default function AboutPage() {
  return (
    <main className="inner-page about-page">
      <InnerNav />
      <InnerHero
        eyebrow="ABOUT / LIAO QIN"
        title={<>从内容一线，<br /><em>走向品牌传播。</em></>}
        intro="我是廖沁，一名从平台内容运营成长起来的品牌内容与社交传播从业者。内容判断、品牌表达与项目落地，是我理解传播的三个切面。"
      >
        <div className="inner-hero-actions">
          <PageLink href="#experience" tone="acid">查看工作经历</PageLink>
          <PageLink href="/廖沁-品牌内容营销与内容策略-CV.pdf">下载完整简历</PageLink>
        </div>
      </InnerHero>

      <section className="about-story-section">
        <span className="inner-section-label">MY STORY / 个人介绍</span>
        <div>
          <h2>我同时从三个角度<br />理解品牌传播。</h2>
          <div className="about-story-copy">
            <p>
              职业早期，我长期处于娱乐热点和短视频内容生产一线，在高频实践中建立了对平台趋势、
              用户情绪、账号调性与自然流传播的判断。
            </p>
            <p>
              随后，我开始参与品牌内容营销项目，负责传播话题、内容方向、账号匹配以及脚本与成片审核；
              并通过客户服务部 PM 轮岗，进一步积累多阶段、多账号项目的全流程推进经验。
            </p>
            <p>
              目前，我负责科技达人内容统筹，持续参与账号定位、内容策划、拍摄协同、数据复盘和团队流程建设。
            </p>
          </div>
        </div>
        <div className="about-three-angles">
          <article><span>01</span><strong>品牌想表达什么</strong></article>
          <article><span>02</span><strong>用户为什么愿意看</strong></article>
          <article><span>03</span><strong>项目如何真正完成</strong></article>
        </div>
      </section>

      <section className="direction-section">
        <span className="inner-section-label">FOCUS / 我希望继续从事的方向</span>
        <div className="direction-cloud">
          {directions.map((direction, index) => (
            <span className={index % 3 === 0 ? "accent" : ""} key={direction}>{direction}</span>
          ))}
        </div>
      </section>

      <section className="ability-structure-section">
        <header>
          <span className="inner-section-label">SKILL STRUCTURE / 我的能力结构</span>
          <h2>从判断到交付，<br />形成完整工作闭环。</h2>
        </header>
        <div className="ability-structure-grid">
          {abilityStructure.map((ability) => (
            <article key={ability.number}>
              <span>{ability.number}</span>
              <h3>{ability.title}</h3>
              <ul>{ability.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section" id="experience">
        <header>
          <span className="inner-section-label">EXPERIENCE / 工作经历</span>
          <h2>从热点内容生产，<br />到品牌项目与团队流程。</h2>
        </header>
        <div className="experience-list">
          {experience.map((item, index) => (
            <article key={`${item.time}-${item.role}`}>
              <span className="experience-index">0{index + 1}</span>
              <time>{item.time}</time>
              <div>
                <p>{item.company}</p>
                <h3>{item.role}</h3>
                <strong>{item.description}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="education-section">
        <div>
          <span className="inner-section-label">EDUCATION</span>
          <h2>浙江传媒学院</h2>
          <p>录音艺术｜本科<br />2020.09 — 2024.06</p>
        </div>
        <article>
          <span>PROJECT HONOR</span>
          <h3>第 21 届上海国际大学生广告节二等奖</h3>
          <p>
            独立负责东鹏特饮《开启脱困秘籍》同期录音、后期声音设计及成片音频交付，
            团队作品获得赛事二等奖。
          </p>
        </article>
        <article>
          <span>LANGUAGE</span>
          <h3>IELTS 6.5</h3>
          <p>CET-6<br />普通话二级甲等</p>
        </article>
      </section>

      <section className="inner-next-section">
        <span>NEXT / CONTACT</span>
        <h2>如果你也关注内容与品牌，<br />欢迎和我聊聊。</h2>
        <PageLink href="/contact" tone="acid">联系我</PageLink>
      </section>
      <InnerFooter />
    </main>
  );
}

