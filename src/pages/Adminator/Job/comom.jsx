import DropdownCell from "../../../components/element/DropdownCell";
import { CONST_CONTROL_TYPE } from "../../../const/FormConst";
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
      editable: true,
      cellEditor: DropdownCell,
      pinned: "left",
    },
    {
      headerName: "Mã ứng viên",
      field: FormProposal.TalentId,
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
      dataOptions: [...getSystemCodeValues(systemCodes, 'PROPOSAL_STATUS').map(e=>({
        
      }))]
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
    fisrtEditKey: FormProposal.ProposalId,
  });
};
