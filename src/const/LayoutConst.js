import { faCircleInfo, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { CONST_FORM_ACTION } from "./FormConst";

export const TYPE_ACTION = {
  BUTTON_ACTION_CLICK: "BUTTON_ACTION_CLICK",
  BUTTON_SAVE_CLICK: "BUTTON_SAVE_CLICK",
  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_MODAL: "OPEN_MODAL",
  SAVE_DATA_SUCCESS: "SAVE_DATA_SUCCESS",
  SAVE_DATA_ERROR: "SAVE_DATA_ERROR",
  SEARCH_DATA: "SEARCH_DATA",
};

//defaut config button
export const CRUD_ButtonConfig = {
  [CONST_FORM_ACTION.Detail]: {
    name: "Chi tiết",
    isShow: true,
    icon: faCircleInfo,
  },
  [CONST_FORM_ACTION.Update]: {
    name: "Cập nhật",
    icon: faPen,
    isShow: true,
    enableRules: [],
  },
  [CONST_FORM_ACTION.Delete]: {
    name: "Xóa",
    icon: faTrashCan,
    isShow: true,
    style: { color: "#FD4D4B" },
  },
};

export const CONST_USER_TYPE = {
  Admin: "ADMIN",
  User: "USER",
};

export const CONST_LOGIN_TYPE = {
  Client: "C",
  Freelancer: "F",
};
