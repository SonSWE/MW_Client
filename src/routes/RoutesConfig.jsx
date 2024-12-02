//view
import Dashboard from "../pages/Dashboard/Index";


//layout
import LayoutLeftSideBar from "../components/layout/LayoutLeftSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleWater,
  faHome,
  faIdBadge,
  faListCheck,
  faMagnifyingGlass,
  faMoneyBill,
  faStore,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { User_Type_Enum } from "../utils/constData";

export const RoutersConfig = [
  {
    Function_Id: "DASHBOARD",
    Function_Name: "Trang chủ",
    icon: <FontAwesomeIcon icon={faHome} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/",
    FunctionType: [User_Type_Enum.Admin, User_Type_Enum.Staff],
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Dashboard },
  },
];
