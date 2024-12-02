import { Form, Input, Select } from "antd";
import React from "react";
import { FormSysParam } from "../../../const/FormSysParam";

const InputItemsSearch = React.forwardRef(
  ({ controller, searchCode, pageConfig, onEvent }, ref) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Form.Item name={FormSysParam.SysParamId} label="System Code ID">
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
            <Select options={[{ value: "sample", label: <span>sample</span> }]} />
          </Form.Item>
        </div>
      </div>
    );
  }
);

export default InputItemsSearch;
