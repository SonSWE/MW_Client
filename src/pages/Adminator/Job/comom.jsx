import DropdownCell from "../../../components/element/DropdownCell";
import { CONST_CONTROL_TYPE } from "../../../const/FormConst";
import { FormJobSkill, FormProposal } from "../../../const/FormJob";
import { FormatType } from "../../../const/FornatType";
import { MapColumnsLine } from "../../../utils/datagridHelper";
import { getSystemCodeValues, isNullOrEmpty } from "../../../utils/utils";

export const columnProposal = (props) => {
  const { disabled, handleAddRowAsync, indexKey = "", systemCodes } = props || {};

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
      editable: true,
      cellEditor: DropdownCell,
      pinned: "left",
    },
    {
      headerName: "Giá đầu đầu",
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
      editable: false,
    },
    {
      headerName: "Thời gian dự tính",
      field: FormProposal.TargetTime,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Combobox,
      dataOptions: [
        ...getSystemCodeValues(systemCodes, "PROPOSAL_TARGET_TIME")?.map((e) => ({
          value: e.value,
          label: <span>{e.description}</span>,
        })),
      ],
      cellRenderer: (param) => {
        return param?.[FormProposal.TargetTimeText];
      },
    },
  ];

  return MapColumnsLine({
    columnList,
    keyName: indexKey,
    addRowAsync: handleAddRowAsync,
    fisrtEditKey: FormProposal.ProposalId,
  });
};

export const columnSkill = (props) => {
  const { disabled, handleAddRowAsync, indexKey = "", lstSkill = [] } = props || {};

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
      headerName: "Mã kỹ năng",
      field: FormJobSkill.SkillId,
      editable: true,
      cellEditor: DropdownCell,
      controlType: CONST_CONTROL_TYPE.Combobox,
      dataOptions: [
        ...lstSkill?.map((e) => ({
          value: e.skillId,
          label: `${e.skillId} - ${e.name}`,
        })),
      ],
      flex: 1,
      cellRenderer: (param) => {
        return isNullOrEmpty(param.value) ? (
          <span>-- Lựa chọn --</span>
        ) : (
          `${param.data.skillId} - ${param.data.name}`
        );
      },
    },
    {
      headerName: "Mô tả",
      field: FormJobSkill.Description,
      editable: false,
      flex: 2,
    },
  ];

  return MapColumnsLine({
    columnList,
    keyName: indexKey,
    addRowAsync: handleAddRowAsync,
    fisrtEditKey: FormJobSkill.SkillId,
  });
};
