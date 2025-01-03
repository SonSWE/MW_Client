import { Form, Input, Select } from "antd";
import React from "react";
import { FormSysParam } from "../../../const/FormSysParam";
import { useSelector } from "react-redux";
import { getSystemCodeValues } from "../../../utils/utils";

const InputItemsSearch = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  return (
    <div className="form-one-col">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Form.Item name={FormSysParam.SysParamId} label="Mã tham số">
            <Input
              onChange={(e) => {
                formInstance.setFieldValue(FormSysParam.SysParamId, e.target.value.toUpperCase());
              }}
            />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name={FormSysParam.Name} label="Tên">
            <Input />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name={FormSysParam.PValue} label="Giá trị">
            <Input />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name={FormSysParam.Content} label="Nội dung">
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name={FormSysParam.Status} label="Trạng thái">
            <Select
              allowClear
              mode="multiple"
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

export default InputItemsSearch;
