import { convertToArray, dateFormatDefault, isNullOrEmpty } from "./utils";
import moment from "moment";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";

import { CONST_CONTROL_TYPE } from "../const/FormConst";
import { format } from "./Format";
import { FormatType, SeparatorMultipleValue, SpaceMultipleValue } from "../const/FornatType";
import customFilter from "../components/element/customFilter";
import { useGlobalConst } from "./constData";

const Cell = ({ children, bgColor, bgColorStyle }) => {
  return (
    <div
      className="cell-content"
      style={{ backgroundColor: bgColor, color: bgColorStyle, textIndent: "13px" }}
    >
      {children}
    </div>
  );
};

const RenderOptions = ({ value, options, linkToDetail, valueItem, record }) => {
  let option = convertToArray(options).find((e) => e?.value === value);
console.log(option)
  let text = option !== undefined ? option?.label : value;

  return !value || value === "" ? (
    <Cell>
      <span className={"valueNotUnderline"}>-- Lựa chọn --</span>
    </Cell>
  ) : (
    <Cell>
      <Tooltip placement="topLeft" title={text}>
        <span>{text}</span>
      </Tooltip>
    </Cell>
  );
};

const RenderOptionsMultiple = ({ value, options, valueItem, record }) => {
  var content = "";
  var contents = [];
  if (value !== "" && value !== undefined) {
    const values = convertToArray(value?.split(SeparatorMultipleValue));
    if (values.length > 0) {
      values.forEach((item) => {
        let _allCodeFind = convertToArray(options).find((x) => x?.value === item);
        contents.push(_allCodeFind?.description);
      });
    }
    content = contents.join(SpaceMultipleValue);
  }

  return value?.length > 0 ? (
    <Cell>
      <Tooltip placement="topLeft" title={content}>
        <span>{content}</span>
      </Tooltip>
    </Cell>
  ) : (
    <Cell>
      <span>-- Lựa chọn --</span>
    </Cell>
  );
};

//Gach chân
export const MapColumnsLine = ({ columnList, keyName, oldData, handleAddRow, clNameList }) => {
  const globalConst = useGlobalConst();
  return columnList.map((e) => {
    if (e?.children?.length > 0) {
      e.children = e.children.map((e) =>
        makeCellFunction(e, keyName, oldData, handleAddRow, globalConst)
      );
    }
    return makeCellFunction(e, keyName, oldData, handleAddRow, globalConst);
  });
};

const makeCellFunction = (e, keyName, oldData, handleAddRow, globalConst) => {
  let cellRenderer = (params) => {
    const { value, data } = params;

    return (
      <Cell>
        <span>{value}</span>
      </Cell>
    );
  };

  if (e.controlType?.toUpperCase() === CONST_CONTROL_TYPE.Number) {
    cellRenderer = (params) => {
      const { value, data } = params;

      const formatted = format({
        input: value,
        type: e.formatType || FormatType.Number,
        integer: ".",
        decimal: ",",
      });

      if (!parseFloat(value)) {
        return value;
      }

      return (
        <Cell>
          <span>{formatted}</span>
        </Cell>
      );
      // return formatted;
    };
  } else if (e.controlType?.toUpperCase() === CONST_CONTROL_TYPE.Combobox) {
    cellRenderer = (params) => {
      const { value, data } = params;

      return (
        <Cell>
          <RenderOptions value={value} options={e?.dataOptions} valueItem={e} />
        </Cell>
      );
    };
  } else if (e.controlType?.toUpperCase() === CONST_CONTROL_TYPE.ComboxMultiple) {
    cellRenderer = (params) => {
      const { value, data } = params;
      return (
        <Cell>
          <RenderOptionsMultiple
            value={value}
            options={e?.dataOptions}
            valueItem={e}
            record={data}
          />
        </Cell>
      );
    };
  } else if (e.dataTypeDATE === CONST_CONTROL_TYPE.Date) {
    cellRenderer = (params) => {
      const { value, data } = params;

      let date = moment(value, dateFormatDefault).format(dateFormatDefault);
      return (
        <Cell>
          <span>{value && !value.includes("0001-01-01") ? date : ""}</span>
        </Cell>
      );
    };
  }

  let suppressKeyboardEvent = (params) => {
    if (params?.event?.code === "Delete") {
      deleteRowAsync(params?.data);
    }
    if (params?.event?.code === "Enter") {
      if (addRowAsync !== undefined && typeof addRowAsync === "function") {
        if (ListSelectControlType.includes(params.colDef.controlType)) {
          //if enter press in cell type cbo then override event stop edit to select value

          return true;
        } else if (params?.node?.rowIndex === params.api.getDisplayedRowCount() - 1) {
          //if enter in other control type then add one row and focus to first cell edit in new row
          params.api.stopEditing();
          addRowAsync().then((newId) => {
            const newRowNode = params.api.getRowNode(newId);
            if (!isNullOrEmpty(fisrtEditKey)) {
              params.api.startEditingCell({
                rowIndex: newRowNode.rowIndex,
                colKey: fisrtEditKey,
              });
            }

            return false;
          });
        }
      }
    }

    return false;
  };
  if (e?.suppressKeyboardEvent) {
    suppressKeyboardEvent = e?.suppressKeyboardEvent;
  }

  let propsReturn = {
    ...e,
    dataIndex: e.key,
    ellipsis: {
      showTitle: false,
    },
    suppressKeyboardEvent: suppressKeyboardEvent,
    filter: e?.filter ? e?.filter : customFilter,
  };

  if (e?.dataType !== CONST_CONTROL_TYPE.CheckBox) {
    propsReturn.cellRenderer = cellRenderer;
    propsReturn.filter = e?.filterDisable === true ? false : e?.filter ? e?.filter : customFilter;
  }

  if (e.cellRenderer) {
    propsReturn.cellRenderer = e.cellRenderer;
  }

  return propsReturn;
};
