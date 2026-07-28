import { CampaignDetailPage } from "../CampaignDetailPage";
import { getCampaign } from "../campaignData";

export default function MeituanXiaozhanCampaignPage() {
  return <CampaignDetailPage campaign={getCampaign("meituan-xiaozhan")} />;
}
