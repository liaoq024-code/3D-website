"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Mail,
  Menu,
  MousePointer2,
  X,
} from "lucide-react";
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { HomeContentCases } from "./components/HomeContentCases";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
};

const services = [
  {
    number: "01",
    name: "内容判断",
    description:
      "热点与用户情绪洞察｜自然流内容判断｜账号调性匹配｜短视频选题与脚本",
  },
  {
    number: "02",
    name: "品牌内容",
    description:
      "传播议题提炼｜话题词与内容方向｜品牌信息原生化表达｜明星和热点内容策划｜脚本与成片审核",
  },
  {
    number: "03",
    name: "社交媒体",
    description:
      "抖音内容运营｜微博话题传播｜账号定位与栏目规划｜内容矩阵｜平台数据复盘",
  },
  {
    number: "04",
    name: "项目管理",
    description:
      "客户沟通｜项目排期｜账号资源分配｜多轮反馈管理｜跨团队协作｜风险预警与数据验收",
  },
];

const problems = [
  {
    number: "01",
    title: "品牌有卖点，但内容太像广告？",
    answer:
      "从品牌 Brief、产品卖点与用户利益出发，结合平台语境、账号调性、用户喜好，将官方信息转化为用户愿意点击、看完和讨论的选题、脚本与原生内容。",
    ability: "品牌内容转译能力",
  },
  {
    number: "02",
    title: "品牌有传播节点，但缺少可扩散的话题？",
    answer:
      "结合品牌目标、营销节点、用户情绪与平台热点，制定传播话题、内容方向和账号矩阵，让品牌信息从一次发布变成具有讨论度的社交事件。",
    ability: "品牌传播策划能力",
  },
  {
    number: "03",
    title: "传播账号很多，但内容同质化？",
    answer:
      "根据用户画像、账号标签和历史表现匹配差异化切角，让不同账号承担不同传播作用，降低批量内容的重复感。",
    ability: "账号策略与内容增长能力",
  },
  {
    number: "04",
    title: "项目账号多、链路长，交付容易失控？",
    answer:
      "拆解客户需求与传播节点，明确交付标准和审核标准，通过项目排期、实时进度表、每日 To Do 及风险预警，推进多账号、多轮反馈与跨团队协作按期完成。",
    ability: "Campaign 项目统筹与复杂项目落地能力",
  },
];

const projects = [
  {
    number: "01",
    slug: "bop",
    category: "整合传播项目统筹",
    name: "BOP × 迪丽热巴",
    visualName: "BOP",
    image: "/bop-dilireba.png",
    role: ["项目主 PM / 执行统筹", "40+ 账号资源与方向分配", "三阶段排期、审核、发布与验收"],
    metrics: ["685.4万+ 播放", "9.7万+ 互动", "20条 品牌小蓝词", "3条 高表现内容"],
    challenge:
      "将既定传播要求转化为账号、内容和时间安排，用实时进度表、每日 To Do 与前置风险沟通管理多轮反馈。",
    accent: "#8f7cff",
    second: "#65d6ff",
  },
  {
    number: "02",
    slug: "meituan-xiaozhan",
    category: "抖音平台整合传播",
    name: "美团团购 × 肖战",
    visualName: "美团团购",
    image: "/meituan-xiaozhan.png",
    role: ["抖音端主 PM", "拆解三阶段与 40 条内容任务", "账号匹配、审核反馈与上线验收"],
    metrics: ["40条 视频", "376万+ 播放", "6条 高表现内容", "2个 微博上升热点"],
    challenge:
      "按阶段管理账号、审核状态与发布时间，在明星热度和品牌信息之间找到平衡，并协助微博端形成2个上升热点词条。",
    accent: "#ff4bd8",
    second: "#ff7a3d",
  },
  {
    number: "03",
    slug: "meituan-membership",
    category: "微博话题与榜单策略",
    name: "美团 18号 会员日",
    visualName: "18号",
    image: "/meituan-membership-person-v3.png",
    role: ["传播策略与内容方向策划", "独立制定微博话题词", "连接会员权益、用户情绪与榜单路径"],
    metrics: ["1894.3万 阅读", "9071次 讨论", "热搜 Top 17", "生活榜 Top 2"],
    challenge:
      "用“月圆”的日期记忆连接“爱你老己”的悦己情绪，并设计从生活榜向综合热搜扩散的榜单路径。",
    accent: "#ff914d",
    second: "#ffd25a",
  },
  {
    number: "04",
    slug: "murad",
    category: "自然流品牌内容策划",
    name: "MURAD × 蔡徐坤",
    visualName: "MURAD",
    image: "/murad-caixukun.png",
    role: ["传播策略与内容方向策划", "10 个娱乐账号差异化方案", "话题、素材、植入与全流程审核"],
    metrics: ["10个 传播账号", "12.3万 最高自然流点赞", "2条 高表现内容", "全流程 审核完成"],
    challenge:
      "依据账号优势拆分颜值妆造、双面反差、人物志与艺品共性四类方向，并完成话题、素材、植入规范和全流程审核。",
    accent: "#c8ff37",
    second: "#77e8f4",
  },
];

const marqueeItems = [
  ["5000万+", "科技达人内容总播放量", "violet"],
  ["100万+", "单条最高点赞", "pink"],
  ["2000万+", "单条最高播放", "orange"],
  ["100+", "榜单露出", "blue"],
  ["10+", "品牌营销项目", "acid"],
  ["200+", "个人爆款内容", "violet"],
  ["40+", "并行账号 / 视频", "pink"],
] as const;

const brandLogos = [
  { name: "美团", src: "/brand-logos/fitted-v3/meituan.png" },
  { name: "华为", src: "/brand-logos/fitted-v3/huawei.png" },
  { name: "BOP 波普专研", src: "/brand-logos/fitted-v3/bop.png" },
  { name: "Murad", src: "/brand-logos/fitted-v3/murad.png" },
  { name: "URBAN REVIVO", src: "/brand-logos/fitted-v3/urban-revivo.png" },
  { name: "安慕希", src: "/brand-logos/fitted-v3/ambrosial.png" },
  { name: "毛戈平", src: "/brand-logos/fitted-v3/maogeping.png" },
  { name: "NEXXUS", src: "/brand-logos/fitted-v3/nexxus.png" },
  { name: "加加食品", src: "/brand-logos/fitted-v3/jiajia.png" },
] as const;

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactButton({
  onClick,
  label = "联系我",
}: {
  onClick?: () => void;
  label?: string;
}) {
  return (
    <button className="contact-button" type="button" onClick={onClick}>
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" />
    </button>
  );
}

function ShinyText({ children }: { children: ReactNode }) {
  return (
    <motion.span
      className="hero-shiny-text"
      animate={{ backgroundPosition: ["180% center", "-80% center"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0,0,0)");
  const [active, setActive] = useState(false);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / 3;
    const y = (event.clientY - (rect.top + rect.height / 2)) / 3;
    setActive(true);
    setTransform(`translate3d(${x}px, ${y}px, 0)`);
  };

  const reset = () => {
    setActive(false);
    setTransform("translate3d(0,0,0)");
  };

  return (
    <div
      className="magnet"
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{
        transform,
        transition: active
          ? "transform .3s ease-out"
          : "transform .6s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

function AnimatedCharacter({
  character,
  progress,
  index,
  total,
}: {
  character: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = Math.min(1, start + 0.14);
  const opacity = useTransform(progress, [start, end], [0.16, 1]);

  return (
    <span className="animated-character">
      <span aria-hidden="true">{character}</span>
      <motion.span aria-hidden="true" style={{ opacity }}>
        {character}
      </motion.span>
    </span>
  );
}

function AnimatedText({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const characters = Array.from(children);

  return (
    <p ref={ref} className="animated-text" aria-label={children}>
      {characters.map((character, index) => (
        <AnimatedCharacter
          key={`${character}-${index}`}
          character={character}
          progress={scrollYProgress}
          index={index}
          total={characters.length}
        />
      ))}
    </p>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rowOne = useSpring(
    useTransform(scrollYProgress, [0, 1], [-420, 120]),
    { stiffness: 80, damping: 24 },
  );
  const rowTwo = useSpring(
    useTransform(scrollYProgress, [0, 1], [80, -460]),
    { stiffness: 80, damping: 24 },
  );
  const repeated = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="marquee-section" ref={ref} aria-label="核心成果">
      <motion.div className="marquee-track" style={{ x: rowOne }}>
        {repeated.map(([value, label, color], index) => (
          <div className={`marquee-tile ${color}`} key={`one-${index}`}>
            <span>0{(index % marqueeItems.length) + 1}</span>
            <strong>{value}</strong>
            <p>{label}</p>
            <div className="tile-orb" aria-hidden="true" />
          </div>
        ))}
      </motion.div>
      <motion.div className="marquee-track" style={{ x: rowTwo }}>
        {[...repeated].reverse().map(([value, label, color], index) => (
          <div className={`marquee-tile ${color}`} key={`two-${index}`}>
            <span>DATA / CONTENT</span>
            <strong>{value}</strong>
            <p>{label}</p>
            <div className="tile-orb" aria-hidden="true" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function BrandLogoMarquee() {
  return (
    <section
      className="brand-logo-section"
      aria-labelledby="brand-logo-heading"
    >
      <FadeIn className="brand-logo-heading" y={24}>
        <span>SELECTED BRAND PARTNERS</span>
        <h2 id="brand-logo-heading">营销项目品牌方一览</h2>
      </FadeIn>

      <div className="brand-logo-viewport">
        <div className="brand-logo-track">
          {[0, 1].map((groupIndex) => (
            <div
              className="brand-logo-group"
              key={groupIndex}
              aria-hidden={groupIndex === 1}
            >
              {brandLogos.map((logo) => (
                <div className="brand-logo-card" key={`${groupIndex}-${logo.name}`}>
                  <div className="brand-logo-media">
                    <img
                      src={logo.src}
                      alt={groupIndex === 0 ? `${logo.name}品牌 Logo` : ""}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const campaignTitle = project.name.split(" × ");
  const roleTitle = project.role[0];
  const roleSummary = project.slug === "bop"
    ? "此为40+账号三阶段传播项目，负责三阶段项目排期、客户沟通、账号分配、脚本与成片审核、发布推进、投流协同及数据验收。通过实时进度表、每日 To Do 与前置风险沟通管理多轮反馈，保障爆发期和长尾期执行侧零延期、零漏发。"
    : [...project.role.slice(1), project.challenge]
      .map((text) => text.replace(/[。；]+$/, ""))
      .join("；") + "。";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (projects.length - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const style = {
    "--accent": project.accent,
    "--second": project.second,
    top: `${96 + index * 24}px`,
  } as CSSProperties;

  return (
    <div className="project-stage" id={`project-${project.slug}`} ref={ref}>
      <motion.article
        className="project-card"
        style={{ ...style, scale }}
      >
        <div className="project-card-top">
          <span className="project-number">{project.number}</span>
          <div className="project-label">
            <h3
              className={`project-campaign-title project-campaign-title-${project.slug}`}
              aria-label={project.name}
            >
              <span>{campaignTitle[0]}</span>
              {campaignTitle[1] ? (
                <>
                  <i>×</i>
                  <span>{campaignTitle[1]}</span>
                </>
              ) : null}
            </h3>
          </div>
          <span className="project-category">{project.category}</span>
          <a className="ghost-button" href={`/campaigns/${project.slug}`}>
            查看详细案例 <ArrowDownRight aria-hidden="true" />
          </a>
        </div>

        <div className="project-showcase" id={`story-${index + 1}`}>
          <section className="project-role-panel">
            <span>MY ROLE / 我的项目角色</span>
            <div className="project-role-content">
              <h4>{roleTitle}</h4>
              <p className="project-role-summary">{roleSummary}</p>
            </div>
          </section>

          <div
            className={`project-subject project-subject-${project.slug}${project.image ? " has-image" : ""}`}
          >
            <span className="project-subject-index">{project.number}</span>
            {project.image ? (
              <img src={project.image} alt={`${project.name}项目主视觉`} />
            ) : (
              <div className="project-wordmark" aria-hidden="true">
                <small>SELECTED CAMPAIGN</small>
                <strong>{project.visualName}</strong>
                <span>{project.number}</span>
              </div>
            )}
          </div>

          <section className="project-result-panel">
            <span>RESULTS / 项目成果</span>
            <div>
              {project.metrics.map((metric, metricIndex) => {
                const [value, ...labelParts] = metric.split(" ");
                const inlineSuffix =
                  project.slug === "meituan-membership" && metricIndex >= 2
                    ? labelParts.join(" ")
                    : "";
                return (
                  <article key={metric}>
                    <small>0{metricIndex + 1}</small>
                    <strong className={inlineSuffix ? "has-inline-suffix" : undefined}>
                      {value}
                      {inlineSuffix ? <em>{inlineSuffix}</em> : null}
                    </strong>
                    {!inlineSuffix ? <p>{labelParts.join(" ")}</p> : null}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </motion.article>
    </div>
  );
}

export default function Home() {
  const [wechatOpen, setWechatOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!wechatOpen) return;
    document.body.classList.add("modal-open");
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWechatOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", close);
    };
  }, [wechatOpen]);

  return (
    <main>
      <section className="hero" id="home">
        <video
          className="hero-video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="hero-video-shade" aria-hidden="true" />

        <div className="hero-shell">
          <motion.nav
            className="hero-nav"
            aria-label="主导航"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="hero-logo" href="#home" aria-label="返回首页">
              <i><b /></i><span>LIAOQIN</span>
            </a>
            <div className="hero-nav-links">
              <a href="#home">首页</a>
              <a href="#about">关于我</a>
              <a href="#services">核心能力</a>
              <a href="#projects">品牌项目</a>
              <a href="#content-cases">内容案例</a>
              <button type="button" onClick={() => setWechatOpen(true)}>联系我 <ArrowUpRight aria-hidden="true" /></button>
            </div>
            <button
              className="hero-menu-button"
              type="button"
              aria-label={mobileNavOpen ? "关闭导航" : "打开导航"}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
            {mobileNavOpen ? (
              <motion.div className="hero-mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
                <a href="#about" onClick={() => setMobileNavOpen(false)}>关于我</a>
                <a href="#services" onClick={() => setMobileNavOpen(false)}>核心能力</a>
                <a href="#projects" onClick={() => setMobileNavOpen(false)}>品牌项目</a>
                <a href="#content-cases" onClick={() => setMobileNavOpen(false)}>内容案例</a>
                <button type="button" onClick={() => { setMobileNavOpen(false); setWechatOpen(true); }}>联系我</button>
              </motion.div>
            ) : null}
          </motion.nav>

          <motion.div
            className="hero-center"
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-eyebrow">BRAND CONTENT · SOCIAL COMMUNICATION</span>
            <h1>
              <span>品牌内容营销</span>
              <ShinyText>社交传播展示</ShinyText>
            </h1>
            <button className="hero-primary-action" type="button" onClick={() => setWechatOpen(true)}>
              <span>联系我</span><ArrowUpRight aria-hidden="true" />
            </button>
          </motion.div>

          <motion.div
            className="hero-bottom-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong>让品牌想说的话，变成用户愿意看的内容。</strong>
            <span>品牌内容营销 / 内容策略</span>
          </motion.div>

          <div className="hero-scroll" aria-hidden="true">
            <MousePointer2 />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      </section>

      <MarqueeSection />

      <BrandLogoMarquee />

      <section className="about-section" id="about">
        <div className="float-object moon" aria-hidden="true"><i /></div>
        <div className="float-object capsule" aria-hidden="true"><i /></div>
        <div className="float-object cube" aria-hidden="true"><i /></div>
        <div className="float-object planet" aria-hidden="true"><i /></div>

        <FadeIn y={40}>
          <h2 className="hero-heading section-heading">ABOUT ME</h2>
        </FadeIn>
        <div className="about-copy">
          <AnimatedText>
            我是廖沁，一名从平台内容运营成长起来的品牌内容与社交传播从业者。我在高频内容实践中建立了对平台趋势、用户情绪、账号调性和自然流传播的判断，并进一步积累了传播话题、内容方向、账号匹配、多阶段项目统筹与团队流程建设经验。
          </AnimatedText>
          <div className="about-actions">
            <a className="download-button" href="/廖沁-品牌内容营销与内容策略-CV.pdf" download>
              下载简历 <Download aria-hidden="true" />
            </a>
            <ContactButton onClick={() => setWechatOpen(true)} label="和我聊聊" />
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <FadeIn>
          <h2 className="light-heading">CAPABILITIES</h2>
          <p className="section-kicker">我能解决什么问题 / WHAT I DO</p>
        </FadeIn>
        <div className="problem-grid">
          {problems.map((problem, index) => (
            <FadeIn key={problem.number} delay={index * 0.06}>
              <article
                className="problem-card"
                tabIndex={0}
                aria-describedby={`problem-answer-${problem.number}`}
              >
                <span>{problem.number}</span>
                <h3>{problem.title}</h3>
                <div className="problem-card-copy">
                  <p id={`problem-answer-${problem.number}`}>{problem.answer}</p>
                  <strong>「{problem.ability}」</strong>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="capability-subheading">
            <span>MY CAPABILITY STRUCTURE</span>
            <div>
              <h3>我的能力结构</h3>
              <p>从判断到交付 形成完整工作闭环</p>
            </div>
          </div>
        </FadeIn>
        <div className="service-list">
          {services.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.08}>
              <article className="service-item">
                <span className="service-number">{service.number}</span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <ArrowDownRight aria-hidden="true" />
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="projects-section" id="projects">
        <FadeIn>
          <h2 className="hero-heading section-heading">PROJECTS</h2>
          <h3 className="projects-subtitle">精选品牌营销案例</h3>
          <p className="projects-intro">
            四个项目，分别展示项目统筹、平台传播、话题策略与自然流内容策划。
          </p>
        </FadeIn>
        <div className="project-stack">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.number} />
          ))}
        </div>
        <div className="section-detail-action">
          <a className="download-button" href="/campaigns">
            查看四个完整案例 <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <HomeContentCases />

      <section className="home-principles">
        <FadeIn>
          <span>WHAT I CARE ABOUT</span>
          <h2>我关注的不只是内容有没有发布，<br />也关注结果是否真正留下。</h2>
        </FadeIn>
        <div className="home-principle-grid">
          <article><span>01</span><strong>用户是否愿意看</strong></article>
          <article><span>02</span><strong>品牌信息是否被留下</strong></article>
          <article><span>03</span><strong>项目是否按计划完成</strong></article>
          <article><span>04</span><strong>结果是否能够被复盘</strong></article>
        </div>
        <div className="home-principle-actions">
          <a className="download-button" href="/campaigns">查看我的项目 <ArrowUpRight aria-hidden="true" /></a>
          <a className="download-button" href="/contact">完整联系方式 <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" aria-hidden="true" />
        <FadeIn>
          <span className="contact-eyebrow">LET&apos;S MAKE CONTENT PEOPLE WANT TO WATCH</span>
          <h2>一起聊聊<br /><em>内容与品牌。</em></h2>
          <p>
            我正在关注品牌内容营销、社交媒体营销、品牌传播策划与内容策略相关机会。
          </p>
          <div className="contact-actions">
            <a className="contact-button" href="mailto:1430943020@qq.com">
              <span>发送邮件</span><Mail aria-hidden="true" />
            </a>
            <ContactButton onClick={() => setWechatOpen(true)} label="微信联系" />
          </div>
        </FadeIn>
        <footer>
          <strong>LIAO QIN / 廖沁</strong>
          <span>BRAND CONTENT &amp; SOCIAL COMMUNICATION</span>
          <a href="mailto:1430943020@qq.com">1430943020@qq.com</a>
          <span>© 2026</span>
        </footer>
        <p className="home-legal-note">
          网站所展示项目均基于本人真实工作经历。部分项目素材、客户信息及内部文件已进行脱敏处理，
          项目成果中已明确区分个人职责与团队共同成果。
        </p>
      </section>

      {wechatOpen && (
        <div className="wechat-modal" role="presentation" onMouseDown={() => setWechatOpen(false)}>
          <motion.div
            className="wechat-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wechat-title"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button type="button" aria-label="关闭微信二维码" onClick={() => setWechatOpen(false)}>
              <X aria-hidden="true" />
            </button>
            <span>LET&apos;S CONNECT</span>
            <h2 id="wechat-title">添加我的微信</h2>
            <img src="/wechat-qr.jpg" alt="廖沁的微信二维码" />
            <p>扫描二维码，添加我为好友。</p>
          </motion.div>
        </div>
      )}
    </main>
  );
}
