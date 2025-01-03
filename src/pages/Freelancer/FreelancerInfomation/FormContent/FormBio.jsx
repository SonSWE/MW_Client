import { Form, Input } from "antd";
import { FormFreelancer } from "../../../../const/FormFreelancer";
import { useGlobalConst } from "../../../../utils/constData";

const FormBio = ({ formInstance }) => {
  const globalConst = useGlobalConst();

  return (
    <div>
      <Form.Item
        name={FormFreelancer.Bio}
        label="Giới thiệu bản thân"
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input.TextArea rows={4} maxLength={1000} />
      </Form.Item>
    </div>
  );
};

export default FormBio;
