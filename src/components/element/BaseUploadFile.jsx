import { LIST_IGNORE } from "antd/es/upload/Upload";

import { deleteObject, getDownloadURL, ref as refStore, uploadBytes } from "firebase/storage";
import Dragger from "antd/es/upload/Dragger";
import { useNotification } from "../../utils/formHelper";
import { storage } from "../../utils/firebase";
import { makeid } from "../../utils/utils";

/**
 * Base is a base input component for forms.
 *
 * @param props - Tham số truyền vào .

 */
export const BaseUploadFile = ({ props, fileList, setFileList, maxFile = 1, disabled = false }) => {
  const notification = useNotification();

  const handlePreview = async (file) => {
    DowloadFileFormStorage(file.name);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleRemove = (file) => {
    const desertRef = refStore(storage, `fileAttach/${file.name}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("delete file succesfully");
      })
      .catch((error) => {
        console.log(error);
      });

    setFileList(
      fileList.filter(function (item) {
        return item.uid !== file.uid;
      })
    );
  };

  const customRequest = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fileRef = refStore(storage, `fileAttach/${file.name}`);

    uploadBytes(fileRef, file)
      .then(() => {
        onSuccess("Ok");
      })
      .catch((ex) => {
        onError();
      });
  };

  const handleBeforeUpload = (file, files) => {
    //fileList hiện tại, files ds file nhận từ thẻ input
    if (fileList.length === maxFile || files.length >= maxFile) {
      notification(`Bạn chỉ có thể tải lên tối đa ${maxFile} file`);
      return LIST_IGNORE;
    }

    const newFile = new File([file], makeid() + "_" + file.name, { type: file.type });

    return newFile;
  };

  const DowloadFileFormStorage = (fileName) => {
    getDownloadURL(refStore(storage, `fileAttach/${fileName}`))
      .then((url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  const defaultProps = {
    name: "file",
    multiple: true,
    fileList: fileList,
    beforeUpload: handleBeforeUpload,
    customRequest: customRequest,
    onRemove: handleRemove,
    onPreview: handlePreview,
    onChange: handleChange,
  };

  return (
    <Dragger {...defaultProps} {...props} disabled={disabled}>
      <p className="ant-upload-text">Click chọn hoặc kéo thả file vào đây để tải lên</p>
    </Dragger>
  );
};
