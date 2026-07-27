import { Download, Mail } from "lucide-react";
import {
  InnerFooter,
  InnerHero,
  InnerNav,
  PageLink,
} from "../components/InnerPageShell";

export default function ContactPage() {
  return (
    <main className="inner-page standalone-contact-page">
      <InnerNav />
      <InnerHero
        eyebrow="CONTACT / LET'S CONNECT"
        title={<>一起聊聊<br /><em>内容与品牌。</em></>}
        intro="我正在关注品牌内容营销、社交媒体营销、品牌传播策划及内容策略相关机会。如果你希望寻找一名既理解平台内容，又能够参与品牌策略与项目落地的合作伙伴，欢迎与我联系。"
      >
        <div className="inner-hero-actions">
          <a className="page-link acid" href="mailto:1430943020@qq.com">
            <span>发送邮件</span><Mail aria-hidden="true" />
          </a>
          <a
            className="page-link light"
            href="/廖沁-品牌内容营销与内容策略-CV.pdf"
            download
          >
            <span>下载简历</span><Download aria-hidden="true" />
          </a>
        </div>
      </InnerHero>

      <section className="contact-detail-section">
        <div className="contact-detail-copy">
          <span className="inner-section-label">WORK WITH ME / 联系方式</span>
          <h2>让品牌想说的话，<br />变成用户愿意看的内容。</h2>
          <div className="contact-method-list">
            <a href="mailto:1430943020@qq.com">
              <span>EMAIL</span>
              <strong>1430943020@qq.com</strong>
              <Mail aria-hidden="true" />
            </a>
            <div>
              <span>MOBILE</span>
              <strong>完整号码请查看简历</strong>
              <Download aria-hidden="true" />
            </div>
          </div>
          <p className="contact-privacy-note">
            为保护个人隐私，网站公开版不直接展示完整手机号；可通过邮件或微信联系，
            完整联系方式也已收录在简历中。
          </p>
        </div>

        <div className="contact-qr-card">
          <span>WECHAT / 扫码联系</span>
          <div><img src="/wechat-qr.jpg" alt="廖沁的微信二维码" /></div>
          <strong>添加时可备注：作品集</strong>
        </div>
      </section>

      <section className="contact-interest-section">
        <span className="inner-section-label">CURRENT FOCUS / 关注方向</span>
        <div>
          <strong>品牌内容营销</strong>
          <strong>社交媒体营销</strong>
          <strong>品牌传播策划</strong>
          <strong>内容策略</strong>
          <strong>达人及账号营销</strong>
          <strong>Campaign 项目统筹</strong>
        </div>
      </section>

      <section className="contact-route-section">
        <article>
          <span>01 / CAMPAIGNS</span>
          <h2>先看看我如何推进<br />复杂品牌项目。</h2>
          <PageLink href="/campaigns">查看品牌项目</PageLink>
        </article>
        <article>
          <span>02 / CONTENT</span>
          <h2>再看看我如何判断<br />用户愿意看的内容。</h2>
          <PageLink href="/content-social">查看内容经验</PageLink>
        </article>
      </section>
      <InnerFooter />
    </main>
  );
}

