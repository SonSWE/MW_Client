import { Form, Input } from "antd";
import React, { useImperativeHandle } from "react";
import { FormSkill } from "../../../const/FormSkill";

const InputItemsSearch = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
    fillGiaTriBanDau: () => {},
    fillGiaTriThemMoi: () => {},
    refreshData: () => {
      formInstance?.resetFields();
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="item-group">
        <Form.Item name={FormSkill.SkillId} label="Mã kỹ năng">
          <Input
            onChange={(e) => {
              formInstance.setFieldValue(FormSkill.SkillId, e.target.value.toUpperCase());
            }}
          />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormSkill.Name} label="Tên">
          <Input />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormSkill.Description} label="Mô tả">
          <Input />
        </Form.Item>
      </div>
    </div>
  );
});

export default InputItemsSearch;
