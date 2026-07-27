import { ArrowUpRight, Download } from "lucide-react";
import type { ReactNode } from "react";

export function InnerNav() {
  return (
    <header className="inner-site-nav">
      <a className="inner-brand" href="/" aria-label="返回首页">
        <strong>LQ.</strong>
        <span>BRAND CONTENT<br />&amp; SOCIAL</span>
      </a>
      <nav aria-label="网站导航">
        <a href="/">首页</a>
        <a href="/about">关于我</a>
        <a href="/campaigns">品牌项目</a>
        <a href="/content-social">内容与社交媒体</a>
        <a href="/contact">联系我</a>
      </nav>
      <a
        className="inner-resume-link"
        href="/廖沁-品牌内容营销与内容策略-CV.pdf"
        download
      >
        下载简历 <Download aria-hidden="true" />
      </a>
    </header>
  );
}

export function InnerHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="inner-hero">
      <div className="inner-hero-orb inner-hero-orb-one" aria-hidden="true" />
      <div className="inner-hero-orb inner-hero-orb-two" aria-hidden="true" />
      <span className="inner-eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{intro}</p>
      {children}
      <div className="inner-hero-index" aria-hidden="true">
        <span>PORTFOLIO</span>
        <strong>2026</strong>
      </div>
    </section>
  );
}

export function PageLink({
  href,
  children,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "acid";
}) {
  return (
    <a className={`page-link ${tone}`} href={href}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

export function InnerFooter() {
  return (
    <footer className="inner-footer">
      <div>
        <strong>廖沁｜品牌内容与社交传播作品集</strong>
        <p>
          Brand Content Marketing · Social Media Marketing · Campaign Management
        </p>
      </div>
      <div className="inner-footer-contact">
        <a href="mailto:1430943020@qq.com">1430943020@qq.com</a>
        <span>© 2026 廖沁. All rights reserved.</span>
      </div>
      <p className="inner-footer-note">
        网站所展示项目均基于本人真实工作经历。部分项目素材、客户信息及内部文件已进行脱敏处理，
        项目成果中已明确区分个人职责与团队共同成果。
      </p>
    </footer>
  );
}

