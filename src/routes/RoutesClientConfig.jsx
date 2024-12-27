import { POSTJOB } from "../pages/Client/PostJob/config";
import { DASHBOARD } from "../pages/Client/Dashboard/config";
import { DETAILOFFER } from "../pages/Freelancer/DetailOffer/config";
import { DETAILPROPOSAL } from "../pages/Freelancer/DetailProposal/config";
import { FINDWORKADVANCED } from "../pages/Freelancer/FindWorkAdvanced/config";
import { PROPOSAL } from "../pages/Freelancer/Proposal/config";
import { SAVEDJOB } from "../pages/Freelancer/SavedJob/config";
import { SUBMITPROPOSAL } from "../pages/Freelancer/SubmitProposal/config";
import { DETAILJOB } from "../pages/Client/DetailJob/config";
import { SENDOFFER } from "../pages/Client/SendOffer/config";
import { WALLET } from "../pages/Wallet/config";
import { ENDCONTRACT } from "../pages/Client/EndContract/config";
import { MESSENGER } from "../pages/Messenger/config";

export const RoutesClientConfig = [
  {
    DisplayOnMenu: 1,
    url: "/trang-chu",
    ComponentConfig: DASHBOARD,
  },
  {
    DisplayOnMenu: 1,
    url: "/tao-cong-viec",
    ComponentConfig: POSTJOB,
  },
  {
    DisplayOnMenu: 1,
    url: "/chi-tiet-cong-viec",
    ComponentConfig: DETAILJOB,
  },
  {
    DisplayOnMenu: 1,
    url: "/gui-yeu-cau",
    ComponentConfig: SENDOFFER,
  },
  {
    DisplayOnMenu: 1,
    url: "/ket-thuc-hop-dong",
    ComponentConfig: ENDCONTRACT,
  },
  {
    DisplayOnMenu: 1,
    url: "/vi-tien",
    ComponentConfig: WALLET,
  },
  {
    DisplayOnMenu: 1,
    url: "/tin-nhan",
    ComponentConfig: MESSENGER,
  },
];
