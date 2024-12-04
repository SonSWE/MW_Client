import { Form, Input } from "antd";
import React, { useImperativeHandle } from "react";
import { FormSkill } from "../../../const/FormSkill";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
  }));

  return (
    <div>
      <div className="group-item">
        <div className="">
          <Form.Item name={FormSkill.SkillId} label="Mã">
            <Input disabled />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormSkill.Name} label="Tên">
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormSkill.Description} label="Mô tả">
            <Input />
          </Form.Item>
        </div>
      </div>
    </div>
  );
});

export default InputItems;
