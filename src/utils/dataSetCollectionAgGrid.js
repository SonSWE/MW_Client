import { Badge, Dropdown, Menu, Space, Table, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { imgStoreHost, useGlobalConst } from "helpers/constData";
import { t } from "i18next";
import {
  GetStatusText,
  dateFomatCompany,
  convertNumberToDate,
  convertToYN,
  encodeQueryData,
  numberWithCommas,
  getNumberLocaleCompany,
} from "helpers/utils";
//render giá trị
import { useNotification } from "helpers/formHelper";
import moment from "moment";
import { convertToArray } from "helpers/utils";
const DropDownRender = ({ children, tooltip }) => {
  return (
    <Tooltip placement="topLeft" title={tooltip}>
      {/* <Dropdown
        overlay={
          <Menu
            items={[
              {
                label: "Duyệt",
                key: "1",
              },
              {
                label: "2nd menu item",
                key: "2",
              },
              {
                label: "3rd menu item",
                key: "3",
              },
            ]}
          />
        }
        trigger={["contextMenu"]}
      > */}
      <div>{children}</div>
      {/* </Dropdown> */}
    </Tooltip>
  );
};
const Cell = ({ children }) => {
  return <span className="cell-content">{children}</span>;
};
export const ImpStatusRender = ({
  status,
  hanldeChangeName,
  record,
  valueItem,
  oldData,
  keyName,
}) => {
  let colorClass = "";

  if (status == "Hợp lệ") colorClass = "cl-gr";
  if (status == t("koHopLe")) colorClass = "clr-red";
  // return
  return (
    <span
      className={`${
        colorClass + " " + hanldeChangeName(valueItem, record, oldData, keyName)
      }`}
    >
      {status}
    </span>
  );
};
export const RecordStatusTextRender = ({
  statusText,
  status,
  rejectDes,
  record,
  hanldeChangeName,
  valueItem,
  oldData,
  keyName,
}) => {
  const globalConst = useGlobalConst();
  let colorClass = "";

  if (status == globalConst.APP.CODE.RECORDSTATUS.ACTIVE) colorClass = "cl-gr";
  if (
    [
      globalConst.APP.CODE.RECORDSTATUS.PENDINGINSERT,
      globalConst.APP.CODE.RECORDSTATUS.PENDINGUPDATE,
      globalConst.APP.CODE.RECORDSTATUS.PENDINGDELETE,
    ].includes(status)
  ) {
    colorClass = "clr-yl";
  }

  // nếu từ chối hiển thị tooltip lý do từ chối
  if (status == globalConst.APP.CODE.RECORDSTATUS.REJECTED) {
    colorClass = "clr-red";
    return (
      <DropDownRender tooltip={rejectDes}>
        <span
          className={`${
            colorClass +
            " " +
            hanldeChangeName(valueItem, record, oldData, keyName)
          }`}
        >
          {statusText}
        </span>
      </DropDownRender>
    );
  }
  // return
  return <span className={colorClass}>{statusText}</span>;
};
export const StatusTextRender = ({
  statusText,
  status,
  rejectDes,
  record,
  hanldeChangeName,
  valueItem,
  oldData,
  keyName,
}) => {
  const globalConst = useGlobalConst();
  let colorClass = "";

  if (status == globalConst.APP.CODE.STATUS.APPROVED) colorClass = "cl-gr";
  if ([globalConst.APP.CODE.STATUS.PENDING].includes(status)) {
    colorClass = "clr-yl";
  }

  // nếu từ chối hiển thị tooltip lý do từ chối
  if (status == globalConst.APP.CODE.STATUS.REJECTED) {
    colorClass = "clr-red";
    return (
      <DropDownRender tooltip={rejectDes}>
        <span
          className={`${
            colorClass +
            " " +
            hanldeChangeName(valueItem, record, oldData, keyName)
          }`}
        >
          {statusText}
        </span>
      </DropDownRender>
    );
  }
  // return
  return <span className={colorClass}>{statusText}</span>;
};
export const StatusRender = ({
  status,
  cdCode,
  record,
  hanldeChangeName,
  valueItem,
  oldData,
  keyName,
}) => {
  const globalConst = useGlobalConst();
  const allcode = useSelector((state) => state.allcodeReducer.ALLCODE);
  
  let colorClass = "";

  if (status == globalConst.APP.CODE.STATUS.APPROVED) colorClass = "cl-gr";
  if ([globalConst.APP.CODE.STATUS.PENDING].includes(status)) {
    colorClass = "clr-yl";
  }
  let statusText = GetStatusText(status, allcode, cdCode, keyName);

  return <span>{statusText}</span>
  // // nếu từ chối hiển thị tooltip lý do từ chối
  // if (status == globalConst.APP.CODE.STATUS.REJECTED) {
  //   colorClass = "clr-red";
  //   return (
  //     <span
  //       className={`${
  //         colorClass +
  //         " " +
  //         hanldeChangeName(valueItem, record, oldData, keyName)
  //       }`}
  //     >
  //       {statusText}
  //     </span>
  //   );
  // }
  // // return
  // return (
  //   <span
  //     className={`${
  //       colorClass + " " + hanldeChangeName(valueItem, record, oldData, keyName)
  //     }`}
  //   >
  //     {statusText}
  //   </span>
  // );
};
export const TXStatusTextRender = ({
  statusText,
  status,
  rejectDes,
  record,
  hanldeChangeName,
  valueItem,
  oldData,
  keyName,
}) => {
  const notification = useNotification();
  const globalConst = useGlobalConst();
  let colorClass = "";

  if (status == globalConst.APP.CODE.TXSTATUS.APPROVED) colorClass = "cl-gr";
  if (status == globalConst.APP.CODE.TXSTATUS.PENDING) colorClass = "clr-yl";

  // nếu từ chối hiển thị tooltip lý do từ chối
  if (status == globalConst.APP.CODE.TXSTATUS.REJECTED) {
    colorClass = "clr-red";
    return (
      <DropDownRender tooltip={rejectDes}>
        <span
          className={`${
            colorClass +
            " " +
            hanldeChangeName(valueItem, record, oldData, keyName)
          }`}
        >
          {statusText}
        </span>
      </DropDownRender>
    );
  }
  // return
  return <span className={colorClass}>{statusText}</span>;
};
export const IshoRender = ({ text }) => {
  if (text == "Y") text = "Hội Sở";
  if (text == "N") text = "Chi nhánh";

  return <span>{text}</span>;
};
export const SignsRender = ({ signs }) => {
  return signs?.map((e) => <a href={imgStoreHost + e.pathFile}>{e.name}</a>);
};
// hiển thị gạch và giá trị cũ
export const styleAndOldValue = ({colum, record, oldData, keyName}) => {
  let checked = {};
  let findObj = {};
  if (oldData?.value && Array.isArray(oldData?.value)) {
    findObj = oldData?.value?.find(
      (key) => key?.[keyName]?.value === record?.[keyName]
    );
  }
  if (findObj && Object.keys(findObj).length !== 0) {
    checked["style"] = findObj?.[colum.field ? colum.field : colum]?.className;
    checked["oldValue"] = findObj?.[colum.field ? colum.field : colum]?.value;
  }
  return checked;
};

export const hanldeChangeName = (e, record, oldData, keyName) => {
  let checked = "";
  let findObj = {};
  if (oldData?.value && Array.isArray(oldData?.value)) {
    findObj = oldData?.value?.find(
      (key) => key?.[keyName]?.value === record?.[keyName]
    );
  }
  if (findObj && Object.keys(findObj).length !== 0) {
    checked = findObj?.[e.field ? e.field : e]?.className;
  }
  return checked;
  
};
export const hanldeRemoteYN = (className, valueYN) => {
  if (className === "value_edited" || className === "record-deleting")
    return className;
  if (convertToYN(valueYN) === "N") return "";
  return className;
};

export const MapColumns = (
  columnList,
  keyName,
  oldData,
  recordStatus,
  checkTabs = false
) => {
  const notification = useNotification();

  return columnList.map((e) => {
    let cellRenderer =
      e.cellRenderer ||
      ((params) => {
        const { value, data } = params;
        return (
          <Cell>
            <Tooltip
              placement="top"
              title={
                e.tooltipHTML ? (
                  <div dangerouslySetInnerHTML={{ __html: value }} />
                ) : (
                  value
                )
              }
            >
              <span
                className={`${hanldeChangeName(e, data, oldData, keyName)}`}
              >
                {" "}
                {value}{" "}
              </span>
            </Tooltip>
          </Cell>
        );
      });
    if (e.hasHyperlink === "Y") {
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <Tooltip placement="topLeft" title={"Ctrl + Click"}>
              <div
                className="text-link"
                onClick={(event) => {
                  if (event.ctrlKey || event.metaKey) {
                    let params = encodeQueryData(e.hyperlinkParams, data);

                    if (!params) {
                      return notification.error({
                        message: t("thatBai"),
                        description: t("taiKhoanKhongHoatDong"),
                      });
                    }

                    window.open(e.hyperlink + "?" + params, "_blank").focus();
                  }
                }}
                href=""
                // target="_blank"
              >
                <span
                  className={`${hanldeChangeName(e, data, oldData, keyName)}`}
                >
                  {" "}
                  {value}{" "}
                </span>
              </div>
            </Tooltip>
          </Cell>
        );
      };
    }
    //Lọc theo trường dữ liệu
    else if (e.key === "WEBSITE")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
            <Cell>
              <a href={value} target="_blank">
                <span
                  className={`${hanldeChangeName(e, data, oldData, keyName)}`}
                >
                  {" "}
                  {value}{" "}
                </span>
              </a>
            </Cell>
        );
      };
    else if (e.key === "ISHO")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
            <Cell>
              <IshoRender text={value} />
            </Cell>
        );
      };
    else if (e.key === "IMPSTATUS")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <ImpStatusRender
              status={value}
              record={data}
              hanldeChangeName={hanldeChangeName}
              valueItem={e}
              oldData={oldData}
              keyName={keyName}
            />
          </Cell>
        );
      };
    else if (e.key?.toUpperCase() === "STATUS")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <StatusRender
              status={value}
              cdCode={`STATUS`}
              record={data}
              hanldeChangeName={hanldeChangeName}
              valueItem={e}
              oldData={oldData}
              keyName={keyName}
            />
          </Cell>
        );
      };
    else if (e.key?.toUpperCase() === "EXPIREDSTS")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <StatusRender
              status={value}
              cdCode={`EXPIREDSTS`}
              record={data}
              hanldeChangeName={hanldeChangeName}
              valueItem={e}
              oldData={oldData}
              keyName={keyName}
            />
          </Cell>
        );
      };
    else if (e.key?.toUpperCase() === "STATUSTEXT")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <StatusTextRender
              statusText={value}
              status={data.STATUS || data.status}
              rejectDes={data.REJECTDES || data.rejectDes}
              record={data}
              hanldeChangeName={hanldeChangeName}
              valueItem={e}
              oldData={oldData}
              keyName={keyName}
            />
          </Cell>
        );
      };
    else if (e.key?.toUpperCase() === "RECORDSTATUSTEXT")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <RecordStatusTextRender
              statusText={value}
              status={data.recordStatus || data.RECORDSTATUS}
              rejectDes={data.REJECTDES || data.rejectDes}
              record={data}
              hanldeChangeName={hanldeChangeName}
              valueItem={e}
              oldData={oldData}
              keyName={keyName}
            />
          </Cell>
        );
      };
    else if (e.key === "TXSTATUSTEXT")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <TXStatusTextRender
              statusText={value}
              status={data.TXSTATUS}
              rejectDes={data.REJECTDES}
              record={data}
              hanldeChangeName={hanldeChangeName}
              valueItem={e}
              oldData={oldData}
              keyName={keyName}
            />
          </Cell>
        );
      };
    else if (e.key === "ADDRESS")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <Tooltip placement="topLeft" title={data.ADDRESS}>
              <span
                className={`${hanldeChangeName(e, data, oldData, keyName)}`}
              >
                {" "}
                {value}{" "}
              </span>
            </Tooltip>
          </Cell>
        );
      };
    else if (e.key === "DESCRIPTION" && e.dataType !== "HTML")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <Tooltip placement="topLeft" title={data.DESCRIPTION}>
              <span
                className={`${hanldeChangeName(e, data, oldData, keyName)}`}
              >
                {" "}
                {value}{" "}
              </span>
            </Tooltip>
          </Cell>
        );
      };
    else if (e.key === "REJECTDES")
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
            <Tooltip placement="topLeft" title={data.REJECTDES}>
              <span
                className={`${hanldeChangeName(e, data, oldData, keyName)}`}
              >
                {" "}
                {value}{" "}
              </span>
            </Tooltip>
          </Cell>
        );
      };
    // Lọc theo kiểu dữ liệu
    else if (e.dataType === "DAT" || e.dataType === "DAT10") {
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <span className={`${hanldeChangeName(e, data, oldData, keyName)}`}>
            {" "}
            {value && !value.includes("0001-01-01") ? (
              <Moment format={dateFomatCompany}>{value}</Moment>
            ) : (
              ""
            )}
          </span>
        );
      };
    } else if (e.dataType === "DAT16") {
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <span className={`${hanldeChangeName(e, data, oldData, keyName)}`}>
            {value && !value.includes("0001-01-01") ? (
              <Moment format={`${dateFomatCompany} HH:mm`}>{value}</Moment>
            ) : (
              ""
            )}
          </span>
        );
      };
    } else if (e.dataType === "DAT19") {
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <span className={`${hanldeChangeName(e, data, oldData, keyName)}`}>
            {value && !value.includes("0001-01-01") ? (
              <Moment format={`${dateFomatCompany} HH:mm:ss`}>{value}</Moment>
            ) : (
              ""
            )}
          </span>
        );
      };
    } else if (e.dataType === "DAT23") {
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <span className={`${hanldeChangeName(e, data, oldData, keyName)}`}>
            {value && !value.includes("0001-01-01") ? (
              <Moment format={`${dateFomatCompany} HH:mm:ss.SSS`}>{value}</Moment>
            ) : (
              ""
            )}
          </span>
        );
      };
    } else if (e.dataType === "LNG") {
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <span className={`${hanldeChangeName(e, data, oldData, keyName)}`}>
            {parseFloat(value) ? value?.toLocaleString(getNumberLocaleCompany()) : value}
          </span>
        );
      };
    } else if (e.dataType === "HTML") {
      // alert(1)
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <Cell>
          <Tooltip
            placement="top"
            title={
              e.tooltipHTML ? (
                <div dangerouslySetInnerHTML={{ __html: value }} />
              ) : (
                value
              )
            }
          >
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </Tooltip>
          </Cell>
        );
      };
    } else if (e.dataType === "DATEFROMNUMBER" || e.dataType === "DATNUM") {
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <span className={`${hanldeChangeName(e, data, oldData, keyName)}`}>
            {" "}
            {convertNumberToDate(value)}
          </span>
        );
      };
    } else if (e.dataType === "NUMBER") {
      cellRenderer = (params) => {
        const { value, data } = params;
        return (
          <span className={`${hanldeChangeName(e, data, oldData, keyName)}`}>
            {" "}
            {numberWithCommas(value)}
          </span>
        );
      };
    }
    return {
      ...e,
      dataIndex: e.key,
      ellipsis: {
        showTitle: false,
      },
      cellRenderer: cellRenderer,
    };
  });
};
