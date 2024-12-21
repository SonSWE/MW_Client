import DropdownCell from "../../../components/element/DropdownCell";
import { CONST_CONTROL_TYPE } from "../../../const/FormConst";
import { FormSystemCodeValue } from "../../../const/FormSystemCode";
import { MapColumnsLine } from "../../../utils/datagridHelper";

export const columnSystemCodeValue = (props) => {
  const { disabled, handleAddRowAsync, indexKey = "" } = props || {};

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
      headerName: "Giá trị",
      field: FormSystemCodeValue.Value,
      headerClass: "text-header-table",
      editable: true,
      cellEditor: DropdownCell,
      flex: 2,
    },
    {
        headerName: "Mô tả",
        field: FormSystemCodeValue.Description,
        headerClass: "text-header-table",
        editable: true,
        cellEditor: DropdownCell,
        flex: 2,
      },
  ];

  return MapColumnsLine({
    columnList,
    keyName: indexKey,
    addRowAsync: handleAddRowAsync,
    fisrtEditKey: FormSystemCodeValue.Value,
  });
};


