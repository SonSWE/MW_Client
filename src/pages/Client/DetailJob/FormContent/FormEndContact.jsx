import { Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { getSystemCodeValues, isRender } from "../../../../utils/utils";
import { FormContract } from "../../../../const/FormContract";
import { CONST_END_CONTRACT_REASON, useGlobalConst } from "../../../../utils/constData";
import { useEffect, useState } from "react";
import { BaseUploadFile } from "../../../../components/element/BaseUploadFile";

const FormEndContact = ({ formInstance }) => {
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);
  const globalConst = useGlobalConst();
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    formInstance.setFieldValue(FormContract.FileAttach, fileList.join("|"));
  }, [fileList]);

  return (
    <div className="form-one-col">
      <Form.Item name={FormContract.FileAttach} hidden />
      <div className="">
        <Form.Item
          name={FormContract.EndReason}
          label="Lý do"
          rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
        >
          <Select
            options={[
              ...getSystemCodeValues(systemCodes, "END_CONTRACT_REASON")?.map((e) => ({
                value: e.value,
                label: <span>{e.description}</span>,
              })),
            ]}
          />
        </Form.Item>
      </div>
      <Form.Item
        className="!p-0 !m-0"
        shouldUpdate={(prevValues, currentValues) =>
          isRender(prevValues, currentValues, [FormContract.EndReason])
        }
      >
        {({ getFieldValue }) => {
          const reason = getFieldValue(FormContract.EndReason);

          if (reason === CONST_END_CONTRACT_REASON.Complaint) {
            return (
              <div className="">
                <div className="text-lg font-medium mb-2">
                  Mô tả
                  <div className="text-base font-normal text-label">
                    Hãy mô tả lý do của bạn để chúng tôi có thể giải quyết yêu cầu của bạn một cách
                    nhanh nhất
                  </div>
                </div>
                <Form.Item
                  name={FormContract.EndReasonRemark}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Input.TextArea rows={4} maxLength={2000} />
                </Form.Item>
                <div className="text-lg font-medium mb-2">Tệp đính kèm</div>
                <BaseUploadFile fileList={fileList} setFileList={setFileList} maxFile={5} />
              </div>
            );
          } else {
            return (
              <div className="text-red-500 text-base py-5">
                Lưu ý, bạn sẽ không được hoàn lại tiền đã thanh toán nếu như đơn phương chấm dứt hợp
                đồng
              </div>
            );
          }
        }}
      </Form.Item>
    </div>
  );
};

export default FormEndContact;
