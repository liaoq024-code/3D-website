"use client";

import { useEffect, useRef, useState } from "react";

const videoCases = [
  {
    id: "platform",
    label: "平台热点",
    eyebrow: "PLATFORM MOMENT",
    title: "把正在发生的热点，转化为值得停留的内容",
    description: "从事件热度、用户讨论与传播时机切入，在热点生命周期内快速完成判断、选题与表达。",
    src: "/content-cases/platform.mp4",
    poster: "/content-cases/platform.jpg",
  },
  {
    id: "celebrity",
    label: "明星事件",
    eyebrow: "CELEBRITY STORY",
    title: "从人物关系里，找到更有传播力的情绪切口",
    description: "不只复述明星事件，而是提炼人物关系、共同记忆与用户真正关心的叙事重点。",
    src: "/content-cases/celebrity.mp4",
    poster: "/content-cases/celebrity.jpg",
  },
  {
    id: "drama",
    label: "电视剧衍生",
    eyebrow: "DRAMA DERIVATIVE",
    title: "把剧情讨论，延伸成自然流里的二次内容",
    description: "抓住角色、台词与剧情冲突的讨论价值，用更轻巧的结构承接剧集热度。",
    src: "/content-cases/drama.mp4",
    poster: "/content-cases/drama.jpg",
  },
  {
    id: "variety",
    label: "综艺衍生",
    eyebrow: "VARIETY DERIVATIVE",
    title: "从节目名场面，继续放大用户愿意分享的情绪",
    description: "围绕综艺人物与现场反应组织素材，让节目看点变成更具社交传播感的短视频。",
    src: "/content-cases/variety.mp4",
    poster: "/content-cases/variety.jpg",
  },
  {
    id: "app",
    label: "自然流 APP 植入",
    eyebrow: "NATIVE APP CONTENT",
    title: "先让内容成立，再让产品自然进入叙事",
    description: "根据账号语气与用户兴趣设计切口，在不打断观看体验的前提下完成产品信息植入。",
    src: "/content-cases/placement.mp4",
    poster: "/content-cases/placement.jpg",
  },
  {
    id: "tech",
    label: "自然流 3C 植入",
    eyebrow: "NATIVE 3C CONTENT",
    title: "用用户看得懂的场景，讲清科技产品的价值",
    description: "从真实使用体验与强视觉场景出发，把产品卖点转译成有观看价值的自然流内容。",
    src: "/content-cases/placement-3c.mp4",
    poster: "/content-cases/placement-3c.jpg",
  },
];

export function ContentVideoAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      frameRef.current = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const scaled = progress * (videoCases.length - 1);
      const current = Math.min(videoCases.length - 1, Math.floor(scaled + 0.08));

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = index - scaled;
        const y = distance <= 0 ? 0 : Math.min(112, distance * 100);
        const clip = index < current ? Math.min(100, Math.max(0, (scaled - index) * 100)) : 0;
        card.style.setProperty("--card-y", `${y}%`);
        card.style.setProperty("--card-clip", `${clip}%`);
        card.style.zIndex = String(index + 1);
      });

      setActiveIndex((previous) => (previous === current ? previous : current));
    };

    const requestUpdate = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const top = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({ top: top + scrollable * (index / (videoCases.length - 1)), behavior: "smooth" });
  };

  const pauseOtherVideos = (active: HTMLVideoElement) => {
    sectionRef.current?.querySelectorAll("video").forEach((video) => {
      if (video !== active) video.pause();
    });
  };

  return (
    <section ref={sectionRef} className="content-video-accordion" aria-label="内容精选案例">
      <div className="content-video-accordion-frame">
        <nav className="content-video-accordion-nav" aria-label="选择视频案例">
          <span>REPRESENTATIVE CASE / 06</span>
          {videoCases.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={index === activeIndex ? "is-active" : ""}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => jumpTo(index)}
            >
              <i>{String(index + 1).padStart(2, "0")}</i>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="content-video-accordion-stack" aria-live="polite">
          {videoCases.map((item, index) => (
            <article
              ref={(node) => { cardRefs.current[index] = node; }}
              className="content-video-accordion-card"
              key={item.id}
              data-case={item.id}
            >
              <div className="content-video-accordion-copy">
                <span>{item.eyebrow}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <b>{String(index + 1).padStart(2, "0")} / 06</b>
              </div>
              <div className="content-video-accordion-visual">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={item.poster}
                  aria-label={`${item.label}视频案例`}
                  onPlay={(event) => pauseOtherVideos(event.currentTarget)}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
