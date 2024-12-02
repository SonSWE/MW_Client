import LayoutManagement from "../../components/layout/LayoutManagement";
import { CONST_CONTROL_TYPE } from "../../const/FormConst";
import { CRUD_ButtonConfig } from "../../const/LayoutConst";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";
import InputItemsSearch from "./InputItemsSearch";

export const columnDefs = [
  {
    field: "no",
    headerName: "No",

    dataType: "INT",
    align: "left",
    fixed: "left",
    position: 1,
    width: 80,
    sortable: "N",
    hasHyperlink: "",
    hyperlink: "",
    hyperlinkParams: [],
    display: true,
    sorter: false,
    dataIndex: "no",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    field: "systemCodeId",

    headerName: "System Code Id",

    dataType: "",
    align: "left",
    fixed: "left",
    position: 2,
    width: 160,
    sortable: "Y",
    hasHyperlink: "",
    hyperlink: "",
    hyperlinkParams: [],
    display: true,
    sorter: {
      multiple: 1,
    },

    ellipsis: {
      showTitle: false,
    },
  },
  {
    field: "name",

    headerName: "Name",

    dataType: "",
    align: "left",
    fixed: "",
    position: 6,
    width: 180,
    sortable: "Y",
    hasHyperlink: "",
    hyperlink: "",
    hyperlinkParams: [],
    display: true,
    sorter: {
      multiple: 1,
    },
    dataIndex: "name",
    ellipsis: {
      showTitle: false,
    },
  },
];

const SearchConfig = [
  { key: "systemCodeId", operator: "=" },
  { key: "name", operator: "=" },
  // { key: "userType", type: CONST_CONTROL_TYPE.ComboxMultiple, operator: "=" },
];

export const JOB = {
  pageLayout: LayoutManagement,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      InputItems,
      InputItemsSearch,
    },
    header: {
      controller: "job",
      // disableRule: [
      //   {
      //     field: "recordStatus",
      //     values: ["PD", "D"],
      //   },
      // ],
    },
    dataGrid: {
      recordKey: "SystemCodeId",
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
