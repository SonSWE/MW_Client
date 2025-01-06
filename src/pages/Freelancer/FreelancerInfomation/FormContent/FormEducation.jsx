import { DatePicker, Form, Input, Select } from "antd";
import { FormEducation } from "../../../../const/FormFreelancer";
import { useGlobalConst } from "../../../../utils/constData";
import { useSelector } from "react-redux";
import { getSystemCodeValues } from "../../../../utils/utils";

const FormEducations = ({ formInstance }) => {
  const globalConst = useGlobalConst();
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  return (
    <div className="form-two-col">
      <div className="group-items">
        <Form.Item name={FormEducation.EducationId} hidden />
        <div className="">
          <Form.Item
            name={FormEducation.SchoolName}
            label="Tên trường"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            maxLength={250}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormEducation.Degree}
            label="Bằng cấp"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Select
              options={[
                ...getSystemCodeValues(systemCodes, "DEGREE")?.map((e) => ({
                  value: e.value,
                  label: <span>{e.description}</span>,
                })),
              ]}
            />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormEducation.Major}
            label="Chuyên ngành"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            maxLength={250}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormEducation.FromDate}
            label="Ngày bắt đầu"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            {...globalConst.ANT.FORM.ITEM.PARSER.YEAR_DATABASE}
          >
            <DatePicker
              className="w-full"
              placeholder="yyyy"
              picker="year"
              format={globalConst.ANT.LOCALE.yearFormat}
            />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormEducation.EndDate}
            label="Ngày tốt nghiệp (Ngày tốt nghiệp dự tính)"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            {...globalConst.ANT.FORM.ITEM.PARSER.YEAR_DATABASE}
          >
            <DatePicker
              className="w-full"
              placeholder="yyyy"
              picker="year"
              format={globalConst.ANT.LOCALE.yearFormat}
            />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormEducation.Description} label="Mô tả thêm" maxLength={500}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default FormEducations;
