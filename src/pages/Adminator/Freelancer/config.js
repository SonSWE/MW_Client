import LayoutManagement from "../../../components/layout/LayoutManagement";
import { CONST_CONTROL_TYPE } from "../../../const/FormConst";
import { FormFreelancer } from "../../../const/FormFreelancer";
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
    field: FormFreelancer.Avatar,
    headerName: "Ảnh đại diện",
    align: "left",
    pinned: "left",
    width: 160,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormFreelancer.FreelancerId,
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
    field: FormFreelancer.Name,
    headerName: "Tên",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormFreelancer.Email,
    headerName: "Email",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormFreelancer.PhoneNumber,
    headerName: "SĐT",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormFreelancer.StreetAddress,
    headerName: "Vị trí",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormFreelancer.CityIdText,
    headerName: "Quốc gia",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormFreelancer.DateOfBirth,
    headerName: "Ngày sinh",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },

  {
    field: FormFreelancer.LevelIdText,
    headerName: "Trình độ",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
  {
    field: FormFreelancer.HourlyRate,
    headerName: "Thu nhập mỗi giờ",
    align: "left",
    width: 180,
    sortable: true,
    sorter: {
      multiple: 1,
    },
  },
];

const SearchConfig = [
  { key: FormFreelancer.FreelancerId, operator: "=" },
  { key: FormFreelancer.Email, operator: "=" },
  { key: FormFreelancer.PhoneNumber, operator: "=" },
  { key: FormFreelancer.StreetAddress, operator: "=" },
  { key: FormFreelancer.CityId, operator: "=" },
  { key: FormFreelancer.DateOfBirth, operator: "=" },
  { key: FormFreelancer.LevelId, operator: "=" },
  { key: FormFreelancer.HourlyRate, operator: "=" },
];

export const FREELANCER = {
  pageLayout: LayoutManagement,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      InputItems,
      InputItemsSearch,
    },
    header: {
      controller: "freelancer",
      // disableRule: [
      //   {
      //     field: "recordStatus",
      //     values: ["PD", "D"],
      //   },
      // ],
    },
    dataGrid: {
      recordKey: FormFreelancer.FreelancerId,
      searchCode: "FREELANCER",
      buttonConfig: {
        ...CRUD_ButtonConfig,
      },
      columnDefs: columnDefs,
      searchConfig: SearchConfig,
    },
    functionId: "FREELANCER",
  },
};
