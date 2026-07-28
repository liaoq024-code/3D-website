import {
  InnerFooter,
  InnerHero,
  InnerNav,
  PageLink,
} from "../components/InnerPageShell";
import { campaignCases } from "./campaignData";

export default function CampaignsPage() {
  return (
    <main className="inner-page campaigns-page">
      <InnerNav />
      <InnerHero
        eyebrow="CAMPAIGNS / SELECTED WORK"
        title={<>品牌项目<br /><em>独立案例目录。</em></>}
        intro="四个案例分别展示项目统筹、平台传播、话题策略与自然流内容策划。每个项目均拥有独立详情页，避免不同案例内容堆叠。"
      >
        <div className="inner-hero-actions">
          <PageLink href="#campaign-directory" tone="acid">选择一个案例</PageLink>
          <PageLink href="/content-social">查看内容经验</PageLink>
        </div>
      </InnerHero>

      <section className="campaign-directory" id="campaign-directory">
        <header>
          <span className="inner-section-label">SELECTED CAMPAIGNS / 01—04</span>
          <h2>选择项目，<br />进入独立完整案例。</h2>
        </header>
        <div className="campaign-directory-grid">
          {campaignCases.map((campaign) => (
            <article key={campaign.slug}>
              <span>{campaign.number} / {campaign.tags[0]}</span>
              <div>
                <h3>{campaign.shortTitle}</h3>
                <p>{campaign.summary}</p>
              </div>
              <PageLink href={`/campaigns/${campaign.slug}`} tone="light">
                查看详细案例
              </PageLink>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-next-section">
        <span>NEXT / CONTENT &amp; SOCIAL</span>
        <h2>项目之外，<br />我也长期在内容一线。</h2>
        <PageLink href="/content-social" tone="acid">查看内容与社交媒体经历</PageLink>
      </section>
      <InnerFooter />
    </main>
  );
}
