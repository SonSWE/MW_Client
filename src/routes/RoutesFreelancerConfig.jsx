import { CONTRACT } from "../pages/Freelancer/Contract/config";
import { DASHBOARD } from "../pages/Freelancer/Dashboard/config";
import { DETAILOFFER } from "../pages/Freelancer/DetailOffer/config";
import { DETAILPROPOSAL } from "../pages/Freelancer/DetailProposal/config";
import { FINDWORKADVANCED } from "../pages/Freelancer/FindWorkAdvanced/config";
import { PROPOSAL } from "../pages/Freelancer/Proposal/config";
import { SAVEDJOB } from "../pages/Freelancer/SavedJob/config";
import { SUBMITPROPOSAL } from "../pages/Freelancer/SubmitProposal/config";

export const RoutesFreelancerConfig = [
  {
    DisplayOnMenu: 1,
    url: "/tim-viec",
    ComponentConfig: DASHBOARD,
  },
  {
    DisplayOnMenu: 1,
    url: "/cong-viec-da-luu",
    ComponentConfig: SAVEDJOB,
  },
  {
    DisplayOnMenu: 1,
    url: "/de-xuat-cong-viec",
    ComponentConfig: PROPOSAL,
  },
  {
    DisplayOnMenu: 1,
    url: "/tim-viec-nang-cao",
    ComponentConfig: FINDWORKADVANCED,
  },
  {
    DisplayOnMenu: 1,
    url: "/gui-de-xuat",
    ComponentConfig: SUBMITPROPOSAL,
  },
  {
    DisplayOnMenu: 1,
    url: "/chi-tiet-de-xuat",
    ComponentConfig: DETAILPROPOSAL,
  },
  {
    DisplayOnMenu: 1,
    url: "/hop-dong",
    ComponentConfig: CONTRACT,
  },
  {
    DisplayOnMenu: 1,
    url: "/xac-nhan-hop-dong",
    ComponentConfig: DETAILOFFER,
  },
];
