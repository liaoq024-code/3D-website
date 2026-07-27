import {
  InnerFooter,
  InnerHero,
  InnerNav,
  PageLink,
} from "../components/InnerPageShell";
import type { CSSProperties } from "react";

const contentSignals = [
  "平台热搜与热点榜单",
  "人物及事件讨论增速",
  "抖音热点宝",
  "评论区高赞观点",
  "低粉账号高数据内容",
  "热点中尚未被表达的信息缺口",
  "用户共同记忆和情绪",
];

const technologyAccounts = [
  {
    name: "tao 的科技生活",
    direction: "日常科技观点与资讯",
    value: "用成熟、清晰的表达，帮助用户理解与日常生活有关的科技变化。",
    accent: "#d7ff32",
  },
  {
    name: "vision 科技测评",
    direction: "设备技巧、隐藏功能与创意玩法",
    value: "通过更具娱乐感和互动性的表达，让用户发现设备不止一种使用方式。",
    accent: "#ff65ce",
  },
  {
    name: "科技真探 Techdetective",
    direction: "科技知识对话科普与品牌故事演绎",
    value: "用一人分饰两角的剧情形式，站在普通用户视角拆解科技产品背后的真实价值。",
    accent: "#65d6ff",
  },
];

const productionFlow = [
  "搭建科技达人日常选题标准 SOP",
  "明确日常产出和商单折算方式",
  "制定选题准入与内容红线",
  "建立报题与审核流程",
  "搭建拍摄排期和账号数据表",
  "负责 2 名正式岗带训",
];

export default function ContentSocialPage() {
  return (
    <main className="inner-page content-page">
      <InnerNav />
      <InnerHero
        eyebrow="CONTENT & SOCIAL / PLATFORM EXPERIENCE"
        title={<>懂项目，<br /><em>也懂内容。</em></>}
        intro="品牌项目之外，我长期参与娱乐与科技账号的内容运营。这些一线经验让我能够从真实的平台环境出发，理解用户为什么点击、互动与收藏，以及品牌如何自然进入账号内容。"
      >
        <div className="inner-hero-actions">
          <PageLink href="#entertainment" tone="acid">查看娱乐内容增长</PageLink>
          <PageLink href="#technology">查看科技内容统筹</PageLink>
        </div>
      </InnerHero>

      <section className="content-track entertainment-track" id="entertainment">
        <header>
          <span className="inner-section-label">01 / ENTERTAINMENT CONTENT</span>
          <h2>从热点信息里，<br />找到用户真正想讨论的情绪。</h2>
          <p>
            负责会火大明星与娱乐喵呜酱的日常内容运营，覆盖热点判断、选题策划、脚本撰写、
            素材筛选、内容发布、评论区观察与数据复盘。
          </p>
        </header>

        <div className="content-account-row">
          <article><span>ACCOUNT 01</span><strong>会火大明星</strong><p>279万+ 粉丝</p></article>
          <article><span>ACCOUNT 02</span><strong>娱乐喵呜酱</strong><p>397万+ 粉丝</p></article>
        </div>

        <div className="content-metric-wall">
          <div><strong>200+</strong><span>个人爆款内容</span></div>
          <div><strong>100+</strong><span>榜单露出</span></div>
          <div><strong>100万+</strong><span>单条最高点赞</span></div>
          <div><strong>2000万+</strong><span>单条最高播放</span></div>
          <div><strong>15万+</strong><span>推动账号自然涨粉</span></div>
        </div>

        <div className="content-method-grid">
          <div className="content-signal-panel">
            <span className="inner-section-label">HOW I FIND A STORY</span>
            <h3>我的内容判断方式</h3>
            <div>
              {contentSignals.map((signal, index) => (
                <p key={signal}><span>0{index + 1}</span>{signal}</p>
              ))}
            </div>
          </div>
          <div className="content-question-panel">
            <span>进一步判断</span>
            <h3>重点不只是<br />“这个事情火不火”。</h3>
            <ul>
              <li>这个内容适不适合当前账号？</li>
              <li>用户真正讨论的是什么？</li>
              <li>现在应该做事件播报，还是外围延伸？</li>
              <li>同类内容很多时，还能从什么角度进入？</li>
            </ul>
          </div>
        </div>

        <article className="content-logic-case">
          <div>
            <span className="inner-section-label">REPRESENTATIVE CONTENT LOGIC</span>
            <h3>从热点评论中，寻找用户共同记忆。</h3>
          </div>
          <p>
            在《现在就出发》相关热点中，评论区大量用户提到“跑男团宠”的共同记忆。
            相比继续重复节目当下事件，我将评论区情绪延伸为综艺团宠盘点，
            从热点信息转向用户青春记忆与情绪共鸣。
          </p>
          <div className="logic-flow" aria-label="内容判断流程">
            <span>热点事件</span><i>→</i><span>评论区共识</span><i>→</i>
            <span>共同记忆</span><i>→</i><strong>情绪型内容</strong>
          </div>
        </article>
      </section>

      <section className="content-track technology-track" id="technology">
        <header>
          <span className="inner-section-label">02 / TECHNOLOGY CONTENT</span>
          <h2>让不同科技账号，<br />提供不同的用户价值。</h2>
          <p>
            统筹三个科技达人账号的选题、脚本、拍摄与后期协同，内容覆盖 3C、汽车、家电、
            AI、机器人与 App，并持续建立差异化账号方向。
          </p>
        </header>

        <div className="technology-metrics">
          <div><strong>10+</strong><span>高表现内容</span></div>
          <div><strong>800万+</strong><span>单条最高播放</span></div>
          <div><strong>5000万+</strong><span>科技内容累计播放</span></div>
          <div><strong>1万+</strong><span>小红书从 0 增长粉丝</span></div>
        </div>

        <div className="technology-account-list">
          {technologyAccounts.map((account, index) => (
            <article key={account.name} style={{ "--account-accent": account.accent } as CSSProperties}>
              <span>0{index + 1}</span>
              <div><p>{account.direction}</p><h3>{account.name}</h3></div>
              <strong>{account.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-section">
        <header>
          <span className="inner-section-label">03 / CONTENT OPERATIONS</span>
          <h2>把个人判断，<br />沉淀为团队可执行的流程。</h2>
          <p>除内容策划外，我也参与建立规模化内容生产流程，让选题、审核、拍摄与复盘更稳定。</p>
        </header>
        <div className="workflow-grid">
          {productionFlow.map((item, index) => (
            <article key={item}><span>0{index + 1}</span><strong>{item}</strong></article>
          ))}
        </div>
      </section>

      <section className="inner-next-section">
        <span>NEXT / ABOUT ME</span>
        <h2>内容、品牌与项目，<br />构成了我的能力结构。</h2>
        <PageLink href="/about" tone="acid">了解我的完整经历</PageLink>
      </section>
      <InnerFooter />
    </main>
  );
}
