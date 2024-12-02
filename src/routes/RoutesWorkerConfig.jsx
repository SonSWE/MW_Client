import { FINDWORK } from "../pages/Worker/FindWork/config";
import { FINDWORKADVANCED } from "../pages/Worker/FindWorkAdvanced/config";
import { SAVEDJOBS } from "../pages/Worker/SavedJobs/config";
import { SUBMITPROPOSAL } from "../pages/Worker/SubmitProposal/config";

export const RoutesWorkerConfig = [
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
    ComponentConfig: FINDWORK,
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
