import { Form, Input, Select } from "antd";
import React, { useImperativeHandle } from "react";
import { FormSysParam } from "../../../const/FormSysParam";
import { useSelector } from "react-redux";
import { getSystemCodeValues } from "../../../utils/utils";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
    fillGiaTriBanDau: () => {},
    fillGiaTriThemMoi: () => {},
    refreshData: () => {
      formInstance?.resetFields();
    },
  }));

  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  return (
    <div>
      <div className="group-item">
        <div className="">
          <Form.Item name={FormSysParam.SysParamId} label="Mã tham số">
            <Input
              onChange={(e) => {
                formInstance.setFieldValue(FormSysParam.SysParamId, e.target.value.toUpperCase());
              }}
            />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormSysParam.Name} label="Tên">
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormSysParam.PValue} label="Giá trị">
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormSysParam.Content} label="Nội dung">
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>

        <div className="">
          <Form.Item name={FormSysParam.Status} label="Trạng thái">
            <Select
              options={[
                ...getSystemCodeValues(systemCodes, "PARAM_STATUS")?.map((e) => ({
                  value: e.value,
                  label: <span>{e.description}</span>,
                })),
              ]}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
});

export default InputItems;
