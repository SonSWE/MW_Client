import LayoutManagement from "../../../components/layout/LayoutManagement";
import { CONST_CONTROL_TYPE } from "../../../const/FormConst";
import { FormJob } from "../../../const/FormJob";
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
    field: FormJob.JobId,
    headerName: "Mã",
    align: "left",
    pinned: "left",
    width: 160,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormJob.Name,
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
  { key: FormJob.JobId, operator: "=" },
  { key: FormJob.Title, operator: "=" },
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
      quickSearchKey: FormJob.Title,
      recordKey: FormJob.JobId,
      searchCode: "JOB",
      buttonConfig: {
        ...CRUD_ButtonConfig,
      },
      columnDefs: columnDefs,
      searchConfig: SearchConfig,
    },
    functionId: "JOB",
  },
};
