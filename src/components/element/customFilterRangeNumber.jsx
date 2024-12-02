import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { InputNumber } from "antd";
export default forwardRef((props, ref) => {
  const [txtInput, setTxtInput] = useState(null);
  const [txtFrom, setTxtFrom] = useState(null);
  const [txtTo, setTxtTo] = useState(null);
  const [filterTextFrom, setFilterTextFrom] = useState({
    from: txtFrom,
    to: txtTo,
  });
  // expose AG Grid Filter Lifecycle callbacks
  const ftv = (val) => {
    if ((val === null || val === "" || val === undefined) && val !== 0 && val !== "0") {
      return undefined;
    } else if (val === 0 || val === "0") {
      return true;
    }
    return val;
  };
  const reCk = (val) => {
    if (val === null || val === "" || val === undefined) {
      return true;
    }
    return false;
  };
  const handleCustomContentFilter = (value, recordIndex, dataType) => {
    let textFormat = Number(recordIndex);
    let textFrom = Number(value?.from);
    let textTo = Number(value?.to);
    if (ftv(value?.from) && ftv(value?.to) && !isNaN(recordIndex)) {
      return textFormat >= textFrom && textFormat <= textTo;
    } else if (!ftv(value?.from) && ftv(value?.to) && !isNaN(recordIndex)) {
      return textFormat >= 0 && textFormat <= textTo;
    } else if (ftv(value?.from) && !ftv(value?.to) && !isNaN(recordIndex)) {
      return textFormat >= textFrom;
    }
    return true;
  };
  useImperativeHandle(ref, () => {
    return {
      doesFilterPass(params) {
        const { api, colDef, column, columnApi, context } = props;
        const { node } = params;
        let passed = handleCustomContentFilter(
          filterTextFrom,
          props.valueGetter({
            api,
            colDef,
            column,
            columnApi,
            context,
            data: node.data,
            getValue: (field) => node.data[field],
            node,
          }),
          colDef?.dataType
        );

        return passed;
      },

      isFilterActive() {
        if (reCk(filterTextFrom?.from) && reCk(filterTextFrom?.to)) {
          return false;
        } else {
          return true;
        }
      },

      getModel() {
        if (!this.isFilterActive()) {
          return null;
        }

        return { value: filterTextFrom };
      },

      setModel(model) {
        setFilterTextFrom(model == null ? null : model.value);
      },
    };
  });

  useEffect(() => {
    props.filterChangedCallback();
  }, [filterTextFrom]);
  return (
    <div className="ag-filter-custom" style={{ maxWidth: 210 }}>
      <InputNumber
        className="cs-ant-input"
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        controls={false}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        value={txtFrom}
        onChange={(value) => setTxtFrom(value)}
        placeholder={'tu'}
        style={{ marginBottom: 8 }}
      />
      <InputNumber
        className="cs-ant-input"
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        controls={false}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        value={txtTo}
        onChange={(value) => setTxtTo(value)}
        placeholder={'den'}
        style={{ marginBottom: 8 }}
      />

      <div className="foot">
        <button
          onClick={() => {
            setFilterTextFrom({
              from: txtFrom,
              to: txtTo,
            });
          }}
          className="primary"
        >
          timKiem
        </button>
        <button
          onClick={() => {
            setTxtFrom("");
            setTxtTo("");
            setFilterTextFrom(null);
          }}
          className="outline"
        >
          Reset
        </button>
      </div>
    </div>
  );
});
