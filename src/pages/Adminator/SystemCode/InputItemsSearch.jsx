import { Form, Input, Select } from "antd";
import React from "react";

const InputItemsSearch = React.forwardRef(
  ({ controller, searchCode, pageConfig, onEvent }, ref) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Form.Item name="systemCodeId" label="System Code ID">
            <Input />
          </Form.Item>
        </div>
      </div>
    );
  }
);

export default InputItemsSearch;
