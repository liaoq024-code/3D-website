import type { Metadata } from "next";
import { ContentCasesLanding } from "../components/ContentCasesLanding";

export const metadata: Metadata = {
  title: "内容精选案例｜廖沁",
  description: "平台热点、明星事件、影视综艺衍生与自然流商业植入视频案例。",
};

export default function ContentCasesPage() {
  return <ContentCasesLanding />;
}
