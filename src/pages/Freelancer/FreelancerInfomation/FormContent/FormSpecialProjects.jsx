import { Form, Input } from "antd";
import { FormSpecialProject } from "../../../../const/FormFreelancer";
import { isRender } from "../../../../utils/utils";
import { useEffect, useState } from "react";
import { BaseUploadImage } from "../../../../components/element/BaseUploadImage";
import { useGlobalConst } from "../../../../utils/constData";
import BaseImage from "../../../../components/element/BaseImage";

const FormSpecialProjects = ({ formInstance }) => {
  const [fileList, setFileList] = useState([]);
  const globalConst = useGlobalConst();

  useEffect(() => {
    if (fileList.length > 0) {
      if (fileList[0].status === "done") {
        formInstance.setFieldValue(FormSpecialProject.FileAttach, fileList[0].name);
      }
    }
  }, [fileList]);

  return (
    <div>
      <Form.Item name={FormSpecialProject.ProjectId} hidden />
      <Form.Item name={FormSpecialProject.FileAttach} hidden />
      <div className="">
        <Form.Item
          name={FormSpecialProject.ProjectName}
          label="Tên dự án"
          rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          maxLength={250}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="card-border">
        <div>Ảnh đính chứng chỉ</div>
        <BaseUploadImage fileList={fileList} setFileList={setFileList} multiple={false} />
        <Form.Item
          className="pt-3 w-100"
          shouldUpdate={(prevValues, currentValues) =>
            isRender(prevValues, currentValues, [FormSpecialProject.FileAttach])
          }
        >
          {({ getFieldValue }) => {
            const url = getFieldValue(FormSpecialProject.FileAttach);
            return (
              <div className="flex justify-center">
                <BaseImage src={url} />
              </div>
            );
          }}
        </Form.Item>
      </div>

      <div className="">
        <Form.Item name={FormSpecialProject.Description} label="Mô tả thêm" maxLength={500}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </div>
    </div>
  );
};

export default FormSpecialProjects;
