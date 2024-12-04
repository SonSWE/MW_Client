import { Form, Input, Select } from "antd";
import React from "react";
import { FormUser } from "../../../const/FormUser";
import { getSystemCodeValues } from "../../../utils/utils";
import { useSelector } from "react-redux";

const InputItemsSearch = React.forwardRef(
  ({ controller, searchCode, pageConfig, onEvent }, ref) => {
    const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

    return (
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Form.Item name={FormUser.UserName} label="Tài khoản">
            <Input />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name={FormUser.Name} label="Tên">
            <Input />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name={FormUser.Status} label="Trạng thái">
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
    );
  }
);

export default InputItemsSearch;
