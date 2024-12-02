
import { JOB } from "../pages/Adminator/Job/config";
import { SKILL } from "../pages/Adminator/Skill/config";
import { SPECIALTY } from "../pages/Adminator/Specialty/config";
import { SYSPARAM } from "../pages/Adminator/SysParam/config";
import { SYSTEMCODE } from "../pages/Adminator/SystemCode/config";

export const RoutesAdminConfig = [
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
];
