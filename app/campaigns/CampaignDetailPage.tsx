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

const meituanXiaozhanVideos = [
  {
    id: "7550133848323951912",
    index: "01",
    title: "高表现内容 01",
    src: "/meituan-xiaozhan-video-01.mp4",
    poster: "/meituan-xiaozhan-video-01.jpeg",
    url: "https://v.douyin.com/Aes8wED4_p0/",
    likes: "11.9万",
    views: "105万",
  },
  {
    id: "7550133811271503158",
    index: "02",
    title: "高表现内容 02",
    src: "/meituan-xiaozhan-video-02.mp4",
    poster: "/meituan-xiaozhan-video-02.jpeg",
    url: "https://v.douyin.com/AC1vCLC3nKc/",
    likes: "4.7万",
    views: "31万",
  },
] as const;

type CampaignVideo = (typeof bopVideos)[number] | (typeof meituanXiaozhanVideos)[number];

function CampaignVideoShowcase({
  videos,
  title,
}: {
  videos: readonly CampaignVideo[];
  title: string;
}) {
  return (
    <details className="case-video-showcase">
      <summary>
        <span className="case-video-toggle-copy">
          <small>FEATURED CONTENT / {String(videos.length).padStart(2, "0")}</small>
          <strong>{title}</strong>
        </span>
        <span className="case-video-chevrons" aria-hidden="true">
          <i />
          <i />
        </span>
      </summary>

      <div className={`case-phone-grid ${videos.length === 2 ? "case-phone-grid-two" : ""}`}>
        {videos.map((video) => (
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
  );
}

const meituanHotspots = [
  {
    index: "01",
    image: "/meituan-hotspot-01-clean.png",
    term: "一眼就认出了肖战",
  },
  {
    index: "02",
    image: "/meituan-hotspot-02-replacement-clean.png",
    term: "肖战的唇下痣天生防伪认证",
  },
] as const;

function MeituanHotspotProof() {
  return (
    <section className="case-hotspot-proof">
      <header>
        <span>WEIBO RISING TOPICS / 02</span>
        <h3>微博上升热点证明</h3>
        <p>两条内容进入微博实时上升热点。</p>
      </header>
      <div className="case-hotspot-grid">
        {meituanHotspots.map((hotspot, index) => (
          <article className="case-hotspot-poster" key={hotspot.index} tabIndex={0}>
            <span className="case-paperclip" aria-hidden="true" />
            <figure>
              <img src={hotspot.image} alt={`微博实时上升热点截图：${hotspot.term}`} />
            </figure>
            <div className="case-hotspot-zoom">
              <small>RISING TOPIC / {hotspot.index}</small>
              <strong>{hotspot.term}</strong>
              <span>微博实时上升热点</span>
            </div>
            <i aria-hidden="true">0{index + 1}</i>
          </article>
        ))}
      </div>
    </section>
  );
}

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
            <CampaignVideoShowcase videos={bopVideos} title="展开高表现视频" />
          )}

          {campaign.slug === "meituan-xiaozhan" && (
            <>
              <CampaignVideoShowcase
                videos={meituanXiaozhanVideos}
                title="展开高表现内容案例"
              />
              <MeituanHotspotProof />
            </>
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
