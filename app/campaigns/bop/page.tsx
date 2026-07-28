import { CampaignDetailPage } from "../CampaignDetailPage";
import { getCampaign } from "../campaignData";

export default function BopCampaignPage() {
  return <CampaignDetailPage campaign={getCampaign("bop")} />;
}
