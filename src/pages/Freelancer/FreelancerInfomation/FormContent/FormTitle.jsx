import { Form, Input } from "antd";
import { FormFreelancer } from "../../../../const/FormFreelancer";
import { useGlobalConst } from "../../../../utils/constData";

const FormTitle = ({ formInstance }) => {
  const globalConst = useGlobalConst();

  return (
    <div>
      <Form.Item
        name={FormFreelancer.Title}
        label="Tiêu đề công việc"
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input maxLength={250} />
      </Form.Item>
    </div>
  );
};

export default FormTitle;
