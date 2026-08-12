"use client";

import { motion } from "framer-motion";

const chapterReveal = {
  initial: { opacity: 0, y: 56, scale: 0.985 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.08 },
  transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const },
};

const growthMetrics = [
  ["200+", "个人爆款内容"],
  ["100+", "榜单露出"],
  ["100万+", "单条最高点赞"],
  ["2000万+", "单条最高播放"],
  ["15万+", "推动账号自然涨粉"],
];

const contentWork = [
  ["热点判断", "判断事件热度、生命周期与最佳介入时机。"],
  ["用户洞察", "从评论区高赞观点、用户讨论与共同记忆中寻找新的内容机会。"],
  ["差异化选题", "当大量账号都在讲同一件事时，寻找人物、关系、历史或情绪上的第二切口。"],
  ["内容表达", "通过前三秒钩子、标题、素材顺序与叙事结构，提高内容点击与停留。"],
];

const editorialCases = [
  {
    number: "01",
    type: "热点事件传播",
    title: "从 K 总结婚，到“伴郎团到底有多帅”",
    tags: ["热点衍生", "视觉切口", "人物盘点", "颜值氛围"],
    copy: "K 总结婚成为平台大爆热点后，相比继续重复婚礼流，我选择从婚礼中具有更强视觉吸引力的伴郎团切入，将事件信息重新包装成颜值氛围向内容。通过人物盘点、高颜值素材与氛围剪辑，降低信息型内容的观看门槛，承接婚礼热点流量。",
  },
  {
    number: "02",
    type: "用户情绪衍生",
    title: "从节目热点，到用户真正怀念的“跑男团宠”",
    tags: ["热点衍生", "评论区洞察", "用户情绪", "内容策划"],
    copy: "在《现在就出发》相关热点中，我发现评论区大量高赞内容并没有停留在节目事件本身，而是在讨论过去《跑男》中成员照顾 Angelababy 的名场面。相比继续重复节目当下内容，我将用户情绪进一步延伸为“跑男团宠 Angelababy 名场面盘点”。",
  },
];

const technologyAccounts = [
  {
    number: "01",
    name: "科技真探 Techdetective",
    position: "科技型老戏骨 IP",
    profile: "达人形象抽象活泼，擅长用演技和情景角色表达，把复杂枯燥的科技信息转化成普通用户更容易理解和传播的内容。",
    directions: ["一人分饰多角剧场演绎", "科技知识科普", "抽象场景演绎"],
    value: "带用户发现：原来科技一点都不复杂枯燥，反而还有点有趣。",
  },
  {
    number: "02",
    name: "Vision 科技测评",
    position: "科技邪修",
    profile: "达人表达更加活泼，用户相对年轻，对新鲜事件的接受程度更高、更快。",
    directions: ["隐藏功能", "设备技巧", "外网资讯", "实体机体验"],
    value: "让用户一不小心学会新技巧，打破科技信息差。",
  },
  {
    number: "03",
    name: "tao 的科技生活",
    position: "日常科技观点与资讯",
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
  },
  {
    number: "02",
    brand: "凸凸棉",
    type: "产品种草",
    background: "凸凸棉在线下开展活动，邀请盲人女性体验产品并回收意见。",
    treatment: "从视障女性的月经困境、盲人女性如何度过经期的视角切入，打开用户的情绪共鸣点，逐渐展开凸凸棉对女性群体提供帮助的具体行动，实现自然的品牌植入。",
    results: ["460万+ 播放量", "25.3万+ 点赞量", "有效种草评论"],
  },
  {
    number: "03",
    brand: "红米 Note 17 Pro",
    type: "科技实体机测评",
    background: "小米开启 #和小金刚一起挑战不可能 系列挑战，让达人进行真人实测与讲解。",
    treatment: "围绕其他达人的真实测评，以手机放入火锅等强视觉内容作为切口留存观众；随后自发展开实测挑战并穿插产品讲解，实现品牌种草。",
    results: ["108万+ 播放量", "1.3万+ 点赞量", "小蓝词种草"],
  },
];

export function HomeContentCases() {
  return (
    <section className="home-content-cases" id="content-cases">
      <motion.header
        className="content-cases-intro"
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>CONTENT &amp; SOCIAL</span>
        <h2>内容与<br />账号案例</h2>
        <div className="content-cases-intro-note">
          <strong>这里展示的不是品牌 Campaign，而是我在内容生产、账号运营与商业内容落地上的实际能力。</strong>
        </div>
      </motion.header>

      <div className="content-case-marquee" aria-hidden="true">
        <div>
          <span>HOTSPOT INSIGHT</span><i>✦</i><span>ACCOUNT STRATEGY</span><i>✦</i><span>COMMERCIAL CONTENT</span><i>✦</i>
          <span>HOTSPOT INSIGHT</span><i>✦</i><span>ACCOUNT STRATEGY</span><i>✦</i><span>COMMERCIAL CONTENT</span><i>✦</i>
        </div>
      </div>

      <motion.article className="content-case-chapter growth-chapter" {...chapterReveal}>
        <b className="content-case-chapter-index" aria-hidden="true">01</b>
        <header className="content-case-chapter-heading">
          <span>CONTENT GROWTH</span>
          <h3>娱乐账号内容增长</h3>
          <strong>曾负责「会火大明星」「娱乐喵呜酱」等头部娱乐账号的日常内容运营，完成从热点判断、选题策划、脚本撰写到素材组织、发布及数据复盘的完整内容链路。</strong>
        </header>

        <div className="content-case-metrics growth-metrics">
          {growthMetrics.map(([value, label], index) => (
            <motion.div key={label} whileHover={{ y: -7 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className={`metric-${index + 1}`}>
              <strong>{value}</strong><span>{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="content-case-work-grid">
          {contentWork.map(([title, copy], index) => (
            <motion.article key={title} whileHover={{ y: -8, rotate: index % 2 ? 0.35 : -0.35 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <span>0{index + 1}</span><h4>{title}</h4><p>{copy}</p>
            </motion.article>
          ))}
        </div>

        <div className="editorial-case-grid">
          {editorialCases.map((item) => (
            <motion.article key={item.number} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}>
              <span>{item.number} / {item.type}</span>
              <h4>{item.title}</h4>
              <div className="content-case-tags">{item.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </motion.article>

      <motion.article className="content-case-chapter strategy-chapter" {...chapterReveal}>
        <b className="content-case-chapter-index" aria-hidden="true">02</b>
        <header className="content-case-chapter-heading">
          <span>ACCOUNT STRATEGY</span>
          <h3>科技达人账号运营</h3>
          <strong>负责多个泛科技达人账号的内容统筹，覆盖 3C、汽车、AI、家电、机器人、App 等领域。</strong>
        </header>

        <div className="content-case-metrics strategy-metrics">
          {[["3个", "科技达人账号统筹"], ["10+条", "高表现内容"], ["800万+", "单条最高播放"], ["5000万+", "累计内容播放"]].map(([value, label]) => (
            <motion.div key={label} whileHover={{ y: -7 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
              <strong>{value}</strong><span>{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="account-strategy-list">
          {technologyAccounts.map((account) => (
            <motion.article key={account.number} whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 250, damping: 24 }}>
              <span>{account.number}</span>
              <div className="account-strategy-title"><small>{account.position}</small><h4>{account.name}</h4></div>
              <p>{account.profile}</p>
              <div className="content-case-tags">{account.directions.map((item) => <i key={item}>{item}</i>)}</div>
              <strong>{account.value}</strong>
            </motion.article>
          ))}
        </div>
      </motion.article>

      <motion.article className="content-case-chapter commercial-chapter" {...chapterReveal}>
        <b className="content-case-chapter-index" aria-hidden="true">03</b>
        <header className="content-case-chapter-heading">
          <span>COMMERCIAL CONTENT</span>
          <h3>商务爆款内容精选</h3>
          <strong>除了独立负责的品牌营销项目外，我也长期承接品牌商务短视频需求，结合发布账号的内容调性完成具体内容落地。</strong>
        </header>

        <div className="commercial-step-grid">
          {commercialSteps.map(([number, title, copy]) => (
            <motion.article key={number} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <span>{number}</span><h4>{title}</h4><p>{copy}</p>
            </motion.article>
          ))}
        </div>

        <blockquote>
          <span>我更关注的不是“把广告做完”</span>
          <strong>而是在品牌要求已经确定的情况下，如何让用户依然愿意看这条视频。</strong>
          <p>重点处理品牌信息与内容节奏、品牌露出位置、账号原有表达方式、开头广告感、叙事完整性，以及用户继续观看的理由。</p>
        </blockquote>

        <div className="commercial-case-grid">
          {commercialCases.map((item) => (
            <motion.article key={item.number} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}>
              <div><span>作品 {item.number}</span><i>{item.type}</i></div>
              <h4>{item.brand}</h4>
              <dl>
                <div><dt>事件背景</dt><dd>{item.background}</dd></div>
                <div><dt>内容处理</dt><dd>{item.treatment}</dd></div>
                <div><dt>我的职责</dt><dd>内容切角｜脚本撰写｜素材组织｜成片制作</dd></div>
              </dl>
              <div className="commercial-results">{item.results.map((result) => <strong key={result}>{result}</strong>)}</div>
            </motion.article>
          ))}
        </div>
      </motion.article>

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
