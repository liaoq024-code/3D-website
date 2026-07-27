"use client";

import {
  AnimatePresence,
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
  MousePointer2,
  Sparkles,
  X,
} from "lucide-react";
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

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
    name: "品牌内容策略",
    description:
      "从 Brief、品牌卖点和用户利益出发，提炼传播议题、话题词、内容方向与账号矩阵，让官方信息拥有真实的观看理由。",
  },
  {
    number: "02",
    name: "社交媒体营销",
    description:
      "结合抖音、微博与小红书的平台语境，判断热点、用户情绪和账号调性，设计可被点击、讨论和记住的社交内容。",
  },
  {
    number: "03",
    name: "Campaign 项目统筹",
    description:
      "管理客户沟通、账号资源、内容审核、发布排期、投流协同与数据验收，让多阶段、多账号项目沿同一条时间线推进。",
  },
  {
    number: "04",
    name: "内容增长",
    description:
      "通过爆款选题、前三秒钩子、评论区洞察与数据复盘，持续优化自然流内容，并把有效经验沉淀为可复用 SOP。",
  },
  {
    number: "05",
    name: "达人与账号矩阵",
    description:
      "依据账号标签、粉丝画像和内容优势进行方向匹配，建立差异化栏目，并协同脚本、拍摄、后期与团队带训。",
  },
];

const projects = [
  {
    number: "01",
    category: "整合传播项目统筹",
    name: "BOP × 迪丽热巴",
    intro: "40+账号、三阶段传播与复杂审核链路下的项目推进。",
    metrics: ["685.4万+ 播放", "9.7万+ 互动", "执行零漏发"],
    challenge:
      "将既定传播要求转化为账号、内容和时间安排，用实时进度表、每日 To Do 与前置风险沟通管理多轮反馈。",
    accent: "#c8ff37",
    second: "#77e8f4",
  },
  {
    number: "02",
    category: "抖音平台整合传播",
    name: "美团团购 × 肖战",
    intro: "连续统筹预热、爆发与长尾三个阶段的40条抖音内容。",
    metrics: ["40条视频", "276万+ 播放", "2条高表现内容"],
    challenge:
      "按阶段管理账号、审核状态与发布时间，在明星热度和品牌信息之间找到平衡，并协助微博端形成2个上升热点词条。",
    accent: "#ff4bd8",
    second: "#ff7a3d",
  },
  {
    number: "03",
    category: "微博话题与榜单策略",
    name: "美团 1218 会员日",
    intro: "把固定促销日期转化为具有用户情绪与社交传播力的话题。",
    metrics: ["1894.3万+ 阅读", "热搜 Top 15", "生活榜 Top 2"],
    challenge:
      "用“月圆”的日期记忆连接“爱你老己”的悦己情绪，并设计从生活榜向综合热搜扩散的榜单路径。",
    accent: "#8f7cff",
    second: "#65d6ff",
  },
  {
    number: "04",
    category: "自然流品牌内容策划",
    name: "MURAD × 蔡徐坤",
    intro: "用娱乐自然流内容承接代言官宣，让品牌进入用户愿意看的故事。",
    metrics: ["10个账号", "4类内容方向", "12.3万+ 自然流点赞"],
    challenge:
      "依据账号优势拆分颜值妆造、双面反差、人物志与艺品共性四类方向，并完成话题、素材、植入规范和全流程审核。",
    accent: "#ff914d",
    second: "#ffd25a",
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

const heroExpressions = [
  {
    label: "开心",
    src: "/hero-q-happy-cutout-v3.png",
    alt: "开心表情的廖沁 Q 版形象",
  },
  {
    label: "兴奋",
    src: "/hero-q-excited-cutout-v3.png",
    alt: "兴奋表情的廖沁 Q 版形象",
  },
  {
    label: "期待",
    src: "/hero-q-expectant-cutout-v3.png",
    alt: "期待表情的廖沁 Q 版形象",
  },
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
    <div className="project-stage" ref={ref}>
      <motion.article
        className="project-card"
        style={{ ...style, scale }}
      >
        <div className="project-card-top">
          <span className="project-number">{project.number}</span>
          <div className="project-label">
            <span>{project.category}</span>
            <h3>{project.name}</h3>
          </div>
          <a className="ghost-button" href={`#story-${index + 1}`}>
            查看案例 <ArrowDownRight aria-hidden="true" />
          </a>
        </div>

        <div className="project-visual-grid">
          <div className="project-visual-left">
            <div className="project-panel project-panel-small">
              <span>MY ROLE</span>
              <p>{project.intro}</p>
              <div className="panel-sphere" aria-hidden="true" />
            </div>
            <div className="project-panel project-panel-copy" id={`story-${index + 1}`}>
              <span>THE MOVE</span>
              <p>{project.challenge}</p>
            </div>
          </div>
          <div className="project-panel project-panel-main">
            <div className="project-orbit" aria-hidden="true" />
            <div className="project-core" aria-hidden="true">
              <span>{project.number}</span>
            </div>
            <div className="project-metrics">
              {project.metrics.map((metric) => (
                <strong key={metric}>{metric}</strong>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Home() {
  const [wechatOpen, setWechatOpen] = useState(false);
  const [heroExpression, setHeroExpression] = useState(0);

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
        <FadeIn y={-20}>
          <nav className="hero-nav" aria-label="主导航">
            <a href="#about">关于我</a>
            <a href="#services">核心能力</a>
            <a href="#projects">品牌项目</a>
            <a href="#contact">联系我</a>
          </nav>
        </FadeIn>

        <div className="hero-title-wrap">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading">HI, I&apos;M LIAOQIN</h1>
          </FadeIn>
        </div>

        <FadeIn className="hero-cover-tagline-wrap" delay={0.32} x={-24}>
          <div className="hero-cover-tagline">
            <span className="hero-cover-tagline-kicker">CONTENT / SOCIAL COMMUNICATION</span>
            <div className="hero-cover-tagline-main">
              <h2
                className="hero-cover-tagline-heading"
                aria-label="品牌内容营销与社交传播展示"
              >
                <span className="hero-cover-tagline-line-primary">品牌内容营销</span>
                <span className="hero-cover-tagline-line-secondary">
                  <span className="hero-cover-tagline-line-copy">与社交传播</span>
                  <strong className="hero-cover-tagline-accent">展示</strong>
                </span>
              </h2>
              <span className="hero-cover-tagline-arrow" aria-hidden="true">↗</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="hero-portrait" delay={0.6} y={30}>
          <Magnet>
            <div
              className="portrait-shell"
            >
              <div className="portrait-halo" aria-hidden="true" />
              <AnimatePresence initial={false} mode="popLayout">
                <motion.button
                  key={heroExpressions[heroExpression].src}
                  className="portrait-character"
                  type="button"
                  aria-label={`当前是${heroExpressions[heroExpression].label}表情，点击切换下一个表情`}
                  onClick={() =>
                    setHeroExpression(
                      (current) => (current + 1) % heroExpressions.length,
                    )
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <img
                    src={heroExpressions[heroExpression].src}
                    alt={heroExpressions[heroExpression].alt}
                  />
                </motion.button>
              </AnimatePresence>
              <div className="portrait-badge">
                <Sparkles aria-hidden="true" />
                <span>CONTENT<br />STRATEGIST</span>
              </div>
            </div>
          </Magnet>
        </FadeIn>

        <div className="hero-bottom">
          <FadeIn delay={0.35} y={20}>
            <p className="hero-description">
              <span className="hero-description-main">
                让品牌想说的话，变成用户愿意看的内容。
              </span>
              <span className="hero-description-meta">
                品牌内容营销 / 内容策略
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={() => setWechatOpen(true)} />
          </FadeIn>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <MousePointer2 />
          <span>SCROLL TO EXPLORE</span>
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
          <p className="projects-intro">
            四个项目，分别展示项目统筹、平台传播、话题策略与自然流内容策划。
          </p>
        </FadeIn>
        <div className="project-stack">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.number} />
          ))}
        </div>
      </section>

      <section className="social-section">
        <FadeIn>
          <div className="social-heading">
            <span>CONTENT &amp; SOCIAL</span>
            <h2>懂项目，<br />更懂内容。</h2>
          </div>
        </FadeIn>
        <div className="social-grid">
          <FadeIn>
            <article className="social-card entertainment">
              <span>01 / ENTERTAINMENT</span>
              <h3>从热点信息里，找到用户真正想讨论的情绪。</h3>
              <p>
                负责会火大明星、娱乐喵呜酱日常内容运营，覆盖热点判断、选题、脚本、发布与复盘。
              </p>
              <div className="social-stats">
                <strong>200+<small>个人爆款</small></strong>
                <strong>100万+<small>最高点赞</small></strong>
                <strong>2000万+<small>最高播放</small></strong>
              </div>
            </article>
          </FadeIn>
          <FadeIn delay={0.1}>
            <article className="social-card technology">
              <span>02 / TECHNOLOGY</span>
              <h3>让不同科技账号，提供不同的用户价值。</h3>
              <p>
                统筹科技真探、vision 科技测评、tao 的科技生活，覆盖3C、汽车、家电、AI、机器人与 App。
              </p>
              <div className="social-stats">
                <strong>10+<small>万赞内容</small></strong>
                <strong>800万+<small>最高播放</small></strong>
                <strong>5000万+<small>累计播放</small></strong>
              </div>
            </article>
          </FadeIn>
        </div>

        <div className="timeline">
          <div><time>2026.01 — NOW</time><strong>科技达人内容统筹</strong></div>
          <div><time>2025.07 — 2025.10</time><strong>客户服务部 PM 轮岗</strong></div>
          <div><time>2024.07 — 2026.01</time><strong>娱乐 / 品牌内容运营</strong></div>
          <div><time>2024.01 — 2024.05</time><strong>湖南广电娱乐频道</strong></div>
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
          <span>© 2026</span>
        </footer>
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
