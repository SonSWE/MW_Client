import { Form, Image } from "antd";
import { FormFreelancer } from "../../../../const/FormFreelancer";
import { GetUrlFileFromStorageAsync, isNullOrEmpty, isRender } from "../../../../utils/utils";
import { useEffect, useState } from "react";
import { BaseUploadImage } from "../../../../components/element/BaseUploadImage";

const FormAvatar = ({ formInstance }) => {
  const [fileList, setFileList] = useState([]);

  const GetUrlFile = async (fileName) => {
    if (isNullOrEmpty(fileName)) {
      return;
    }
    const url = await GetUrlFileFromStorageAsync(fileName);
  
    formInstance.setFieldValue(FormFreelancer.Avatar, fileName);
    formInstance.setFieldValue(FormFreelancer.AvatarUrl, url);
  };

  useEffect(() => {
    setFileList([]);
  }, []);

  useEffect(() => {
    if (fileList.length > 0) {
      if (fileList[0].status === "done") {
        GetUrlFile(fileList[0]?.name);
      }
    } else {
      GetUrlFile(formInstance.getFieldValue(FormFreelancer.Avatar));
    }
  }, [fileList]);

  return (
    <div>
      <Form.Item name={FormFreelancer.AvatarUrl} hidden />
      <Form.Item name={FormFreelancer.Avatar} hidden />
      <Form.Item
        className="pt-3 w-100"
        shouldUpdate={(prevValues, currentValues) => isRender(prevValues, currentValues, [FormFreelancer.AvatarUrl])}
      >
        {({ getFieldValue }) => {
          const url = getFieldValue(FormFreelancer.AvatarUrl);
          return (
            <div>
              <Image src={url}></Image>
            </div>
          );
        }}
      </Form.Item>
      <div className="card-border">
        <div>Cập nhật ảnh đại diện</div>
        <BaseUploadImage fileList={fileList} setFileList={setFileList} multiple={false} />
      </div>
    </div>
  );
};

export default FormAvatar;
