import { Form, Input, Select } from "antd";
import React from "react";

const InputItemsSearch = React.forwardRef(
  ({ controller, searchCode, pageConfig, onEvent }, ref) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Form.Item name="Name" label="Tên">
            <Input />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name="Old" label="Tuổi">
            <Input />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name="jobType" label="Loại công việc">
            <Select
              mode="multiple"
              allowClear
              placeholder="-- Lựa chọn --"
              options={[
                { label: "IT", value: "IT" },
                { label: "Nhiếp ảnh", value: "PHOTO" },
              ]}
            />
          </Form.Item>
        </div>
      </div>
    );
  }
);

export default InputItemsSearch;
