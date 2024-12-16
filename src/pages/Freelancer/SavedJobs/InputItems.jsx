import {
  Button,
  Carousel,
  Form,
  Input,
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
import { usePopupNotification } from "../../../utils/formHelper";
import delteteicon from "../../../assets/image/icon/ic_tip_delete.svg";
import addicon from "../../../assets/image/icon/ic_add_form.svg";
import BaseModal from "../../../components/controls/BaseModal";

import avt from "../../../assets/image/avtar.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
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

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const notification = usePopupNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formSearchAVD] = Form.useForm();

  const handleOk = () => {};

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const navigate = useNavigate();
  const ListJob = () => {
    return (
      <div className="list-job">
        <div className="mb-4 px-4">
          <div
            className="btn-text text-base"
            onClick={() => {
              navigate(`/tim-viec`);
            }}
          >
            <FontAwesomeIcon icon={faAnglesLeft} /> Quay lại trang tìm kiếm
          </div>
        </div>
        <div className="job-card">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-label">Đã đăng 25/11</div>
              <div className="text-lg !no-underline btn-text !text-black">
                Chụp ảnh quán ca fe cầu giấy
              </div>
            </div>
            <div className="flex">
              <Button type="text" shape="circle" icon={<FontAwesomeIcon icFon={faThumbsDown} />} />
              <Button type="text" shape="circle" icon={<FontAwesomeIcon icon={faHeartRegular} />} />
            </div>
          </div>
          <div className="mt-2 text-xs text-label">
            Giá cố định - Intermediate - Est. Budget: $50
          </div>
          <div className="mt-5 text-base text-label mt-5">
            escription: We are seeking a skilled .NET C# developer to handle the following tasks: 1.
            API Data Integration: Develop a module to import ingredient data from a specified API
            into our existing database. Ensure accurate data mapping, validation, and storage
            processes. 2. Financial Reporting: Create two financial reports using data from the
            current database: Profit and Loss Report:
          </div>
          <div className="flex items-center gap-3 mt-5">
            <div className="tag-skill">Chụp nhân dung</div>
            <div className="tag-skill">Chụp nhân dung</div>
            <div className="tag-skill">Chụp nhân dung</div>
            <div className="tag-skill">Chụp nhân dung</div>
          </div>
          <div className="flex items-center gap-8 mt-5">
            <div className="">
              <FontAwesomeIcon icon={faCheckCircle} /> <span>Thanh toán được xác thực</span>
            </div>
            <div className="">
              <Rate style={{ fontSize: "14px" }} disabled defaultValue={2} />
              <span className="ml-2"> Đã thanh toán 500K+</span>
            </div>

            <div className="">
              <FontAwesomeIcon icon={faLocationDot} /> Hà Nội
            </div>
          </div>
          <div className="mt-5 text-base text-label mt-5">Đề xuất: 5 đến 10</div>
        </div>
        <div className="job-card">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-label">Đã đăng 25/11</div>
              <div className="text-lg !no-underline btn-text !text-black">
                Chụp ảnh quán ca fe cầu giấy
              </div>
            </div>
            <div className="flex">
              <Button type="text" shape="circle" icon={<FontAwesomeIcon icFon={faThumbsDown} />} />
              <Button type="text" shape="circle" icon={<FontAwesomeIcon icon={faHeartRegular} />} />
            </div>
          </div>
          <div className="mt-2 text-xs text-label">
            Giá cố định - Intermediate - Est. Budget: $50
          </div>
          <div className="mt-5 text-base text-label mt-5">
            escription: We are seeking a skilled .NET C# developer to handle the following tasks: 1.
            API Data Integration: Develop a module to import ingredient data from a specified API
            into our existing database. Ensure accurate data mapping, validation, and storage
            processes. 2. Financial Reporting: Create two financial reports using data from the
            current database: Profit and Loss Report:
          </div>
          <div className="flex items-center gap-3 mt-5">
            <div className="tag-skill">Chụp nhân dung</div>
            <div className="tag-skill">Chụp nhân dung</div>
            <div className="tag-skill">Chụp nhân dung</div>
            <div className="tag-skill">Chụp nhân dung</div>
          </div>
          <div className="flex items-center gap-8 mt-5">
            <div className="">
              <FontAwesomeIcon icon={faCheckCircle} /> <span>Thanh toán được xác thực</span>
            </div>
            <div className="">
              <Rate style={{ fontSize: "14px" }} disabled defaultValue={2} />
              <span className="ml-2"> Đã thanh toán 500K+</span>
            </div>

            <div className="">
              <FontAwesomeIcon icon={faLocationDot} /> Hà Nội
            </div>
          </div>
          <div className="mt-5 text-base text-label mt-5">Đề xuất: 5 đến 10</div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <ListJob />
    </div>
  );
});

export default InputItems;
