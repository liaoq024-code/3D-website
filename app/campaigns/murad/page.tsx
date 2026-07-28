import { CampaignDetailPage } from "../CampaignDetailPage";
import { getCampaign } from "../campaignData";

export default function MuradCampaignPage() {
  return <CampaignDetailPage campaign={getCampaign("murad")} />;
}
