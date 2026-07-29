import {
  InnerFooter,
  InnerHero,
  InnerNav,
  PageLink,
} from "../components/InnerPageShell";
import type { CampaignCase } from "./campaignData";

const bopVideos = [
  {
    id: "7546626836394954024",
    index: "01",
    title: "强强联手",
    source: "https://v.douyin.com/6PLDP6rFPZQ/",
  },
  {
    id: "7546872070689410358",
    index: "02",
    title: "开卷考",
    source: "https://v.douyin.com/19NEkWXN6Ms/",
  },
  {
    id: "7546626758611766564",
    index: "03",
    title: "剪影补全",
    source: "https://v.douyin.com/5xtG-vvvcps/",
  },
] as const;

export function CampaignDetailPage({ campaign }: { campaign: CampaignCase }) {
  return (
    <main className={`inner-page campaigns-page campaign-detail-page campaign-detail-${campaign.slug}`}>
      <InnerNav />
      <InnerHero
        eyebrow={`CAMPAIGN ${campaign.number} / DETAILED CASE`}
        title={<>{campaign.shortTitle}<br /><em>完整项目案例。</em></>}
        intro={campaign.summary}
      >
        <div className="inner-hero-actions">
          <PageLink href="#case-detail" tone="acid">进入项目复盘</PageLink>
          <PageLink href="/campaigns">返回案例目录</PageLink>
        </div>
      </InnerHero>

      <div className="case-list single-case-list">
        <article className="case-study" id="case-detail">
          <header className="case-study-header">
            <span className="case-study-number">{campaign.number}</span>
            <div>
              <p>SELECTED CAMPAIGN / {campaign.number}</p>
              <h2>{campaign.title}</h2>
              <strong>{campaign.summary}</strong>
            </div>
          </header>

          <div className="case-tags">
            {campaign.tags.map((tag) => <span key={tag} tabIndex={0}>{tag}</span>)}
          </div>

          <div className="case-meta-grid">
            {campaign.meta.map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
          </div>

          <section className="case-overview">
            <div>
              <span className="inner-section-label">01 / PROJECT OVERVIEW</span>
              <h3>项目概览</h3>
            </div>
            <p>{campaign.overview}</p>
          </section>

          <section className="case-role-grid">
            <div className="case-role-copy">
              <span className="inner-section-label">02 / MY ROLE</span>
              <h3>我的职责</h3>
              <ul>
                {campaign.responsibilities.map((responsibility) => (
                  <li key={responsibility} tabIndex={0}>{responsibility}</li>
                ))}
              </ul>
            </div>
            <aside>
              <span>ROLE CLARIFICATION</span>
              <p>{campaign.note}</p>
            </aside>
          </section>

          <section className="case-process">
            <span className="inner-section-label">03 / CHALLENGE &amp; ACTION</span>
            <h3>挑战与关键动作</h3>
            <div className="case-process-grid">
              <div>
                <h4>项目挑战</h4>
                {campaign.challenges.map(([title, body], index) => (
                  <article key={title} tabIndex={0}>
                    <span>0{index + 1}</span>
                    <div><strong>{title}</strong><p>{body}</p></div>
                  </article>
                ))}
              </div>
              <div>
                <h4>我的关键动作</h4>
                {campaign.actions.map(([title, body], index) => (
                  <article key={title} tabIndex={0}>
                    <span>0{index + 1}</span>
                    <div><strong>{title}</strong><p>{body}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <div className="case-stage-strip" aria-label="项目结构">
            {campaign.stages.map((stage, index) => (
              <div key={stage}><span>0{index + 1}</span><strong>{stage}</strong></div>
            ))}
          </div>

          <section className="case-results">
            <div>
              <span className="inner-section-label">04 / RESULTS</span>
              <h3>项目结果</h3>
            </div>
            <div className="case-result-grid">
              {campaign.results.map(([value, label]) => (
                <div key={label} tabIndex={0} aria-label={`${value}，${label}`}>
                  <strong>{value}</strong><span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          {campaign.slug === "bop" && (
            <details className="case-video-showcase">
              <summary>
                <span className="case-video-toggle-copy">
                  <small>FEATURED CONTENT / 03</small>
                  <strong>展开高表现视频</strong>
                </span>
                <span className="case-video-chevrons" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </summary>

              <div className="case-video-intro">
                <span>SELECTED WORKS</span>
                <h3>三条代表内容，<br />在手机里直接播放。</h3>
              </div>

              <div className="case-phone-grid">
                {bopVideos.map((video) => (
                  <article className="case-phone-item" key={video.id}>
                    <div className="case-iphone">
                      <span className="case-iphone-button case-iphone-button-volume" aria-hidden="true" />
                      <span className="case-iphone-button case-iphone-button-power" aria-hidden="true" />
                      <div className="case-iphone-screen">
                        <span className="case-dynamic-island" aria-hidden="true" />
                        <iframe
                          src={`https://open.douyin.com/player/video?vid=${video.id}&autoplay=0`}
                          title={`BOP 高表现视频 ${video.index}：${video.title}`}
                          loading="lazy"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          referrerPolicy="unsafe-url"
                        />
                      </div>
                    </div>
                    <div className="case-phone-caption">
                      <span>{video.index}</span>
                      <strong>{video.title}</strong>
                      <a href={video.source} target="_blank" rel="noreferrer">
                        抖音原片 ↗
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </details>
          )}

          <section className="case-recap">
            <span>PROJECT REVIEW</span>
            <h3>项目复盘</h3>
            <p>{campaign.recap}</p>
          </section>
        </article>
      </div>

      <section className="inner-next-section">
        <span>MORE / SELECTED CAMPAIGNS</span>
        <h2>查看案例目录，<br />按项目独立浏览。</h2>
        <PageLink href="/campaigns" tone="acid">返回四个案例目录</PageLink>
      </section>
      <InnerFooter />
    </main>
  );
}
