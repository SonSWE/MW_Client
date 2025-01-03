import { Form, InputNumber } from "antd";
import { FormFreelancer } from "../../../../const/FormFreelancer";
import { useGlobalConst } from "../../../../utils/constData";
import { formaterNumber, parserNumber } from "../../../../utils/Format";

const FormHourlyRate = ({ formInstance }) => {
  const globalConst = useGlobalConst();

  return (
    <div>
      <Form.Item
        name={FormFreelancer.HourlyRate}
        label="Thu nhập bình quân"
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <InputNumber
          className="w-full"
          min={1000}
          step={100}
          formatter={formaterNumber}
          parser={parserNumber}
          suffix={"đ/ giờ"}
        />
      </Form.Item>
    </div>
  );
};

export default FormHourlyRate;
