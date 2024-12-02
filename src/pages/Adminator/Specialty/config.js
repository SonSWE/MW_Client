import LayoutManagement from "../../../components/layout/LayoutManagement";
import { FormSpecialty } from "../../../const/FormSpecialty";

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
    field: FormSpecialty.SpecialtyId,
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
    field: FormSpecialty.Name,
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
  { key: FormSpecialty.SpecialtyId, operator: "=" },
  { key: FormSpecialty.Name, operator: "=" },
];

export const SPECIALTY = {
  pageLayout: LayoutManagement,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      InputItems,
      InputItemsSearch,
    },
    dataGrid: {
      recordKey: FormSpecialty.SpecialtyId,
      searchCode: "SPECIALTY",
      buttonConfig: {
        ...CRUD_ButtonConfig,
      },
      columnDefs: columnDefs,
      searchConfig: SearchConfig,
    },
    functionId: "SPECIALTY",
  },
};
