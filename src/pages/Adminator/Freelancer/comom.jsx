import DropdownCell from "../../../components/element/DropdownCell";
import { CONST_CONTROL_TYPE } from "../../../const/FormConst";
import { FormCertificate, FormEducation, FormWorkingHistory } from "../../../const/FormFreelancer";
import { FormProposal } from "../../../const/FormJob";
import { FormatType } from "../../../const/FornatType";
import { MapColumnsLine } from "../../../utils/datagridHelper";
import { getSystemCodeValues, isNullOrEmpty } from "../../../utils/utils";

export const columnProposal = (props) => {
  const { disabled, handleAddRowAsync, indexKey = "", systemCodes, TermType } = props || {};

  var columnList = [
    {
      headerName: "",
      field: "",
      lockPosition: "left",
      pinned: "left",
      editable: false,
      width: 50,
      filter: false,
      headerCheckboxSelection: !disabled,
      checkboxSelection: true,
      showDisabledCheckboxes: false,
      cellStyle: (params) => {
        return disabled ? { "pointer-events": "none" } : "";
      },
    },
    {
      headerName: "Mã đề xuất",
      field: FormProposal.ProposalId,
      editable: false,
      cellEditor: DropdownCell,
      pinned: "left",
    },
    {
      headerName: "Mã ứng viên",
      field: FormProposal.FreelancerId,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Combobox,
    },
    {
      headerName: "Trạng thái",
      field: FormProposal.Status,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Combobox,
      dataOptions: [...getSystemCodeValues(systemCodes, "PROPOSAL_STATUS").map((e) => ({}))],
    },
    {
      headerName: "Giá đầu thầu",
      field: FormProposal.Bid,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Number,
      formatType: FormatType.Number,
    },
    {
      headerName: "Phí dịch vụ",
      field: FormProposal.FeeService,
      editable: false,
    },
    {
      headerName: "Nhận thực tế",
      field: FormProposal.RealReceive,
      editable: true,
    },
    {
      headerName: "Mô tả chi tiết",
      field: FormProposal.CoverLetter,
      editable: true,
    },
    {
      headerName: "Tệp đính kèm",
      field: FormProposal.FileAttaches,
      editable: false,
    },
  ];

  return MapColumnsLine({
    columnList,
    keyName: indexKey,
    addRowAsync: handleAddRowAsync,
    fisrtEditKey: FormProposal.FreelancerId,
  });
};

export const columnWorkingHistory = (props) => {
  const { disabled, handleAddRowAsync, indexKey = "", systemCodes, TermType } = props || {};

  var columnList = [
    {
      headerName: "",
      field: "",
      lockPosition: "left",
      pinned: "left",
      editable: false,
      width: 50,
      filter: false,
      headerCheckboxSelection: !disabled,
      checkboxSelection: true,
      showDisabledCheckboxes: false,
      cellStyle: (params) => {
        return disabled ? { "pointer-events": "none" } : "";
      },
    },
    {
      headerName: "Mã",
      field: FormWorkingHistory.WorkingHistoryId,
      editable: false,
      pinned: "left",
    },
    {
      headerName: "Tên công ty",
      field: FormWorkingHistory.CompanyName,
      editable: true,
      cellEditor: DropdownCell,
    },
    {
      headerName: "Thành phố",
      field: FormWorkingHistory.CityId,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Combobox,
      dataOptions: [
        ...getSystemCodeValues(systemCodes, "PROPOSAL_STATUS").map((e) => ({
          value: e.value,
          label: <span>{e.description}</span>,
        })),
      ],
    },
    {
      headerName: "Ngày bắt đầu",
      field: FormWorkingHistory.FromDate,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Date,
    },
    {
      headerName: "Ngày kết thúc",
      field: FormWorkingHistory.EndDate,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Date,
    },
    {
      headerName: "Vẫn đang làm việc",
      field: FormWorkingHistory.IsCurrentlyWorkingHere,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Combobox,
      dataOptions: [
        ...getSystemCodeValues(systemCodes, "SYS_YN").map((e) => ({
          value: e.value,
          label: e.description,
        })),
      ],

    },
    {
      headerName: "Mô tả thêm",
      field: FormWorkingHistory.Description,
      editable: true,
    },
  ];

  return MapColumnsLine({
    columnList,
    keyName: indexKey,
    addRowAsync: handleAddRowAsync,
    fisrtEditKey: FormWorkingHistory.CompanyName,
  });
};

export const columnEducation = (props) => {
  const { disabled, handleAddRowAsync, indexKey = "", systemCodes, TermType } = props || {};

  var columnList = [
    {
      headerName: "",
      field: "",
      lockPosition: "left",
      pinned: "left",
      editable: false,
      width: 50,
      filter: false,
      headerCheckboxSelection: !disabled,
      checkboxSelection: true,
      showDisabledCheckboxes: false,
      cellStyle: (params) => {
        return disabled ? { "pointer-events": "none" } : "";
      },
    },
    {
      headerName: "Mã",
      field: FormEducation.EducationId,
      editable: false,
      pinned: "left",
    },
    {
      headerName: "Tên trường",
      field: FormEducation.SchoolName,
      editable: true,
      cellEditor: DropdownCell,
    },
    {
      headerName: "Bằng cấp",
      field: FormEducation.Degree,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Combobox,
      dataOptions: [...getSystemCodeValues(systemCodes, "PROPOSAL_STATUS").map((e) => ({}))],
    },
    {
      headerName: "Chuyên ngành",
      field: FormEducation.Major,
      editable: true,
      cellEditor: DropdownCell,
    },
    {
      headerName: "Ngày bắt đầu",
      field: FormWorkingHistory.FromDate,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Date,
    },
    {
      headerName: "Ngày kết thúc",
      field: FormWorkingHistory.EndDate,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Date,
    },
    {
      headerName: "Mô tả thêm",
      field: FormWorkingHistory.Description,
      editable: true,
    },
  ];

  return MapColumnsLine({
    columnList,
    keyName: indexKey,
    addRowAsync: handleAddRowAsync,
    fisrtEditKey: FormWorkingHistory.CompanyName,
  });
};

export const columnCertificate = (props) => {
  const { disabled, handleAddRowAsync, indexKey = "", systemCodes, TermType } = props || {};

  var columnList = [
    {
      headerName: "",
      field: "",
      lockPosition: "left",
      pinned: "left",
      editable: false,
      width: 50,
      filter: false,
      headerCheckboxSelection: !disabled,
      checkboxSelection: true,
      showDisabledCheckboxes: false,
      cellStyle: (params) => {
        return disabled ? { "pointer-events": "none" } : "";
      },
    },
    {
      headerName: "Mã",
      field: FormCertificate.CertificateId,
      editable: false,
      pinned: "left",
    },
    {
      headerName: "Tên chứng chỉ",
      field: FormCertificate.Name,
      editable: true,
      cellEditor: DropdownCell,
    },
    {
      headerName: "File đính kèm",
      field: FormCertificate.FileAttach,
      editable: true,
    },
  ];

  return MapColumnsLine({
    columnList,
    keyName: indexKey,
    addRowAsync: handleAddRowAsync,
    fisrtEditKey: FormCertificate.Name,
  });
};
