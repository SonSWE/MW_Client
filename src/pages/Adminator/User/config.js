import LayoutManagement from "../../../components/layout/LayoutManagement";
import { CONST_FORM_ACTION } from "../../../const/FormConst";
import { FormUser } from "../../../const/FormUser";

import { CRUD_ButtonConfig } from "../../../const/LayoutConst";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";
import InputItemsSearch from "./InputItemsSearch";

export const columnDefs = [
  {
    field: "no",
    headerName: "STT",
    dataType: "INT",
    align: "left",
    pinned: "left",
    width: 80,
    sortable: false,
  },
  {
    field: FormUser.UserName,
    headerName: "Tài khoản",
    align: "left",
    pinned: "left",
    width: 160,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormUser.StatusText,
    headerName: "Trạng thái",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormUser.Name,
    headerName: "Tên",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormUser.UserTypeText,
    headerName: "Loại tài khoản",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormUser.FailedLogonCount,
    headerName: "Số lần đăng nhập sai",
    align: "left",
    width: 380,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormUser.MustChangePasswordAtNextLogonText,
    headerName: "Đổi mật khẩu vào lần đăng nhập sau",
    align: "left",
    width: 380,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormUser.AccountIsLockedOutText,
    headerName: "Tài khoản bị khóa",
    align: "left",
    width: 380,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormUser.LastTriedOrLogonTime,
    headerName: "Thời gian đăng nhập gần nhất",
    align: "left",
    width: 380,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormUser.LastChangePasswordOn,
    headerName: "Thời gian đổi mật khẩu gần nhất",
    align: "left",
    width: 380,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
];

const SearchConfig = [
  { key: FormUser.UserName, operator: "=" },
  { key: FormUser.Name, operator: "=" },
  { key: FormUser.Status, operator: "=" },
  { key: FormUser.EnableLogon, operator: "=" },
  { key: FormUser.FailedLogonCount, operator: "=" },
  { key: FormUser.MustChangePasswordAtNextLogon, operator: "=" },
  { key: FormUser.AccountIsLockedOut, operator: "=" },
  { key: FormUser.LastChangePasswordOn, operator: "=" },
];

export const USER = {
  pageLayout: LayoutManagement,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      InputItems,
      InputItemsSearch,
    },
    header: {
      
    },
    dataGrid: {
      recordKey: FormUser.UserName,
      searchCode: "USER",
      buttonConfig: {
        ...CRUD_ButtonConfig,
      },
      columnDefs: columnDefs,
      searchConfig: SearchConfig,
    },
    functionId: "USER",
  },
};
