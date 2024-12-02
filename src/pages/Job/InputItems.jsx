import { Form, Input } from "antd";
import React from "react";

const InputItems = React.forwardRef(({ controller, searchCode, pageConfig, onEvent }, ref) => {
  return (
    <div>
      <div className="flex gap-4">
        <div className="w-full">
          <Form.Item name="branchGroupId" label="Mã">
            <Input />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name="Old" label="Tuổi">
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <Form.Item name="name" label="Tên">
            <Input />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name="Old" label="Tuổi">
            <Input />
          </Form.Item>
        </div>
      </div>
    </div>
  );
});

export default InputItems;
