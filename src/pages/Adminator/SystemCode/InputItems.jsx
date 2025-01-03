import { Button, Form, Input, Modal, Popconfirm, Tooltip } from "antd";
import React, { useImperativeHandle, useRef } from "react";
import { GroupBox } from "../../../components/element/GroupBox";
import { FormSystemCode, FormSystemCodeValue } from "../../../const/FormSystemCode";
import { convertToArray, isNullOrEmpty, isRender, makeid } from "../../../utils/utils";
import EditTableCommunityAG from "../../../components/controls/EditTableCommunityAG";
import { columnSystemCodeValue } from "./comom";
import { usePopupNotification } from "../../../utils/formHelper";
import delteteicon from "../../../assets/image/icon/ic_tip_delete.svg";
import addicon from "../../../assets/image/icon/ic_add_form.svg";
import { useGlobalConst } from "../../../utils/constData";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const notification = usePopupNotification();
  const globalConst = useGlobalConst();
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {
      if (values?.[FormSystemCode.SystemCodeValues]?.length > 0) {
        formInstance.setFieldValue(
          FormSystemCode.SystemCodeValues,
          values?.[FormSystemCode.SystemCodeValues].map((e, i) => ({ ...e, id: makeid() + i }))
        );
      }
    },
  }));

  const rowDatacColumn = (props) => {
    return [
      ...columnSystemCodeValue({
        disabled,
        handleAddRowAsync,
        action,
      }),
    ];
  };

  const handleRemoveRows = (type) => {
    let datas = convertToArray(formInstance.getFieldValue(FormSystemCode.SystemCodeValues));
    let _rowSelected = gridRef?.current?.api.getSelectedRows();

    if (_rowSelected?.length > 0) {
      formInstance.setFieldValue(FormSystemCode.SystemCodeValues, [
        ...datas.filter((x) => !_rowSelected.some((r) => r.id === x.id)),
      ]);
    } else {
      notification.error({
        message: `Thất bại`,
        description: `Không có dữ liệu được chọn`,
      });
    }
  };

  const handleAddRowAsync = async () => {
    const value = await formInstance.getFieldValue(FormSystemCode.SystemCodeValues);
    let data = convertToArray(value);
    const newId = makeid();
    const newRow = {
      id: newId,
    };
    if (data.length === 0) {
      await formInstance.setFieldValue(FormSystemCode.SystemCodeValues, [newRow]);
    } else {
      await formInstance.setFieldValue(FormSystemCode.SystemCodeValues, [...data, newRow]);
    }

    return newId;
  };
  const validateEdit = (oldDatas, data, rowIndex) => {
    if (oldDatas.length <= 1) return true;

    let rowValue = oldDatas.filter(
      (e) =>
        e.id !== data.id &&
        e?.[FormSystemCodeValue.Value] === data?.[FormSystemCodeValue.Value] &&
        !isNullOrEmpty(data?.[FormSystemCodeValue.Value])
    );

    if (rowValue.length > 0) {
      Modal.error({
        message: "Thông báo",
        description: `Dữ liệu không hợp lệ ${rowIndex + 1 ?? 0}`,
      });

      return false;
    }
    return true;
  };

  const onCellEditingStopped = (params) => {
    //dữ liệu không thay đổi
    if (params.valueChanged === false) return;

    const { data } = params;
    const oldDatas = formInstance.getFieldValue(FormSystemCode.SystemCodeValues);

    if (!validateEdit(oldDatas, data, params.rowIndex)) {
      formInstance.setFieldValue(FormSystemCode.SystemCodeValues, [...oldDatas]);
    } else {
      //data onchange of current datagrid
      let rowData = [];
      params.api.forEachNode((node) => {
        if (node.rowIndex === params.node.rowIndex) {
          let newData = { ...data };
          rowData.push(newData);
        } else {
          rowData.push(node.data);
        }
      });

      formInstance.setFieldValue(FormSystemCode.SystemCodeValues, [...rowData]);
    }
  };

  const _rowProps = (type) => {
    let list = convertToArray(formInstance.getFieldValue(FormSystemCode.SystemCodeValues));

    return {
      rowDatacColumn,
      getData: [...list],
      gridRef: gridRef,
      onCellEditingStopped,
      containerStyle: {
        height: "300px",
      },
    };
  };
  return (
    <div className="form-two-col">
      <div className="group-items">
        <Form.Item name={FormSystemCode.SystemCodeValues} hidden />
        <div className="item-group">
          <Form.Item
            name={FormSystemCode.SystemCodeId}
            label="System Code ID"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input
              onChange={(e) => {
                formInstance.setFieldValue(
                  FormSystemCode.SystemCodeId,
                  e.target.value.toUpperCase()
                );
              }}
            />
          </Form.Item>
        </div>
        <div className="item-group">
          <Form.Item
            name={FormSystemCode.Name}
            label="Tên"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input maxLength={250} />
          </Form.Item>
        </div>
      </div>
      <div className="row-item">
        <GroupBox title={"Danh sách System Code Value"} className="mt-4">
          <div className="w-full flex justify-end items-center gap-4">
            <Button onClick={(e) => handleAddRowAsync()} disabled={disabled}>
              <img src={addicon} alt="" />
              <span>{"Thêm"}</span>
            </Button>
            <Button disabled={disabled}>
              <Tooltip placement="right" title={"Xóa"}>
                <Popconfirm
                  title={"Bạn có chắc chắn muốn xóa thông tin này"}
                  onConfirm={() => {
                    handleRemoveRows();
                  }}
                  placement="bottom"
                  className="w-full"
                >
                  <div className="flex items-center gap-1">
                    <span>
                      <img className="imgbefore-hv" src={delteteicon} alt="img" />
                    </span>
                    <div className="name-function-fix">Xóa</div>
                  </div>
                </Popconfirm>
              </Tooltip>
            </Button>
          </div>

          <Form.Item
            className="pt-3 w-100"
            shouldUpdate={(prevValues, currentValues) =>
              isRender(prevValues, currentValues, [FormSystemCode.SystemCodeValues])
            }
          >
            {() => <EditTableCommunityAG {..._rowProps()} />}
          </Form.Item>
        </GroupBox>
      </div>
    </div>
  );
});

export default InputItems;
