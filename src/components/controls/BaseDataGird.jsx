import { Button, Spin, notification } from "antd";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAxios } from "../../utils/apiHelper";
import Pagination from "./Pagination";
import customFilterRangeNumber from "../element/customFilterRangeNumber";
import customFilter from "../element/customFilter";
import { TYPE_ACTION } from "../../const/LayoutConst";
import { objectToArray } from "../../utils/constData";
import { ButtonAction } from "../element/ButtonAction";
import { makeid } from "../../utils/commonFunction";

const BaseDataGird = React.forwardRef(
  ({ controller, searchCode, config, onEvent, pageSize = 100 }, ref) => {
    const defaultInquirySet = useMemo(
      () => ({
        //request để gửi api truy vấn
        code: searchCode,
        conds: [],
        sortConds: [],
        pageNum: 0,
        pageSize: pageSize,
      }),
      [searchCode]
    );
    const axios = useAxios();
    const [isLoading, setIsLoading] = useState(false);

    const [inquiryRequest, setInquiryRequest] = useState(defaultInquirySet);

    const [rowDatas, setRowDatas] = useState([]);

    const gridRef = useRef({});

    const gridOptions = {
      headerHeight: 40,
      suppressMenuHide: true,
      suppressCellFocus: true,
      suppressKeyboardEvent: (params) => {
        const key = params.event.key;
        return key === "ArrowDown" || key === "ArrowUp"; // Chặn cuộn lên/xuống
      },
      // onSortChanged: handleSortChanged,
    };

    useImperativeHandle(ref, () => ({
      onEvent: (data) => {
        if (data.type === TYPE_ACTION.SEARCH_DATA) {
          const values = data?.data;
          const conds = Object.keys(values)
            .filter((key) =>
              config.dataGrid.searchConfig.some((x) => x.key.toUpperCase() === key.toUpperCase())
            )
            .map((key) => {
              let value = "";
              value = values[key] ? values[key] + "" : values[key];

              return {
                key: key.toUpperCase(),
                value: typeof value === "number" && value === 0 ? value + "" : value,
              };
            })
            ?.filter((e) => e.value != null && e.value != undefined && e.value != "");

          let q = {
            ...inquiryRequest,
            pageNum: 1,
            conds: conds?.map((e) => ({
              ...e,
              value: e.value?.trim(),
              operator:
                config.dataGrid.searchConfig.find(
                  (x) => x.key?.toUpperCase() === e.key?.toUpperCase()
                )?.operators?.[0] ?? "=",
            })),
          };
          setInquiryRequest(q);
          _getDataInquiry({ inquiryReq: q });
          return q;
        }
      },
    }));

    const rowDatacColumn = useMemo(() => {
      return [
        ...config.dataGrid.columnDefs.map((item) => ({
          ...item,
          width: item?.dataIndex === "NO" ? 120 : item?.width,
          // filter: item?.dataType === "LNG" ? customFilterRangeNumber : customFilter,

          //add colum
          // lockPosition: item?.fixed,
          // hide: item.display ? false : true,
          ellipsis: {
            showTitle: false,
          },
        })),
        {
          field: "createDate",
          headerName: "Ngày tạo",
          dataType: "DAT16",
          align: "left",
          width: 180,
          sortable: true,
          sorter: {
            multiple: 1,
          },
          ellipsis: {
            showTitle: false,
          },
        },
        {
          field: "createBy",
          headerName: "Người tạo",
          align: "left",
          width: 180,
          sortable: true,
          sorter: {
            multiple: 1,
          },
          ellipsis: {
            showTitle: false,
          },
        },
        {
          field: "lastChangeBy",
          headerName: "Người sửa",
          align: "left",
          width: 100,
          sortable: true,
          sorter: {
            multiple: 1,
          },
          ellipsis: {
            showTitle: false,
          },
        },
        {
          field: "lastChangeDate",
          headerName: "Ngày sửa",
          dataType: "DAT16",
          align: "left",
          width: 100,
          sortable: true,
          sorter: {
            multiple: 1,
          },
          ellipsis: {
            showTitle: false,
          },
        },
        {
          headerName: "Chức năng",
          pinned: "right",
          width: config.dataGrid.widthActionCol ? config.dataGrid.widthActionCol : 300,
          cellRenderer: (param) => {
            return (
              <div className="flex gap-2 items-center h-full">
                {objectToArray(config.dataGrid.buttonConfig).map((x) => {
                  return x.isShow ? (
                    <ButtonAction
                      key={x.key}
                      title={x.name ? x.name : x.key}
                      icon={x.icon}
                      styleIcon={x.style}
                      onClick={() => {
                        onEvent({
                          type: TYPE_ACTION.BUTTON_ACTION_CLICK,
                          data: { ...param.data, action: x.key },
                        });
                      }}
                    />
                  ) : (
                    <></>
                  );
                })}
              </div>
            );
          },
        },
      ];
    }, [config.dataGrid.columnDefs]);

    const onSortChanged = async (e) => {
      const sortState = await e.api
        .getColumnDefs()
        .filter(function (s) {
          return s.sort != null;
        })
        .map((column) => {
          return {
            key: column.colId,
            direction: column.sort,
          };
        });
      let inquiryThumb = {
        ...inquiryRequest,
        sortConds: [...sortState],
      };
      setInquiryRequest(inquiryThumb);
      await _getDataInquiry({ inquiryReq: inquiryThumb });
    };

    const onBtFirstNextPages = useCallback((page) => {
      if (page === 1) {
        return gridRef.current.api.paginationGoToFirstPage();
      } else if (gridRef.current.api.paginationGetTotalPages() === page) {
        return gridRef.current.api.paginationGoToLastPage();
      } else gridRef.current.api.paginationGoToPage(page - 1);
    }, []);

    const _getDataInquiry = ({ inquiryReq = inquiryRequest }) => {
      setIsLoading(true);

      // gọi api
      return axios
        .inquiry(inquiryReq)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200 && res.data) {
            if (res.data && res.data?.datas) {
              setRowDatas(res.data?.datas.map((e, i) => ({ ...e, id: makeid() + i })));
            }
          }
        })
        .catch(function (err) {
          setIsLoading(false);
          console.log(err);
        });
    };

    const onGridReady = (params) => {
      // const allColumnIds = params.columnApi.getAllColumns().map((column) => column.colId);
      const allColumnIds = [];
      params.api.getColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      params.api.sizeColumnsToFit(allColumnIds);
    };

    return (
      <Spin spinning={isLoading}>
        <div className="">
          <div className={"ag-theme-quartz hide-paging"} style={{ height: 500 }}>
            <AgGridReact
              ref={gridRef}
              columnDefs={rowDatacColumn}
              rowData={rowDatas}
              enableSorting={true}
              enableFilter={true}
              pagination={true} // Enable pagination
              paginationPageSize={inquiryRequest.pageSize}
              defaultColDef={{
                // flex: 1,
                sortable: true,
                filter: false,
                resizable: true,
              }}
              filter={false}
              rowSelection="single"
              gridOptions={gridOptions}
              // icons={icons}
              onGridReady={onGridReady}
              onSortChanged={onSortChanged}
              overlayNoRowsTemplate="Không có bản ghi nào được hiển thị"
              suppressDragLeaveHidesColumns={false}
            />
          </div>

          <Pagination
            hideFetchAgain
            className="pagination-bar"
            currentPage={inquiryRequest.pageNum}
            sizeOption={[10, 20, 50, 100]}
            realTotalCount={rowDatas?.length}
            totalCount={rowDatas?.length}
            pageSize={inquiryRequest.pageSize}
            onPageChange={(page) => {
              let inquiryThumb = {
                ...inquiryRequest,
                pageNum: parseInt(page),
              };
              setInquiryRequest(inquiryThumb);
              onBtFirstNextPages(page);
            }}
            onSizeChange={(size) => {
              let inquiryThumb = {
                ...inquiryRequest,
                pageSize: parseInt(size),
                pageNum: 1,
              };
              setInquiryRequest(inquiryThumb);
              onBtFirstNextPages(1);
            }}
            onEvent={onEvent}
          />
        </div>
      </Spin>
    );
  }
);
export default BaseDataGird;
