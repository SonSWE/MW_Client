import { AgGridReact } from "ag-grid-react";
import { Spin } from "antd";
import React, { useCallback, useImperativeHandle, useMemo, useState } from "react";
// import Pagination from "components/layout/table/PaginationV2";
import { useDispatch, useSelector } from "react-redux";
// import { AgGridReact } from "@ag-grid-community/react";
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// import { ModuleRegistry } from "@ag-grid-community/core";
// ModuleRegistry.registerModules([ClientSideRowModelModule]);

const EditTableCommunityAG = React.forwardRef(
  (
    {
      rowDatacColumn,
      setSelectedRows,
      selectedRows,
      getData,
      rowId = "id",
      defaultColDef = {
        editable: true,
        cellDataType: false,
        resizable: true,
        sortable: false,
        initialWidth: 160,
        wrapHeaderText: true,
        autoHeaderHeight: false,
      },
      onRowClickedCus,
      onSelectionChanged,
      formLoading = false,
      gridRef,
      rowHeight = 36,
      className = "ag-show-controls align-left",
      onChangeValue,
      onRowValueChanged,
      onCellEditingStopped,
      containerStyle = {},
      clNameList,
      indexKey = "",
      fieldCondsParamsFirst,
      condsParamsFirst,
      setSelectedNodes,
      selectedNodes,
      maxPage = 50,
      paging = true,
      props,
      gridOptions,
    },
    ref
  ) => {
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(maxPage);
    // const lang = useSelector((state) => state.language.language);

    useImperativeHandle(ref, () => ({}));

    const onGridReady = (params) => {
      // const allColumnIds = params.columnApi.getAllColumns().map((column) => column.colId);
      const allColumnIds = [];
      params.api.getColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      params.api.sizeColumnsToFit(allColumnIds);
    };

    const isRowSelectable = useCallback((params) => {
      return !!params.data && condsParamsFirst;
    }, []);

    const onFirstDataRendered = useCallback((params) => {
      const nodesToSelect = [];
      params.api.forEachNode((node) => {
        if (node.data && condsParamsFirst) {
          nodesToSelect.push(node);
        }
      });

      params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
    }, []);

    //
    const _onSelectionChanged = (event) => {
      const _rowSelected = event.api.getSelectedRows();

      if (event.source === "checkboxSelected" || event.source === "uiSelectAll") {
        setSelectedRows && setSelectedRows(_rowSelected);
      }

      onSelectionChanged && onSelectionChanged(event);
    };

    const onCellValueChanged = (params) => {
      onChangeValue && onChangeValue({ params, data: params.data });
    };

    const onBtFirstNextPages = useCallback((page) => {
      if (page === 1) {
        return gridRef.current.api.paginationGoToFirstPage();
      } else if (gridRef.current.api.paginationGetTotalPages() === page) {
        return gridRef.current.api.paginationGoToLastPage();
      } else gridRef.current.api.paginationGoToPage(page - 1);
    }, []);
    const getRowHeight = useCallback((params) => {
      return rowHeight ? rowHeight : 36;
    }, []);
    const paginationPageSizeSelector = useMemo(() => {
      return [50, 100, 150, 200];
    }, []);

    const icons = useMemo(() => {
      return {
        menu: '<img src="/image/icon/ant-design--filter-outlined.svg" alt="" style="opacity: 0.5"/>',
      };
    }, []);

    const onRowClicked = useCallback(async (event) => {
      onRowClickedCus && onRowClickedCus(event);
    }, []);

    const onCellClicked = (params) => {
      if (params.data?.deleted !== 1) {
        params.api.startEditingCell({
          rowIndex: params?.rowIndex,
          colKey: params?.column.colId,
        });
      }
    };

    return (
      <div className="w-100">
        <Spin spinning={formLoading}>
          {/* <div className="box__body ag-theme-alpine"> */}
          <div className={"ag-theme-quartz hide-paging box__body"}>
            <AgGridReact
              className={`table-auto-width ${className}`}
              containerStyle={{
                width: "100%",
                border: "1px solid var(--ssi-table-border)",
                borderRadius: "8px 8px 0 0",
                height: "calc(100vh - 400px)",
                ...containerStyle,
              }}
              //sondt render row
              deltaRowDataMode={true}
              getRowId={(params) => {
                return params.data?.[rowId];
              }}
              //
              domLayout="normal"
              ref={gridRef}
              columnDefs={[
                ...(rowDatacColumn && typeof rowDatacColumn === "function"
                  ? rowDatacColumn(clNameList)
                  : rowDatacColumn
                )?.map((col, index) => {
                  return {
                    ...col,
                  };
                }),
              ]}
              rowData={getData}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              rowSelection={"multiple"}
              onCellValueChanged={onCellValueChanged}
              onRowValueChanged={onRowValueChanged && onRowValueChanged}
              onCellEditingStopped={onCellEditingStopped && onCellEditingStopped}
              pagination={false}
              paginationPageSize={pageSize}
              paginationPageSizeSelector={paginationPageSizeSelector}
              suppressRowClickSelection={true}
              onPaginationChanged={(event) => {
                setPageNum(gridRef?.current.api.paginationGetCurrentPage() + 1);
              }}
              // editType={"fullRow"}
              icons={icons}
              getRowHeight={getRowHeight}
              onRowClicked={onRowClicked}
              onCellClicked={onCellClicked}
              onSelectionChanged={_onSelectionChanged}
              stopEditingWhenCellsLoseFocus={true}
              suppressDragLeaveHidesColumns={false}
              singleClickEdit={true}
              // key={lang}
              overlayNoRowsTemplate={"Không có bản ghi nào được hiển thị"}
              suppressScrollOnNewData={true}
              isRowSelectable={(params) => {
                return params.data?.deleted !== 1 && isRowSelectable;
              }}
              // chạy lần đầu
              onFirstDataRendered={onFirstDataRendered}
              {...props}
            />
            {/* {paging && (
              <Pagination
                className="pagination-bar"
                currentPage={pageNum}
                sizeOption={paginationPageSizeSelector}
                totalCount={getData.length}
                pageSize={pageSize}
                onPageChange={(page) => {
                  onBtFirstNextPages(page);
                }}
                onSizeChange={(size) => {
                  setPageSize(size);
                  onBtFirstNextPages(1);
                }}
                handleExport={() => {}}
                hideFetchAgain
                hideExport={true}
              />
            )} */}
          </div>
        </Spin>
      </div>
    );
  }
);
export default EditTableCommunityAG;
