import {
  Button,
  Carousel,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Progress,
  Rate,
  Tabs,
  Tooltip,
} from "antd";
import React, { useRef, useState } from "react";
import { GroupBox } from "../../../components/element/GroupBox";
import { FormSystemCode, FormSystemCodeValue } from "../../../const/FormSystemCode";
import { convertToArray, isNullOrEmpty, isRender, makeid } from "../../../utils/utils";
import EditTableCommunityAG from "../../../components/controls/EditTableCommunityAG";
import { columnSystemCodeValue } from "./comom";
import { useNotification } from "../../../utils/formHelper";
import delteteicon from "../../../assets/image/icon/ic_tip_delete.svg";
import addicon from "../../../assets/image/icon/ic_add_form.svg";
import BaseModal from "../../../components/controls/BaseModal";

import avt from "../../../assets/image/avtar.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faLocation,
  faLocationDot,
  faMagnifyingGlass,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle,
  faHeart as faHeartRegular,
  faThumbsDown,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Dragger from "antd/es/upload/Dragger";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const notification = useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formInstance] = Form.useForm();

  const handleOk = () => {};

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Form form={formInstance} className="py-5">
        <div>
          <div className="form-title text-2xl font-medium mb-5">Gửi đề xuất công việc</div>
          <div className="card-border">
            <div className="text-xl font-medium mb-5">Thiết lập đề xuất</div>
            <div>Đề xuất này yêu cầu 6 connects</div>
            <div>Bạn sẽ còn lại 134 sau khi gửi bản đề xuất công việc này</div>
          </div>
          <div className="card-border">
            <div className="text-xl font-medium mb-5">Chi tiết công việc</div>
            <div className="text-lg font-medium">Chỉnh sửa video ngắn đăng youtube</div>
          </div>
          <div className="card-border">
            <div className="text-xl font-medium mb-5">Điều khoản</div>
            <div className="pb-3">
              Tổng số tiền bạn muốn nhận được từ công việc này là bao nhiêu?
            </div>
            <Form.Item name="branchGroupId" label="">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Đấu thầu</div>
                  <div className="text-label">
                    Tổng số tiền khách hàng sẽ thấy trên đề xuất của bạn
                  </div>
                </div>

                <InputNumber className="w-full" />
              </div>
            </Form.Item>

            <Form.Item name="branchGroupId" label="">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Phí dịch vụ 10%</div>
                </div>

                <InputNumber className="w-full" disabled />
              </div>
            </Form.Item>

            <Form.Item name="branchGroupId" label="">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Đấu thầu</div>
                  <div className="text-label">Tổng số tiền thực tế bạn sẽ nhận được</div>
                </div>

                <InputNumber className="w-full" />
              </div>
            </Form.Item>
          </div>

          <div className="card-border">
            <div className="text-xl font-medium mb-5">Mô tả giải pháp công việc</div>
            <Form.Item name="branchGroupId" label="">
              <Input.TextArea
                style={{
                  height: 120,
                }}
              />
            </Form.Item>

            <div>Dính kèm</div>
            <Dragger {...props}>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </div>

          <div className="flex flex-nowrap justify-start items-center gap-5 py-2">
            <Button className="rounded-xl" type="primary" size="large">
              Gửi ngay bằng 6 connects
            </Button>
            <Button className="rounded-xl" size="large">
              Hủy bỏ
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
});

export default InputItems;
