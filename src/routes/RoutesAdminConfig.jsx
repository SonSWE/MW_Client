
import { CLIENT } from "../pages/Adminator/Client/config";
import { DASHBOARD } from "../pages/Adminator/Dashboard/config";
import { FREELANCER } from "../pages/Adminator/Freelancer/config";
import { JOB } from "../pages/Adminator/Job/config";
import { SKILL } from "../pages/Adminator/Skill/config";
import { SPECIALTY } from "../pages/Adminator/Specialty/config";
import { SYSPARAM } from "../pages/Adminator/SysParam/config";
import { SYSTEMCODE } from "../pages/Adminator/SystemCode/config";
import { USER } from "../pages/Adminator/User/config";

export const RoutesAdminConfig = [
  {
    Function_Id: DASHBOARD.pageConfig.functionId,
    Function_Name: "Trang chủ",
    DisplayOnMenu: 1,
    checkRight: false,
    url: "/",
    ComponentConfig: DASHBOARD,
  },
  {
    Function_Id: SYSTEMCODE.pageConfig.functionId,
    Function_Name: "System Code",
    DisplayOnMenu: 1,
    checkRight: false,
    url: "/system-code",
    ComponentConfig: SYSTEMCODE,
  },
  {
    Function_Id: SYSPARAM.pageConfig.functionId,
    Function_Name: "Cấu hình tham số",
    DisplayOnMenu: 1,
    checkRight: false,
    url: "/sys-param",
    ComponentConfig: SYSPARAM,
  },


  {
    Function_Id: SKILL.pageConfig.functionId,
    Function_Name: "Kỹ năng",
    DisplayOnMenu: 1,
    checkRight: false,
    url: "/ky-nang",
    ComponentConfig: SKILL,
  },
  {
    Function_Id: SPECIALTY.pageConfig.functionId,
    Function_Name: "Chuyên môn",
    DisplayOnMenu: 1,
    checkRight: false,
    url: "/chuyen-mon",
    ComponentConfig: SPECIALTY,
  },
  {
    Function_Id: JOB.pageConfig.functionId,
    Function_Name: "Quản lý công việc",
    DisplayOnMenu: 1,
    checkRight: false,
    url: "/cong-viec",
    ComponentConfig: JOB,
  },

  {
    Function_Id: USER.pageConfig.functionId,
    Function_Name: "Tài khoản người dùng",
    DisplayOnMenu: 1,
    checkRight: false,
    url: "/tai-khoan",
    ComponentConfig: USER,
  },
  {
    Function_Id: FREELANCER.pageConfig.functionId,
    Function_Name: "Freelance",
    DisplayOnMenu: 1,
    checkRight: false,
    url: "/freelance",
    ComponentConfig: FREELANCER,
  },
  {
    Function_Id: CLIENT.pageConfig.functionId,
    Function_Name: "Khách hàng",
    DisplayOnMenu: 1,
    checkRight: false,
    url: "/khach-hang",
    ComponentConfig: CLIENT,
  },
];
