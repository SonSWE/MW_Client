import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CONST_CONTROL_TYPE } from "../../const/FormConst";
import { useGlobalConst } from "../../utils/constData";
import { FormatType, SeparatorMultipleValue } from "../../const/FornatType";
import moment from "moment";
import { validateNumber } from "../../utils/Validate";
import { format, parserFormat } from "../../utils/Format";
import { ConstInputNumber } from "../../const/ValidateType";
import { Checkbox, DatePicker, Input, InputNumber, Select, TreeSelect } from "antd";
import { convertToArray } from "../../utils/convertData";
import { isNullOrEmpty } from "../../utils/utils";

const isCheckDate = (i) =>
  i && i !== 0 && (typeof i !== "string" || (!i.includes("00010101") && i !== "0"));

const listSelectControlType = [CONST_CONTROL_TYPE.Combobox, CONST_CONTROL_TYPE.ComboxMultiple];

function countCharactersFromEndToDot(str = "", separator = ".") {
  const lastDotIndex = str.lastIndexOf(separator);
  if (lastDotIndex === -1) {
    return 0; // Không có dấu chấm trong chuỗi
  }
  return str.length - lastDotIndex - 1;
}

const DropdownCell = forwardRef((props, ref) => {
  const refInput = useRef(null);
  const globalConst = useGlobalConst();
  const [value, setValue] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const thousandSeparatorId = ",";
  const decimalPlaceId = ".";

  useEffect(() => {
    //map value
    if (props?.colDef?.controlType === CONST_CONTROL_TYPE.ComboxMultiple) {
      if (props.value !== "" && props.value !== undefined) {
        setValue(props?.value?.split(SeparatorMultipleValue));
      } else {
        setValue([]);
      }
    } else if (props?.colDef?.controlType === CONST_CONTROL_TYPE.Date && props.value) {
      setValue(isCheckDate(props.value) ? moment(props.value, "dd/mm/yyyy") : undefined);
    } else {
      setValue(props.value);
    }

    //focus input
    if (props.cellStartedEdit) {
      refInput.current?.focus();
      //open dropdown choice option of select when start edit
      if (listSelectControlType.includes(props.colDef.controlType)) {
        setDropdownOpen(true);
      }
    }
  }, [props]);

  const getDisabled = () => {
    let _disable = false;
    if (typeof props?.colDef?.disabled === "function" && props?.colDef?.disabled) {
      _disable = props?.colDef?.disabled(props);
    } else {
      if (props?.colDef?.disabled === true || props?.colDef?.disabled === false) {
        _disable = props?.colDef?.disabled;
      }
    }
    return _disable;
  };

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        if (props?.colDef?.controlType === CONST_CONTROL_TYPE.Date && value) {
          return moment(value, "dd/mm/yyyy");
        } else if (props?.colDef?.controlType === CONST_CONTROL_TYPE.ComboxMultiple) {
          return convertToArray(value).length > 0 ? value.join(SeparatorMultipleValue) : "";
        } else if (props?.colDef?.controlType === CONST_CONTROL_TYPE.Number) {
          return !isNullOrEmpty(value) ? value : null;
        } else return value;
      },
    };
  });

  const controlKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
  const validateKeyDownNumber = (event) => {
    const inputElement = event.target;
    const currentValue = inputElement.value;
    const key = event.key;
    //sondt
    //1.chỉ nhận số 0-9, dấu - , dấu +, dấu ., dấu ,
    const regexKeyAllow = /^[0-9+\-.,]$/;

    if (!regexKeyAllow.test(key) && !controlKeys.includes(key)) {
      event.preventDefault(); // Ngăn chặn ký tự không hợp lệ
    }

    if (key === "ArrowLeft" || key === "ArrowRight") {
      return;
    }

    if (currentValue?.length === 0) {
      return;
    }

    // Xác định vị trí của con trỏ trong input
    const { selectionStart, selectionEnd } = inputElement;
    // Tạo giá trị mới bằng cách chèn ký tự vừa nhập vào vị trí con trỏ hiện tại
    let newValue = currentValue.slice(0, selectionStart) + key + currentValue.slice(selectionEnd);
    if (key === "Backspace") {
      newValue = newValue.replace("Backspace", "");
    }
    if (isNullOrEmpty(newValue)) {
      newValue = "0";
    }

    //2.Kiểm tra xem có phải là số hợp lệ k
    if (
      !validateNumber({
        input: newValue,
        validType: props?.colDef?.validType ?? ConstInputNumber.DynamicDecimal,
        formatType: props?.colDef?.formatType,
        integer: thousandSeparatorId,
        decimal: decimalPlaceId,
      })
    ) {
      event.preventDefault();
    }

    //3.6 số sau dấu thập phân
    if (props?.colDef?.formatType === FormatType.Percent) {
      const numberText = newValue.replace("%", "");
      if (countCharactersFromEndToDot(numberText) > 6) {
        event.preventDefault();
      }
    }

    let rawNumberStr = parserFormat({
      input: newValue,
      type: props?.colDef?.formatType,
      integer: thousandSeparatorId,
      decimal: decimalPlaceId,
      validType: props?.colDef?.validType ?? ConstInputNumber.DynamicDecimal,
    });

    //thêm đoạn này để chắc chắn chuỗi chỉ tồn tại số
    if (props?.colDef?.validType === ConstInputNumber.Integer) {
      rawNumberStr = rawNumberStr.replace(",", "").replace(".", "").replace("%", "");
    }

    //4.kiểm tra max min
    if (!isNullOrEmpty(rawNumberStr)) {
      if (props?.colDef?.min && Number(rawNumberStr) < props?.colDef?.min) {
        event.preventDefault();
      }
      if (props?.colDef?.max && Number(rawNumberStr) > props?.colDef?.max) {
        event.preventDefault();
      }

      if (props?.colDef?.maxLength && rawNumberStr.toString().length > props?.colDef?.maxLength) {
        event.preventDefault();
      } else if (rawNumberStr.toString().length > 18) {
        event.preventDefault();
      }
    }
  };

  return props?.colDef?.controlType === CONST_CONTROL_TYPE.CheckBox ? (
    <Checkbox
      ref={refInput}
      style={{ width: "100%" }}
      checked={value === "Y"}
      onChange={(e) => {
        setValue(e.target.checked ? "Y" : "");
      }}
    ></Checkbox>
  ) : props?.colDef?.controlType === CONST_CONTROL_TYPE.Combobox ? (
    <Select
      {...globalConst.ANT.FORM.ITEM.INPUT.SELECT_COMPLEX_SEARCH}
      ref={refInput}
      open={dropdownOpen}
      onDropdownVisibleChange={(open) => setDropdownOpen(open)}
      style={{ width: "100%" }}
      placeholder={`-- Lựa chọn --`}
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
      allowClear={props?.colDef?.allowClear ? props?.colDef?.allowClear : true}
      getPopupContainer={null}
      disabled={getDisabled()}
      options={convertToArray(props?.colDef.dataOptions)}
    ></Select>
  ) : props?.colDef?.controlType === CONST_CONTROL_TYPE.ComboxMultiple ? (
    <Select
      {...globalConst.ANT.FORM.ITEM.INPUT.SELECT_COMPLEX_SEARCH}
      ref={refInput}
      open={dropdownOpen}
      onDropdownVisibleChange={(open) => setDropdownOpen(open)}
      style={{ width: "100%" }}
      placeholder={`-- Lựa chọn --`}
      mode="multiple"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
      allowClear={props?.colDef?.allowClear ? props?.colDef?.allowClear : true}
      getPopupContainer={null}
      options={convertToArray(props?.colDef.dataOptions)}
    ></Select>
  ) : props?.colDef?.controlType === CONST_CONTROL_TYPE.Number ? (
    <InputNumber
      ref={refInput}
      style={{ width: "100%" }}
      onChange={setValue}
      stringMode //sondt thêm để nhập số chính xác không bị làm tròn
      formatter={(value) =>
        format({
          input: value,
          type: props?.colDef?.formatType || FormatType.Number,
          integer: thousandSeparatorId,
          decimal: decimalPlaceId,
        })
      }
      parser={(value) =>
        parserFormat({
          input: value,
          type: props?.colDef?.formatType || FormatType.Number,
          integer: thousandSeparatorId,
          decimal: decimalPlaceId,
        })
      }
      controls={false}
      value={value}
      step={props?.colDef?.step !== undefined ? props?.colDef?.step : 100}
      onKeyDown={validateKeyDownNumber}
      size="middle"
      {...props.editerProps}
    />
  ) : props?.colDef?.controlType === CONST_CONTROL_TYPE.Date ? (
    <DatePicker
      className="cs-ant-picker"
      ref={refInput}
      {...globalConst.ANT.FORM.ITEM.INPUT.SELECT_COMPLEX_SEARCH}
      autoComplete="off"
      placeholder="dd/MM/yyyy"
      format={globalConst.ANT.LOCALE.dateFormat}
      value={value}
      onChange={(e) => {
        setValue(e ? moment(e, globalConst.ANT.LOCALE.dateFormat) : undefined);
      }}
      size="small"
      getPopupContainer={null}
    />
  ) : (
    <Input
      ref={refInput}
      style={{ width: "100%" }}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      size="middle"
      placeholder={""}
      maxLength={props?.colDef?.maxLength}
    />
  );
});

export default DropdownCell;
