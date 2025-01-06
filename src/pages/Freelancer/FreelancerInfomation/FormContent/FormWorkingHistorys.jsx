import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import { FormWorkingHistory } from "../../../../const/FormFreelancer";
import { useGlobalConst } from "../../../../utils/constData";
import { isRender } from "../../../../utils/utils";
import { CONST_YN } from "../../../../const/FormConst";

const FormWorkingHistorys = ({ formInstance }) => {
  const globalConst = useGlobalConst();

  return (
    <div className="form-two-col">
      <div className="group-items">
        <Form.Item name={FormWorkingHistory.WorkingHistoryId} hidden />
        <div className="">
          <Form.Item
            name={FormWorkingHistory.CompanyName}
            label="Tên công ty"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            maxLength={250}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormWorkingHistory.Address}
            label="Địa chỉ"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            maxLength={250}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormWorkingHistory.Position}
            label="Vị trí làm việc"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            maxLength={250}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormWorkingHistory.FromDate}
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

        <div className="item-group">
          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              isRender(prevValues, currentValues, [FormWorkingHistory.IsCurrentlyWorkingHere])
            }
          >
            {({ getFieldValue, setFieldValue }) => {
              const checked =
                getFieldValue(FormWorkingHistory.IsCurrentlyWorkingHere) === CONST_YN.Yes
                  ? true
                  : false;
              return (
                <Form.Item
                  name={FormWorkingHistory.IsCurrentlyWorkingHere}
                  label={"Vẫn đang làm việc"}
                >
                  <Checkbox
                    checked={checked}
                    onChange={(e) => {
                      setFieldValue(
                        FormWorkingHistory.IsCurrentlyWorkingHere,
                        e.target.checked ? CONST_YN.Yes : CONST_YN.No
                      );
                    }}
                  ></Checkbox>
                </Form.Item>
              );
            }}
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              isRender(prevValues, currentValues, [FormWorkingHistory.IsCurrentlyWorkingHere])
            }
          >
            {({ getFieldValue, setFieldValue }) => {
              return (
                getFieldValue(FormWorkingHistory.IsCurrentlyWorkingHere) !== CONST_YN.Yes && (
                  <Form.Item
                    name={FormWorkingHistory.EndDate}
                    label="Ngày kết thúc"
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
                )
              );
            }}
          </Form.Item>
        </div>

        <div className="">
          <Form.Item name={FormWorkingHistory.Description} label="Mô tả thêm" maxLength={500}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default FormWorkingHistorys;
