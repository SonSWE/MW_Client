import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import LayoutManagement from "../../../components/layout/LayoutManagement";
import { CONST_CONTROL_TYPE, CONST_FORM_ACTION } from "../../../const/FormConst";
import { FormContract } from "../../../const/FormContract";
import { FormSysParam } from "../../../const/FormSysParam";

import { CRUD_ButtonConfig } from "../../../const/LayoutConst";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";
import InputItemsSearch from "./InputItemsSearch";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
    field: FormContract.ContractId,
    headerName: "Mã hợp đồng",
    align: "left",
    pinned: "left",
    width: 160,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormContract.JobTitle,
    headerName: "Tiêu đề CV",
    align: "left",
    pinned: "left",
    width: 160,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormContract.StatusText,
    headerName: "Trạng thái",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormContract.EndReasonText,
    headerName: "Lý do kết thúc",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormContract.EndReasonRemark,
    headerName: "Mô tả thêm",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
];

const SearchConfig = [
  { key: FormContract.ContractId, operator: "=" },
  { key: FormContract.JobTitle, operator: "=" },
  { key: FormContract.Status, operator: "=", control: CONST_CONTROL_TYPE.ComboxMultiple },
];

export const CONTRACTCOMPLAINT = {
  pageLayout: LayoutManagement,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      InputItems,
      InputItemsSearch,
    },
    header: {
      controller: "CONTRACTCOMPLAINT",
    },
    dataGrid: {
      recordKey: FormContract.ContractId,
      quickSearchKey: FormContract.JobTitle,
      searchCode: "CONTRACTCOMPLAINT",
      buttonConfig: {
        // ...CRUD_ButtonConfig,
        [CONST_FORM_ACTION.Accept]: {
          name: "Đồng ý",
          isShow: true,
          icon: faCheckCircle,
        },
        [CONST_FORM_ACTION.Reject]: {
          name: "Từ chối",
          isShow: true,
          icon: faXmark,
          style: { color: "#FD4D4B" },
        },
      },
      columnDefs: columnDefs,
      searchConfig: SearchConfig,
    },
    functionId: "CONTRACTCOMPLAINT",
  },
};
