import {
  InnerFooter,
  InnerHero,
  InnerNav,
  PageLink,
} from "../components/InnerPageShell";
import { FixedPhoneVideo } from "./FixedPhoneVideo";
import type { CampaignCase } from "./campaignData";

const bopVideos = [
  {
    id: "7546626836394954024",
    index: "01",
    title: "强强联手",
    src: "/bop-video-01.mp4",
    poster: "/bop-video-01-poster.jpg",
    url: "https://v.douyin.com/6PLDP6rFPZQ/",
    likes: "2.3万",
    views: "106万",
  },
  {
    id: "7546872070689410358",
    index: "02",
    title: "开卷考",
    src: "/bop-video-02.mp4",
    poster: "/bop-video-02-poster.jpg",
    url: "https://v.douyin.com/19NEkWXN6Ms/",
    likes: "1.5万",
    views: "36万",
  },
  {
    id: "7546626758611766564",
    index: "03",
    title: "剪影补全",
    src: "/bop-video-03.mp4",
    poster: "/bop-video-03-poster.jpg",
    url: "https://v.douyin.com/5xtG-vvvcps/",
    likes: "1.2万",
    views: "28万",
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

              <div className="case-phone-grid">
                {bopVideos.map((video) => (
                  <article className="case-phone-item" key={video.id}>
                    <div className="case-iphone">
                      <span className="case-iphone-button case-iphone-button-volume" aria-hidden="true" />
                      <span className="case-iphone-button case-iphone-button-power" aria-hidden="true" />
                      <div className="case-iphone-screen">
                        <span className="case-dynamic-island" aria-hidden="true" />
                        <FixedPhoneVideo
                          index={video.index}
                          title={video.title}
                          src={video.src}
                          poster={video.poster}
                        />
                      </div>
                    </div>
                    <div className="case-phone-meta">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`在抖音打开视频：${video.title}`}
                      >
                        <span>抖音原片</span>
                        <strong>{video.url.replace("https://", "")}</strong>
                        <i aria-hidden="true">↗</i>
                      </a>
                      <dl>
                        <div>
                          <dt>点赞量</dt>
                          <dd>{video.likes}</dd>
                        </div>
                        <div>
                          <dt>播放量</dt>
                          <dd>{video.views}</dd>
                        </div>
                      </dl>
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
        <span>BACK / SELECTED CAMPAIGN</span>
        <h2>返回主页面。</h2>
        <PageLink href={`/#project-${campaign.slug}`} tone="acid">返回主页面</PageLink>
      </section>
      <InnerFooter />
    </main>
  );
}
