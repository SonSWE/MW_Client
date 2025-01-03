import { Form, Input, Select } from "antd";
import React, { useImperativeHandle } from "react";
import { FormSysParam } from "../../../const/FormSysParam";
import { useSelector } from "react-redux";
import { getSystemCodeValues } from "../../../utils/utils";
import { useGlobalConst } from "../../../utils/constData";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const globalConst = useGlobalConst();
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
  }));

  return (
    <div className="form-two-col">
      <div className="group-items">
        <div className="">
          <Form.Item
            name={FormSysParam.SysParamId}
            label="Mã tham số"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input
              onChange={(e) => {
                formInstance.setFieldValue(FormSysParam.SysParamId, e.target.value.toUpperCase());
              }}
            />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormSysParam.Name}
            label="Tên"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormSysParam.PValue}
            label="Giá trị"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormSysParam.Content}
            label="Nội dung"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>

        <div className="">
          <Form.Item
            name={FormSysParam.Status}
            label="Trạng thái"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
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
    </div>
  );
});

export default InputItems;
