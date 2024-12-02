import LayoutManagement from "../../../components/layout/LayoutManagement";
import { CONST_CONTROL_TYPE } from "../../../const/FormConst";
import { FormSystemCode } from "../../../const/FormSystemCode";
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
    field: FormSystemCode.SystemCodeId,
    headerName: "System Code ID",
    align: "left",
    pinned: "left",
    width: 160,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormSystemCode.Name,
    headerName: "Tên",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
];

const SearchConfig = [
  { key: FormSystemCode.SystemCodeId, operator: "=" },
  { key: FormSystemCode.Name, operator: "=" },
];

export const SYSTEMCODE = {
  pageLayout: LayoutManagement,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      InputItems,
      InputItemsSearch,
    },
    header: {
      controller: "systemcode",
      // disableRule: [
      //   {
      //     field: "recordStatus",
      //     values: ["PD", "D"],
      //   },
      // ],
    },
    dataGrid: {
      recordKey: FormSystemCode.SystemCodeId,
      searchCode: "SYSTEMCODE",
      buttonConfig: {
        ...CRUD_ButtonConfig,
      },
      columnDefs: columnDefs,
      searchConfig: SearchConfig,
    },
    functionId: "SYSTEMCODE",
  },
};
