import React, { useEffect, useMemo, useRef, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, Drawer, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilter,
  faMagnifyingGlass,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Header } from "../header/Header";
import BaseDataGird from "../controls/BaseDataGird";
import ModalAction from "../controls/ModalAction";
import { TYPE_ACTION } from "../../const/LayoutConst";
import { CONST_FORM_ACTION } from "../../const/FormConst";
import FooterSticky from "../footer/FooterSticky";

const LayoutManagement = ({ ComponentConfig }) => {
  const refInput = useRef(null);
  // console.log(ComponentConfig);
  //filter
  const [openFilter, setOpenFilter] = useState(false);
  const showDrawer = () => {
    setOpenFilter(true);
  };
  const onClose = () => {
    setOpenFilter(false);
  };

  const [formInstance] = Form.useForm();

  const ref = useRef({
    refHeader: useRef(null),
    refForm: useRef(null),
    refDataGrid: useRef(null),
    refFooter: useRef(null),
  });

  const onEvent = (data) => {
    if (data.type === TYPE_ACTION.BUTTON_ACTION_CLICK) {
    } else if (data.type === TYPE_ACTION.BUTTON_SAVE_CLICK) {
    } else if (data.type === TYPE_ACTION.CLOSE_MODAL) {
    } else if (data.type === TYPE_ACTION.SEARCH_DATA) {
    } else if (data.type === TYPE_ACTION.SAVE_DATA_SUCCESS) {
      Search();
    }

    return {
      Header: ref.current.refHeader?.current?.onEvent(data),
      Form: ref.current.refForm?.current?.onEvent(data),
      DataGrid: ref.current.refDataGrid?.current?.onEvent(data),
      Footer: ref.current.refFooter?.current?.onEvent(data),
    };
  };

  const Search = () => {
    onEvent({
      type: TYPE_ACTION.SEARCH_DATA,
      data: formInstance.getFieldsValue(),
    });
  };

  useEffect(() => {
    Search();
  }, []);

  useEffect(() => {
    if (openFilter) {
      if (refInput.current?.triggerThayDoiBanGhi) {
        refInput.current?.triggerThayDoiBanGhi(formInstance.getFieldsValue());
      }
    }
  }, [openFilter]);

  return (
    <>
      <div className="bg-gray-50 relative">
        <div className="content-scroll">
          <Header />

          <div className="px-16 py-4 h-full ">
            <div className="bg-white p-5 rounded-lg">
              <div>
                <Form form={formInstance} className="">
                  <div className="flex justify-between w-full">
                    <div>
                      <Form.Item
                        name={ComponentConfig.pageConfig.dataGrid.quickSearchKey || "Name"}
                        label=""
                      >
                        <Input
                          placeholder="Từ khóa tìm kiếm"
                          prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                          onKeyDown={(event) => {
                            if (event.code === "Enter") {
                              //gọi lại hàm tìm kiếm
                              Search();
                            }
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="primary"
                        onClick={() => {
                          onEvent({
                            type: TYPE_ACTION.OPEN_MODAL,
                            data: { action: CONST_FORM_ACTION.Create },
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                        Thêm mới
                      </Button>
                      <div>
                        <Button icon={<FontAwesomeIcon icon={faFilter} />} onClick={showDrawer}>
                          Bộ lọc
                        </Button>
                        <Drawer
                          title="Bộ lọc"
                          open={openFilter}
                          onClose={onClose}
                          footer={
                            <div className="flex gap-3 w-full justify-end">
                              <Button
                                onClick={() => {
                                  //màn nào cũng sẽ có điều kiện tìm kiếm là name, nên khi reset thì sẽ lấy lại name để fill trả vào nếu người dùng đang nhập name
                                  //chỉ xóa các điều kiện lọc
                                  const _name = formInstance.getFieldValue("Name");

                                  formInstance.resetFields();

                                  formInstance.setFieldValue("Name", _name);

                                  //gọi lại hàm tìm kiếm
                                  Search();
                                }}
                              >
                                Xóa bộ lọc
                              </Button>
                              <Button
                                onClick={() => {
                                  //gọi hàm tìm kiếm
                                  Search();
                                }}
                                type="primary"
                              >
                                Lọc
                              </Button>
                            </div>
                          }
                        >
                          <ComponentConfig.pageConfig.config.InputItemsSearch
                            formInstance={formInstance}
                            ref={refInput}
                          />
                        </Drawer>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
              <BaseDataGird
                config={ComponentConfig.pageConfig}
                searchCode={ComponentConfig.pageConfig.dataGrid.searchCode}
                ref={ref.current.refDataGrid}
                onEvent={onEvent}
              />
            </div>
          </div>
        </div>
        <FooterSticky />
      </div>
      <ModalAction
        pageConfig={ComponentConfig.pageConfig}
        ref={ref.current.refForm}
        onEvent={onEvent}
      />
    </>
  );
};

export default LayoutManagement;
