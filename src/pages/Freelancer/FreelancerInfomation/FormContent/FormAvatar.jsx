import { Form, Image } from "antd";
import { FormFreelancer } from "../../../../const/FormFreelancer";
import { isNullOrEmpty, isRender } from "../../../../utils/utils";
import { useEffect, useState } from "react";
import { BaseUploadImage } from "../../../../components/element/BaseUploadImage";
import { getDownloadURL, ref as refStore } from "firebase/storage";
import { storage } from "../../../../utils/firebase";

const FormAvatar = ({ formInstance }) => {
  const [fileList, setFileList] = useState([]);

  const GetUrlFile = (fileName) => {
    if (isNullOrEmpty(fileName)) {
      formInstance.setFieldValue(FormFreelancer.Avatar, "");
    } else {
      getDownloadURL(refStore(storage, `fileAttach/${fileName}`))
        .then((url) => {
          formInstance.setFieldValue(FormFreelancer.Avatar, url);
        })
        .catch((error) => {
          // Handle any errors
        });
    }
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
      formInstance.setFieldValue(
        FormFreelancer.Avatar,
        formInstance.getFieldValue(FormFreelancer.Avatar)
      );
    }
  }, [fileList]);

  return (
    <div>
      <Form.Item name={FormFreelancer.Avatar} hidden />
      <Form.Item
        className="pt-3 w-100"
        shouldUpdate={(prevValues, currentValues) =>
          isRender(prevValues, currentValues, [FormFreelancer.Avatar])
        }
      >
        {({ getFieldValue }) => {
          const url = getFieldValue(FormFreelancer.Avatar);
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
