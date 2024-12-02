import LayoutManagement from "../../../components/layout/LayoutManagement";
import { CONST_FORM_ACTION } from "../../../const/FormConst";
import { FormSkill } from "../../../const/FormSkill";

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
    field: FormSkill.SkillId,
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
    field: FormSkill.Name,
    headerName: "Tên",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormSkill.Description,
    headerName: "Mô tả",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
];

const SearchConfig = [
  { key: FormSkill.SkillId, operator: "=" },
  { key: FormSkill.Name, operator: "=" },
  { key: FormSkill.Description, operator: "=" },
];

export const SKILL = {
  pageLayout: LayoutManagement,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      InputItems,
      InputItemsSearch,
    },
    dataGrid: {
      recordKey: FormSkill.SkillId,
      searchCode: "SKILL",
      buttonConfig: {
        ...CRUD_ButtonConfig,
      },
      columnDefs: columnDefs,
      searchConfig: SearchConfig,
    },
    functionId: "SKILL",
  },
};
