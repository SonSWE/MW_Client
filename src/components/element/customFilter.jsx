import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { convertToArray, dateFomatCompany, getSystemCodeValues } from "../../utils/utils";


export default forwardRef((props, ref) => {
  const [filterText, setFilterText] = useState(null);
  const [txtInput, setTxtInput] = useState(null);
  const systemCodes = useSelector((state) => state.allcodeReducer.SYSTEMCODES);

  const handleCustomContentFilter = (value, recordIndex, dataType) => {

    if(isNullOrEmpty(recordIndex) && !isNullOrEmpty(value)) {
      return false;
    }

    if (props?.colDef?.filterOptions === "DAT_YEAR") {
      let textFormatDay = moment(recordIndex).format("YYYY");
      let textFormatGird = value + "";
      return textFormatDay?.toString()?.toLowerCase().includes(textFormatGird?.toLowerCase());
    }
    let textFormat = recordIndex;

    if (dataType === "DATEFROMNUMBER") {
      textFormat = moment(recordIndex?.toString(), "YYYYMMDD").format(`${dateFomatCompany} HH:mm:ss`);
    } else if (dataType === "DAT" || dataType === "DAT10" || dataType === "DATNUM") {
      textFormat = moment(recordIndex?.toString(), "YYYY-MM-DD").format(dateFomatCompany);
    } else if (dataType === "DAT16") {
      textFormat = moment(recordIndex?.toString()).format(`${dateFomatCompany} HH:mm`);
    } else if (dataType === "DAT20") {
      textFormat = moment(recordIndex?.toString()).format(`${dateFomatCompany} HH:mm:ss`);
    } else if (["STATUS", "EXPIREDSTS"].includes(dataType?.toUpperCase())) {
      textFormat = convertToArray(getSystemCodeValues(systemCodes, "CF_STATUS").filter((x) => x.value === recordIndex).map((x) => (x?.lang === "en" ? x.descriptionOther : x.description)));
      textFormat.push("#");
      textFormat.join(",");
    } else if (["STATUS_UQ"].includes(dataType?.toUpperCase())) {
      textFormat = convertToArray(getSystemCodeValues(systemCodes, "CF_EXPIREDSTS").filter((x) => x.value === recordIndex).map((x) => (x?.lang === "en" ? x.descriptionOther : x.description)));
      textFormat.push("#");
      textFormat.join(",");
    } else if (["IDTYPE"].includes(dataType?.toUpperCase())) {
      console.log();
      textFormat = convertToArray(getSystemCodeValues(systemCodes, "CF_IDTYPE").filter((x) => x.value === recordIndex).map((x) => (x?.lang === "en" ? x.descriptionOther : x.description)));
      textFormat.push("#");
      textFormat.join(",");
    } else if (["TRANSTYPEPS"].includes(dataType?.toUpperCase())) {
      textFormat = convertToArray(getSystemCodeValues(systemCodes, "DEPOSITIM_BATCH_TRANSTYPE").filter((x) => x.value === recordIndex).map((x) => (x?.lang === "en" ? x.descriptionOther : x.description)));
      textFormat.push("#");
      textFormat.join(",");
    } else if (["CHANNELPS"].includes(dataType?.toUpperCase())) {
      textFormat = convertToArray(getSystemCodeValues(systemCodes, "DEPOSITIM_BATCH_CHANNEL").filter((x) => x.value === recordIndex).map((x) => (x?.lang === "en" ? x.descriptionOther : x.description)));
      textFormat.push("#");
      textFormat.join(",");
    } else if (["STATUS_PS"].includes(dataType?.toUpperCase())) {
      textFormat = ["N/A"].includes(recordIndex) ? recordIndex : convertToArray(getSystemCodeValues(systemCodes, "DEPOSITIM_BATCH_SETTLESTS").filter((x) => x.value === recordIndex).map((x) => (x?.lang === "en" ? x.descriptionOther : x.description)));
      if (!["N/A"].includes(recordIndex)) {
        textFormat.push("#");
        textFormat.join(",");
      }
    } else if (["STATUS_IM"].includes(dataType?.toUpperCase())) {
      textFormat = ["N/A"].includes(recordIndex) ? recordIndex : convertToArray(getSystemCodeValues(systemCodes, "BATCHWITHDRAWIM_SETTLESTS").filter((x) => x.value === recordIndex).map((x) => (x?.lang === "en" ? x.descriptionOther : x.description)));
      if (!["N/A"].includes(recordIndex)) {
        textFormat.push("#");
        textFormat.join(",");
      }
    }

    return textFormat?.toString()?.toLowerCase().includes(value?.toLowerCase());
  };
  useImperativeHandle(ref, () => {
    return {
      doesFilterPass(params) {
        const { api, colDef, column, columnApi, context } = props;
        const { node } = params;
        // make sure each word passes separately, ie search for firstname, lastname
        // let passed = true;
        let passed = handleCustomContentFilter(
          filterText,
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
        return filterText != null && filterText !== "";
      },

      getModel() {
        if (!this.isFilterActive()) {
          return null;
        }

        return { value: filterText };
      },

      setModel(model) {
        setFilterText(model == null ? null : model.value);
      },
    };
  });

  const onChange = (event) => {
    setTxtInput(event.target.value);
    // setFilterText(event.target.value);
  };

  useEffect(() => {
    props.filterChangedCallback();
  }, [filterText]);

  return (
    <div className="ag-filter-custom">
      {props?.colDef?.filterOptions === "DAT_YEAR" ? (
        <input
          type="text"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          value={txtInput}
          onChange={(value) => {
            setTxtInput(value.target.value);
          }}
          placeholder={"yyyy"}
          maxLength={4}
        />
      ) : (
        <input type="text" value={txtInput} onChange={onChange} placeholder="search..." />
      )}

      <div className="foot">
        <button onClick={() => setFilterText(txtInput)} className="primary">
          {"timKiem"}
        </button>
        <button
          onClick={() => {
            setTxtInput("");
            setFilterText(null);
          }}
          className="outline"
        >
          Reset
        </button>
      </div>
    </div>
  );
});
