import { ContentSocialDetails } from "../components/ContentSocialDetails";
import {
  InnerFooter,
  InnerHero,
  InnerNav,
  PageLink,
} from "../components/InnerPageShell";

export default function ContentSocialPage() {
  return (
    <main className="inner-page content-page">
      <InnerNav />
      <InnerHero
        eyebrow="CONTENT & SOCIAL / PLATFORM EXPERIENCE"
        title={<>懂项目，<br /><em>也懂内容。</em></>}
        intro="品牌项目之外，我长期参与娱乐与科技账号的内容运营。这些一线经验让我能够从真实的平台环境出发，理解用户为什么点击、互动与收藏，以及品牌如何自然进入账号内容。"
      />

      <ContentSocialDetails />

      <section className="inner-next-section">
        <span>NEXT / ABOUT ME</span>
        <h2>内容、品牌与项目，<br />构成了我的能力结构。</h2>
        <PageLink href="/about" tone="acid">了解我的完整经历</PageLink>
      </section>
      <InnerFooter />
    </main>
  );
}
