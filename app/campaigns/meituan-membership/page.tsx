import { CampaignDetailPage } from "../CampaignDetailPage";
import { getCampaign } from "../campaignData";

export default function MeituanMembershipCampaignPage() {
  return <CampaignDetailPage campaign={getCampaign("meituan-membership")} />;
}
