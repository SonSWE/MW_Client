import { DASHBOARD } from "../pages/Freelancer/Dashboard/config";
import { FINDWORKADVANCED } from "../pages/Freelancer/FindWorkAdvanced/config";
import { SAVEDJOBS } from "../pages/Freelancer/SavedJobs/config";
import { SUBMITPROPOSAL } from "../pages/Freelancer/SubmitProposal/config";

export const RoutesFreelancerConfig = [
  // {
  //   Function_Id: "DASHBOARD",
  //   Function_Name: "Trang chủ",
  //   icon: <FontAwesomeIcon icon={faHome} />,
  //   DisplayOnMenu: 1,
  //   checkRight: false,
  //   url: "/",
  //   pageLayout: LayoutLeftSideBar,
  //   pageContent: { component: Dashboard },
  // },
  {
    DisplayOnMenu: 1,
    url: "/tim-viec",
    ComponentConfig: DASHBOARD,
  },
  {
    DisplayOnMenu: 1,
    url: "/cong-viec-da-luu",
    ComponentConfig: SAVEDJOBS,
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
];
