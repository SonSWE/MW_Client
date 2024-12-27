import { Form, Input, Select } from "antd";
import React from "react";
import { FormSystemCode } from "../../../const/FormSystemCode";

const InputItemsSearch = React.forwardRef(
  ({ controller, searchCode, pageConfig, onEvent }, ref) => {
    return (
      <div className="form-one-col">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <Form.Item name={FormSystemCode.SystemCodeId} label="System Code ID">
              <Input />
            </Form.Item>
          </div>
        </div>
      </div>
    );
  }
);

export default InputItemsSearch;
