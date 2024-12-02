import LayoutManagement from "../../../components/layout/LayoutManagement";
import { CONST_FORM_ACTION } from "../../../const/FormConst";
import { FormSysParam } from "../../../const/FormSysParam";

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
    field: FormSysParam.SysParamId,
    headerName: "Mã tham số",
    align: "left",
    pinned: "left",
    width: 160,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormSysParam.StatusText,
    headerName: "Trạng thái",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormSysParam.Name,
    headerName: "Tên",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormSysParam.PValue,
    headerName: "Giá trị",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormSysParam.Content,
    headerName: "Nội dung",
    align: "left",
    width: 380,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
];

const SearchConfig = [
  { key: FormSysParam.SysParamId, operator: "=" },
  { key: FormSysParam.Name, operator: "=" },
  { key: FormSysParam.PValue, operator: "=" },
  { key: FormSysParam.Content, operator: "=" },
];

export const SYSPARAM = {
  pageLayout: LayoutManagement,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      InputItems,
      InputItemsSearch,
    },
    header: {
      controller: "sysparam",
    },
    dataGrid: {
      recordKey: FormSysParam.SysParamId,
      searchCode: "SYSPARAM",
      buttonConfig: {
        ...CRUD_ButtonConfig,
        [CONST_FORM_ACTION.Delete]: {
          isShow: false,
        },
      },
      columnDefs: columnDefs,
      searchConfig: SearchConfig,
    },
    functionId: "SYSPARAM",
  },
};
