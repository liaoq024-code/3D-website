"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ContentVideoAccordion } from "./ContentVideoAccordion";
import { InlineVideoPlayer } from "./InlineVideoPlayer";

const growthMetrics = [
  ["200+", "个人爆款内容"],
  ["100+", "榜单露出"],
  ["100万+", "单条最高点赞"],
  ["2000万+", "单条最高播放"],
  ["15万+", "推动账号自然涨粉"],
];

const contentWork = [
  ["热点判断", "事件热度｜生命周期｜最佳介入时机"],
  ["用户洞察", "高赞观点｜用户讨论｜共同记忆"],
  ["差异化选题", "人物关系｜历史线索｜情绪切口"],
  ["内容表达", "前三秒钩子｜标题结构｜素材顺序｜叙事节奏"],
];

const technologyAccounts = [
  {
    number: "01",
    name: "科技真探 Techdetective",
    namePrimary: "科技真探",
    nameSecondary: "Techdetective",
    position: "科技型老戏骨 IP",
    image: "/content-account-techdetective.png",
    video: "/content-accounts/7623368312143318203.mp4",
    videoEmbed: null,
    poster: "/content-accounts/techdetective-poster.jpg",
    videoLink: "https://v.douyin.com/QoL9jzhkB64/",
    profile: "达人形象抽象活泼，擅长用演技和情景角色表达，把复杂枯燥的科技信息转化成普通用户更容易理解和传播的内容。",
    directions: ["一人分饰多角剧场演绎", "科技知识科普", "抽象场景演绎"],
    value: "带用户发现：原来科技一点都不复杂枯燥，反而还有点有趣。",
  },
  {
    number: "02",
    name: "Vision 科技测评",
    namePrimary: "Vision",
    nameSecondary: "科技测评",
    position: "科技邪修",
    image: "/content-account-vision.png",
    video: "/content-accounts/7606318862401503353.mp4",
    videoEmbed: null,
    poster: "/content-accounts/vision-poster.jpg",
    videoLink: "https://v.douyin.com/C5gUzfZ7aNQ/",
    profile: "达人表达更加活泼，用户相对年轻，对新鲜事件的接受程度更高、更快。",
    directions: ["隐藏功能", "设备技巧", "外网资讯", "实体机体验"],
    value: "让用户一不小心学会新技巧，打破科技信息差。",
  },
  {
    number: "03",
    name: "tao 的科技生活",
    namePrimary: "tao",
    nameSecondary: "的科技生活",
    position: "日常科技观点与资讯",
    image: "/content-account-tao.png",
    video: "/content-accounts/7660126391078337701.mp4",
    videoEmbed: null,
    poster: "/content-accounts/tao-poster-clean-v2.png",
    videoLink: "https://v.douyin.com/1RHgyWKLi5I/",
    profile: "达人形象成熟、表达专业，观点更具信服力，用户年龄相对偏成熟。",
    directions: ["科技新闻", "消费观点", "行业变化"],
    value: "帮普通用户理解：原来科技还可以这样理解。",
  },
];

const commercialSteps = [
  ["01", "理解 Brief", "明确品牌必须传递的信息、素材、产品卖点及合规要求。"],
  ["02", "寻找内容切角", "在既定方向下，结合账号日常内容和用户兴趣找到具体表达方式。"],
  ["03", "脚本与制作", "完成标题、开头、完整脚本、素材组织及视频制作。"],
  ["04", "反馈修改", "根据品牌审核意见进行调整，同时尽可能保留内容的原生感与观看价值。"],
];

const commercialCases = [
  {
    number: "01",
    brand: "蜜雪冰城",
    type: "热点内容",
    background: "2025 年 315 期间，蜜雪冰城被曝出“隔夜柠檬”。",
    treatment: "围绕事件下用户在各大视频中的评论切入，不断放大用户“为雪王发声”的情绪聚焦点，同时展开蜜雪冰城的真诚事例，落点在用户与品牌之间的双向选择，实现品牌的正向传播。",
    results: ["180万+ 播放量", "8.9万+ 点赞量", "有效种草评论"],
    video: "/commercial-cases/mixue.mp4",
    poster: "/commercial-cases/mixue-poster.jpg",
    videoLink: "https://v.douyin.com/n0kLXDPLSe8/",
  },
  {
    number: "02",
    brand: "凸凸棉",
    type: "产品种草",
    background: "凸凸棉在线下开展活动，邀请盲人女性体验产品并回收意见。",
    treatment: "从视障女性的月经困境、盲人女性如何度过经期的视角切入，打开用户的情绪共鸣点，逐渐展开凸凸棉对女性群体提供帮助的具体行动，实现自然的品牌植入。",
    results: ["460万+ 播放量", "25.3万+ 点赞量", "有效种草评论"],
    video: "/commercial-cases/tutu.mp4",
    poster: "/commercial-cases/tutu-poster.jpg",
    videoLink: "https://v.douyin.com/KDM2AtpwVSg/",
  },
  {
    number: "03",
    brand: "红米Note17Pro",
    type: "科技实体机测评",
    background: "小米开启 #和小金刚一起挑战不可能 系列挑战，让达人进行真人实测与讲解。",
    treatment: "围绕其他达人的真实测评，以手机放入火锅等强视觉内容作为切口留存观众；随后自发展开实测挑战并穿插产品讲解，实现品牌种草。",
    results: ["108万+ 播放量", "1.3万+ 点赞量", "小蓝词种草"],
    video: "/commercial-cases/redmi.mp4",
    poster: "/commercial-cases/redmi-poster-v2.jpg",
    videoLink: "https://v.douyin.com/nEVYFndpIS0/",
  },
];

export function HomeContentCases() {
  return (
    <section className="home-content-cases" id="content-cases">
      <div className="content-case-marquee" aria-hidden="true">
        <div>
          <span>HOTSPOT INSIGHT</span><i>✦</i><span>ACCOUNT STRATEGY</span><i>✦</i><span>COMMERCIAL CONTENT</span><i>✦</i>
          <span>HOTSPOT INSIGHT</span><i>✦</i><span>ACCOUNT STRATEGY</span><i>✦</i><span>COMMERCIAL CONTENT</span><i>✦</i>
        </div>
      </div>

      <motion.header
        className="content-cases-intro"
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="section-heading">CONTENT</h2>
        <h3>内容与账号案例</h3>
        <div className="content-cases-intro-note">
          <strong>这里展示的不是品牌 Campaign，而是我在内容生产、账号运营与商业内容落地上的实际能力。</strong>
        </div>
      </motion.header>

      <article className="content-case-chapter growth-chapter">
        <b className="content-case-chapter-index" aria-hidden="true">01</b>
        <header className="content-case-chapter-heading growth-chapter-heading">
          <span>CONTENT GROWTH</span>
          <div className="growth-heading-copy">
            <h3>娱乐账号内容增长</h3>
            <strong>曾负责「会火大明星」「娱乐喵呜酱」等头部娱乐账号的日常内容运营，完成从热点判断、选题策划、脚本撰写到素材组织、发布及数据复盘的完整内容链路。</strong>
          </div>
          <div className="growth-heading-media" aria-label="娱乐账号头像">
            <figure><img src="/content-cases-huohuo-avatar.png" alt="会火大明星账号头像" /></figure>
            <figure><img src="/content-cases-miaowu-avatar.png" alt="娱乐喵呜酱账号头像" /></figure>
          </div>
        </header>

        <h4 className="content-case-subtitle content-metrics-title">核心数据成果</h4>
        <div className="content-case-metrics growth-metrics">
          {growthMetrics.map(([value, label], index) => (
            <motion.div key={label} whileHover={{ y: -7 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className={`metric-${index + 1}`}>
              <strong>{value}</strong><span>{label}</span>
            </motion.div>
          ))}
        </div>

        <h4 className="content-case-subtitle content-work-title">我的内容工作</h4>
        <div className="content-case-work-list">
          {contentWork.map(([title, copy], index) => (
            <motion.article key={title} whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
              <span>0{index + 1}</span>
              <div><h4>{title}</h4><p>{copy}</p></div>
              <ArrowDownRight aria-hidden="true" />
            </motion.article>
          ))}
        </div>

        <ContentVideoAccordion />
      </article>

      <article className="content-case-chapter strategy-chapter">
        <b className="content-case-chapter-index" aria-hidden="true">02</b>
        <header className="content-case-chapter-heading">
          <span>ACCOUNT STRATEGY</span>
          <h3>科技达人账号运营</h3>
          <strong>负责多个泛科技达人账号的内容统筹，覆盖 3C、汽车、AI、家电、机器人、App 等领域。</strong>
        </header>

        <div className="content-case-metrics strategy-metrics">
          {[["3个", "科技达人账号统筹"], ["10+条", "高表现内容"], ["800万+", "单条最高播放"], ["5000万+", "累计内容播放"]].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong><span>{label}</span>
            </div>
          ))}
        </div>

        <div className="account-strategy-list">
          {technologyAccounts.map((account) => (
            <article key={account.number} data-profile={account.number}>
              <header className="account-strategy-heading">
                <span>{account.number}</span>
                <div className="account-strategy-title">
                  <small>{account.position}</small>
                  <h4><b>{account.namePrimary}</b><i>{account.nameSecondary}</i></h4>
                </div>
                <img className="account-strategy-avatar" src={account.image} alt={`${account.name}账号人物形象`} loading="lazy" decoding="async" />
              </header>
              <div className="account-strategy-main">
                <div className="account-strategy-system" aria-hidden="true">
                  <span>CREATOR PROFILE / {account.number}</span>
                  <i />
                  <b>SIGNAL ACTIVE</b>
                </div>
                <div className="content-case-tags">{account.directions.map((item) => <i key={item} tabIndex={0}>{item}</i>)}</div>
                <div className="account-strategy-copy">
                  <span className="account-strategy-kicker">账号介绍</span>
                  <p>{account.profile}</p>
                </div>
                <blockquote>{account.value}</blockquote>
              </div>
              <figure className="account-strategy-media" data-profile={account.number}>
                {account.video ? (
                  <InlineVideoPlayer src={account.video} poster={account.poster} label={`${account.name}代表视频`} playLabel="播放代表作" posterLoading="lazy" />
                ) : null}
                <a className="account-strategy-source" href={account.videoLink} target="_blank" rel="noreferrer">
                  抖音原片 <ArrowUpRight aria-hidden="true" />
                </a>
              </figure>
            </article>
          ))}
        </div>
      </article>

      <article className="content-case-chapter commercial-chapter">
        <b className="content-case-chapter-index" aria-hidden="true">03</b>
        <header className="content-case-chapter-heading">
          <span>COMMERCIAL CONTENT</span>
          <h3>商务爆款内容精选</h3>
          <strong>除了独立负责的品牌营销项目外，我也长期承接品牌商务短视频需求，结合发布账号的内容调性完成具体内容落地。</strong>
        </header>

        <h4 className="content-case-subtitle commercial-work-title">我的工作职责</h4>
        <div className="commercial-step-grid">
          {commercialSteps.map(([number, title, copy]) => (
            <motion.article key={number} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <span>{number}</span><h4>{title}</h4><p>{copy}</p>
            </motion.article>
          ))}
        </div>

        <blockquote>
          <span>我更关注的不是“把广告做完”</span>
          <strong><span className="commercial-headline-line">而是在品牌目标与用户体验之间</span><span className="commercial-headline-line">建立自然且有效的内容表达。</span></strong>
          <p>重点处理品牌信息与内容节奏、品牌露出位置、账号原有表达方式、开头广告感、叙事完整性，以及用户继续观看的理由。</p>
        </blockquote>

        <div className="commercial-case-grid">
          {commercialCases.map((item, index) => (
            <motion.article
              key={item.number}
              data-case={item.number}
              className={`commercial-case-row ${index === 1 ? "is-media-left" : "is-media-right"}`}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
            >
              <div className="commercial-case-copy">
                <div className="commercial-case-meta"><span>作品 {item.number}</span><i>{item.type}</i></div>
                <h4>{item.brand}</h4>
                <dl>
                  <div><dt>事件背景</dt><dd>{item.background}</dd></div>
                  <div><dt>内容处理</dt><dd>{item.treatment}</dd></div>
                  <div><dt>我的职责</dt><dd>内容切角｜脚本撰写｜素材组织｜成片制作</dd></div>
                </dl>
                <div className="commercial-data-heading"><span>数据成果</span><i>PERFORMANCE</i></div>
                <div className="commercial-results">{item.results.map((result) => <strong key={result}>{result}</strong>)}</div>
              </div>
              <figure className="commercial-case-video">
                <InlineVideoPlayer
                  src={item.video}
                  poster={item.poster}
                  label={`${item.brand}案例视频`}
                  playLabel="播放案例视频"
                  posterLoading="lazy"
                />
                <a className="commercial-case-source" href={item.videoLink} target="_blank" rel="noreferrer">
                  抖音原片 <ArrowUpRight aria-hidden="true" />
                </a>
              </figure>
            </motion.article>
          ))}
        </div>
      </article>

      <motion.footer
        className="content-cases-closing"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>MY CONTENT APPROACH</span>
        <div>
          <p>从自然流爆款，到不同科技账号的长期内容运营，再到带有商业诉求的品牌视频，我始终在解决同一件事：</p>
          <strong>找到账号、用户与内容之间真正成立的连接。</strong>
        </div>
      </motion.footer>
    </section>
  );
}
