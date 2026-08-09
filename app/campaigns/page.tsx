import {
  InnerHero,
  InnerNav,
  PageLink,
} from "../components/InnerPageShell";

const projectLinks = [
  { label: "BOP", href: "/campaigns/bop" },
  { label: "美团团购", href: "/campaigns/meituan-xiaozhan" },
  { label: "美团会员日", href: "/campaigns/meituan-membership" },
  { label: "Murad", href: "/campaigns/murad" },
] as const;

export default function CampaignsPage() {
  return (
    <main className="inner-page campaigns-page campaigns-selection-page">
      <InnerNav />
      <InnerHero
        eyebrow="CAMPAIGNS / SELECTED WORK"
        title={<>选择项目<br /><em>进入完成案例</em></>}
        intro="选择一个项目，进入对应的完整案例页面。"
      >
        <div className="inner-hero-actions campaign-project-actions">
          {projectLinks.map((project, index) => (
            <PageLink
              key={project.href}
              href={project.href}
              tone={index === 0 ? "acid" : "light"}
            >
              {project.label}
            </PageLink>
          ))}
        </div>
      </InnerHero>
    </main>
  );
}
