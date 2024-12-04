import { Form, Input } from "antd";
import React, { useImperativeHandle } from "react";
import { FormSpecialty } from "../../../const/FormSpecialty";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
  }));

  return (
    <div>
      <div className="group-item">
        <div className="">
          <Form.Item name={FormSpecialty.SpecialtyId} label="Mã chuyên môn">
            <Input disabled />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormSpecialty.Name} label="Tên">
            <Input />
          </Form.Item>
        </div>
      </div>
    </div>
  );
});

export default InputItems;
