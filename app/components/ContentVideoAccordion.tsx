"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { InlineVideoPlayer } from "./InlineVideoPlayer";

const videoCases = [
  {
    id: "platform",
    label: "平台热点",
    eyebrow: "PLATFORM MOMENT",
    title: "把正在发生的热点，转化为值得停留的内容",
    description: "从事件热度、用户讨论与传播时机切入，在热点生命周期内快速完成判断、选题与表达。",
    src: "/content-cases/platform.mp4",
    poster: "/content-cases/posters/platform.jpg",
  },
  {
    id: "celebrity",
    label: "明星事件",
    eyebrow: "CELEBRITY STORY",
    title: "从人物关系里，找到更有传播力的情绪切口",
    description: "提炼人物关系、共同记忆与用户真正关心的叙事重点，让明星事件不止停留在信息复述。",
    src: "/content-cases/celebrity.mp4",
    poster: "/content-cases/posters/celebrity.jpg",
  },
  {
    id: "drama",
    label: "电视剧衍生",
    eyebrow: "DRAMA DERIVATIVE",
    title: "把剧情讨论，延伸成自然流里的二次内容",
    description: "抓住角色、台词与剧情冲突的讨论价值，用更轻巧的结构承接剧集热度。",
    src: "/content-cases/drama.mp4",
    poster: "/content-cases/posters/drama.jpg",
  },
  {
    id: "variety",
    label: "综艺衍生",
    eyebrow: "VARIETY DERIVATIVE",
    title: "从节目名场面，继续放大用户愿意分享的情绪",
    description: "围绕综艺人物与现场反应组织素材，让节目看点成为更有社交传播感的短视频。",
    src: "/content-cases/variety.mp4",
    poster: "/content-cases/posters/variety.jpg",
  },
  {
    id: "app",
    label: "自然流 APP 植入",
    eyebrow: "NATIVE APP CONTENT",
    title: "先让内容成立，再让产品自然进入叙事",
    description: "根据账号语气与用户兴趣设计切口，在不打断观看体验的前提下完成产品信息植入。",
    src: "/content-cases/placement.mp4",
    poster: "/content-cases/posters/placement.jpg",
  },
  {
    id: "tech",
    label: "自然流 3C 植入",
    eyebrow: "NATIVE 3C CONTENT",
    title: "用用户看得懂的场景，讲清科技产品的价值",
    description: "从真实使用体验与强视觉场景出发，把产品卖点转译成有观看价值的自然流内容。",
    src: "/content-cases/placement-3c.mp4",
    poster: "/content-cases/posters/placement-3c.png",
  },
];

const caseCount = videoCases.length;
const modulo = (value: number) => ((value % caseCount) + caseCount) % caseCount;

export function ContentVideoAccordion() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoTimerRef = useRef<number | null>(null);
  const movementLockRef = useRef(false);
  const [virtualIndex, setVirtualIndex] = useState(caseCount);
  const [cameraX, setCameraX] = useState(0);
  const [isMeasured, setIsMeasured] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [instantMove, setInstantMove] = useState(false);
  const cases = useMemo(() => [...videoCases, ...videoCases, ...videoCases], []);
  const activeIndex = modulo(virtualIndex);

  const measureCamera = useCallback(() => {
    const viewport = viewportRef.current;
    const card = firstCardRef.current;
    const track = trackRef.current;
    if (!viewport || !card || !track) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
    const cardWidth = card.offsetWidth;
    const step = cardWidth + gap;
    const center = viewport.clientWidth / 2 - cardWidth / 2;
    setCameraX(center - virtualIndex * step);
    setIsMeasured(true);
  }, [virtualIndex]);

  useLayoutEffect(() => {
    measureCamera();
    const observer = new ResizeObserver(measureCamera);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (firstCardRef.current) observer.observe(firstCardRef.current);
    return () => observer.disconnect();
  }, [measureCamera]);

  useEffect(() => {
    if (isPaused || instantMove) return;
    autoTimerRef.current = window.setTimeout(() => {
      autoTimerRef.current = null;
      movementLockRef.current = true;
      setVirtualIndex((index) => index + 1);
    }, 2400);
    return () => {
      if (autoTimerRef.current !== null) window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    };
  }, [virtualIndex, isPaused, instantMove]);

  const moveCamera = (direction: number) => {
    if (movementLockRef.current) return;
    if (autoTimerRef.current !== null) window.clearTimeout(autoTimerRef.current);
    autoTimerRef.current = null;
    movementLockRef.current = true;
    setInstantMove(false);
    setVirtualIndex((index) => index + direction);
  };

  const normalizeLoop = () => {
    if (instantMove) {
      movementLockRef.current = false;
      return;
    }
    if (virtualIndex >= caseCount * 2 || virtualIndex < caseCount) {
      setInstantMove(true);
      setVirtualIndex(caseCount + activeIndex);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        setInstantMove(false);
        movementLockRef.current = false;
      }));
      return;
    }
    movementLockRef.current = false;
  };

  const pauseOtherVideos = (active: HTMLVideoElement) => {
    sectionRef.current?.querySelectorAll("video").forEach((video) => {
      if (video !== active) video.pause();
    });
    setIsPaused(true);
  };

  return (
    <section ref={sectionRef} className="content-video-accordion" aria-label="内容精选案例">
      <header className="content-video-cinema-heading">
        <span>REPRESENTATIVE CASE <b>/ 06</b></span>
        <h4>内容精选案例</h4>
        <p>六个案例覆盖平台热点、明星事件、影视综艺衍生与自然流商业植入，呈现从判断到成片的完整内容能力。</p>
      </header>

      <div
        ref={viewportRef}
        className={`content-video-camera${isMeasured ? " is-ready" : ""}`}
      >
        <motion.div
          ref={trackRef}
          className="content-video-camera-track"
          animate={{ x: cameraX }}
          transition={instantMove ? { duration: 0 } : { duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={normalizeLoop}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={(_, info) => {
            setIsPaused(false);
            if (Math.abs(info.offset.x) > 48 || Math.abs(info.velocity.x) > 360) {
              moveCamera(info.offset.x < 0 ? 1 : -1);
            }
          }}
        >
          {cases.map((item, index) => {
            const isActive = modulo(index) === activeIndex;
            const isCurrent = index === virtualIndex;
            return (
              <article
                ref={index === 0 ? firstCardRef : undefined}
                className={`content-video-camera-card${isActive ? " is-active" : ""}`}
                key={`${item.id}-${Math.floor(index / caseCount)}`}
                aria-hidden={index !== virtualIndex}
              >
                <div className="content-video-camera-media">
                  {isCurrent ? (
                    <InlineVideoPlayer
                      src={item.src}
                      poster={item.poster}
                      label={`${item.label}视频案例`}
                      onPlay={pauseOtherVideos}
                      onPause={() => setIsPaused(false)}
                    />
                  ) : (
                    <img src={item.poster} alt="" loading="lazy" decoding="async" />
                  )}
                </div>
                <span className="content-video-camera-a11y">{item.title}</span>
              </article>
            );
          })}
        </motion.div>
      </div>

      <footer className="content-video-camera-controls">
        <button type="button" onClick={() => moveCamera(-1)} aria-label="上一个案例"><ArrowLeft aria-hidden="true" /></button>
        <div aria-live="polite">
          <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
          <span>/ 06</span>
          <em>{videoCases[activeIndex].label}</em>
        </div>
        <button type="button" onClick={() => moveCamera(1)} aria-label="下一个案例"><ArrowRight aria-hidden="true" /></button>
      </footer>
    </section>
  );
}
