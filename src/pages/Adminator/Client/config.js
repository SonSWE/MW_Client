import LayoutManagement from "../../../components/layout/LayoutManagement";
import { FormClient } from "../../../const/FormClient";

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
    field: FormClient.ClientId,
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
    field: FormClient.StatusText,
    headerName: "Trạng thái",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormClient.Name,
    headerName: "Tên",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormClient.Email,
    headerName: "Email",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormClient.SpecialtyIdText,
    headerName: "Chuyên ngành",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormClient.PeopleInCompanyText,
    headerName: "Số lượng nhân sự",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormClient.TagLine,
    headerName: "Khẩu hiệu",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormClient.Owner,
    headerName: "Người sở hữu",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormClient.PhoneNumber,
    headerName: "Số điện thoại",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormClient.Address,
    headerName: "Địa chỉ",
    align: "left",
    width: 280,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
];

const SearchConfig = [
  { key: FormClient.ClientId, operator: "=" },
  { key: FormClient.Name, operator: "=" },
  { key: FormClient.Email, operator: "=" },
  { key: FormClient.Website, operator: "=" },
  { key: FormClient.SpecialtyId, operator: "=" },
  { key: FormClient.PeopleInCompany, operator: "=" },
  { key: FormClient.TagLine, operator: "=" },
  { key: FormClient.Description, operator: "=" },
  { key: FormClient.Owner, operator: "=" },
  { key: FormClient.PhoneNumber, operator: "=" },
  { key: FormClient.Address, operator: "=" },
];

export const CLIENT = {
  pageLayout: LayoutManagement,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      InputItems,
      InputItemsSearch,
    },
    dataGrid: {
      recordKey: FormClient.ClientId,
      searchCode: "CLIENT",
      buttonConfig: {
        ...CRUD_ButtonConfig,
      },
      columnDefs: columnDefs,
      searchConfig: SearchConfig,
    },
    functionId: "CLIENT",
  },
};
