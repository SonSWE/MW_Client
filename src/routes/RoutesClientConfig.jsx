import { POSTJOB } from "../pages/Client/PostJob/config";
import { DASHBOARD } from "../pages/Client/Dashboard/config";
import { DETAILJOB } from "../pages/Client/DetailJob/config";
import { SENDOFFER } from "../pages/Client/SendOffer/config";
import { WALLET } from "../pages/Wallet/config";
import { FEEDBACKCONTRACT } from "../pages/Client/FeedbackContract/config";
import { MESSENGER } from "../pages/Messenger/config";
import { VERIFYEKYC } from "../pages/VerifyEKYC/config";
import { FREELANCERINFORMATIONVIEW } from "../pages/Freelancer/FreelancerInfomationView/config";

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
    ComponentConfig: FEEDBACKCONTRACT,
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
  {
    DisplayOnMenu: 0,
    url: "/xac-thuc-tai-khoan",
    ComponentConfig: VERIFYEKYC,
  },
  {
    DisplayOnMenu: 1,
    url: "/xem-thong-tin-ca-nhan",
    ComponentConfig: FREELANCERINFORMATIONVIEW,
  },
];
