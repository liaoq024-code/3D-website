"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const cases = [
  { title: "平台热点", src: "/content-cases/platform.mp4", poster: "/content-cases/platform.jpg" },
  { title: "明星事件", src: "/content-cases/celebrity.mp4", poster: "/content-cases/celebrity.jpg" },
  { title: "电视剧衍生", src: "/content-cases/drama.mp4", poster: "/content-cases/drama.jpg" },
  { title: "综艺衍生", src: "/content-cases/variety.mp4", poster: "/content-cases/variety.jpg" },
  { title: "自然流 APP 植入", src: "/content-cases/placement.mp4", poster: "/content-cases/placement.jpg" },
  { title: "自然流 3C 植入", src: "/content-cases/placement.mp4", poster: "/content-cases/placement.jpg" },
];

const menuLinks = [
  ["首页", "/"],
  ["内容工作", "/#content-cases"],
  ["视频案例", "#video-cases"],
  ["联系我", "/contact"],
];

function Mark() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true">
      <path fill="currentColor" d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
    </svg>
  );
}

export function ContentCasesLanding() {
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const playingRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const halfWidth = track.scrollWidth / 2;
        if (!draggingRef.current && !playingRef.current) {
          if (Math.abs(velocityRef.current) > 0.1) {
            offsetRef.current += velocityRef.current;
            velocityRef.current *= 0.95;
          } else {
            velocityRef.current = 0;
            offsetRef.current -= 0.8;
          }
        }
        if (halfWidth > 0) {
          if (offsetRef.current <= -halfWidth) offsetRef.current += halfWidth;
          if (offsetRef.current > 0) offsetRef.current -= halfWidth;
        }
        track.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("video")) return;
    draggingRef.current = true;
    setDragging(true);
    velocityRef.current = 0;
    startXRef.current = event.clientX;
    startOffsetRef.current = offsetRef.current;
    lastXRef.current = event.clientX;
    lastTimeRef.current = performance.now();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    velocityRef.current = ((event.clientX - lastXRef.current) / dt) * 16;
    offsetRef.current = startOffsetRef.current + event.clientX - startXRef.current;
    lastXRef.current = event.clientX;
    lastTimeRef.current = now;
  };

  const pointerUp = () => {
    draggingRef.current = false;
    setDragging(false);
  };

  const handlePlay = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const active = event.currentTarget;
    trackRef.current?.querySelectorAll("video").forEach((video) => {
      if (video !== active) video.pause();
    });
    playingRef.current = true;
  };

  return (
    <main className="case-showcase-page">
      <nav className="case-showcase-nav">
        <a className="case-showcase-mark" href="/" aria-label="返回首页"><Mark /></a>
        <button className="case-showcase-menu-button" onClick={() => setOpen(true)} aria-label="打开菜单"><i /><i /></button>
        <a className="case-showcase-meeting" href="/contact">联系我</a>
        <span className="case-showcase-mobile-spacer" />
      </nav>

      <button className={`case-showcase-overlay ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-label="关闭菜单遮罩" />
      <aside className={`case-showcase-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <header><a className="case-showcase-mark" href="/"><Mark /></a><button onClick={() => setOpen(false)} aria-label="关闭菜单"><i /><i /></button></header>
        <div className="case-showcase-drawer-links">
          {menuLinks.map(([label, href], index) => <a key={label} href={href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${150 + index * 60}ms` : "0ms" }}>{label}</a>)}
        </div>
        <a className="case-showcase-drawer-cta" href="/contact" style={{ transitionDelay: open ? "400ms" : "0ms" }}>联系我 <ArrowUpRight /></a>
      </aside>

      <section className="case-showcase-hero">
        <span>CONTENT / SOCIAL COMMUNICATION</span>
        <h1>Selected Content<br />Cases</h1>
        <p>把平台热点、人物事件与用户情绪，转化为值得观看和传播的内容。</p>
      </section>

      <section className="case-video-marquee" id="video-cases" aria-label="内容精选视频案例">
        <svg className="case-mask case-mask-top" viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z" /></svg>
        <div ref={trackRef} className={`case-video-track ${dragging ? "is-dragging" : ""}`} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
          {[...cases, ...cases].map((item, index) => (
            <figure className="case-video-slide" key={`${item.title}-${index}`}>
              <video controls playsInline preload="metadata" poster={item.poster} aria-label={item.title} title={item.title} onPlay={handlePlay} onPause={() => { playingRef.current = false; }} onEnded={() => { playingRef.current = false; }}>
                <source src={item.src} type="video/mp4" />
              </video>
            </figure>
          ))}
        </div>
        <svg className="case-mask case-mask-bottom" viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z" /></svg>
      </section>

      <section className="case-showcase-bottom">
        <p>六个案例覆盖平台热点、明星事件、影视综艺衍生与自然流商业植入，呈现从选题到成片的内容判断。</p>
        <div><a href="/contact">联系我</a><a href="/#content-cases">返回内容工作</a></div>
      </section>
    </main>
  );
}
