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

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const notification = useNotification();

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

  const goToSearch = (value = "") => {
    navigate(`/tim-viec-nang-cao?value=${value}`); // Chuyển đến trang /target-page
  };

  const ListJob = () => {
    return (
      <div className="list-job">
        <div className="text-sm text-label mb-4 px-4">
          Chọn những công việc phù hợp với kinh nghiệm của bạn để có cơ hội ký hợp đồng cao hơn
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
    <div className="grid grid-flow-col grid-cols-4 gap-8 p-y">
      <div className="col-span-3">
        {/* <div className="rounded-2xl overflow-hidden">
          <Carousel autoplay className="">
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div> */}
        <div className="my-5">
          <Input
            className="rounded-3xl"
            size="large"
            placeholder="Tìm kiếm công việc"
            prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onKeyDown={(event) => {
              if (event.code === "Enter" && !isNullOrEmpty(event.target.value)) {
                console.log(event.target.value)
                goToSearch(event.target.value);
              }
            }}
          />
        </div>
        <div className="text-xl">Công việc có thể bạn thích</div>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Phù hợp nhất",
              key: "1",
              children: <ListJob />,
            },
            {
              label: "Mới đăng tải",
              key: "2",
              children: <ListJob />,
            },
            {
              label: "Đã lưu (7)",
              key: "3",
              children: <ListJob />,
            },
          ]}
        />
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src={avt}></img>
            </div>
            <div className="ml-5">
              <div className="text-lg underline  btn-text !text-black">Đặng Tiến Sơn</div>
              <div className="text-sm">Nhiếp ảnh chân dung</div>
            </div>
          </div>
          <div className="mt-2">
            <div className="btn-text">Hoàn thiện thông tin cá nhân</div>
            <Progress percent={30} />
          </div>
        </div>

        <div className="card">
          <div className="card-title">Trạng thái tìm việc</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base">Sẵn sàng làm việc</div>
              <div className="text-label">Mở</div>
            </div>
            <Button type="text" shape="circle" icon={<FontAwesomeIcon icon={faPencil} />} />
          </div>
        </div>

        <div className="card">
          <div className="card-title">Xu: 140</div>
          <div className="flex items-center justify-between">
            <div className="btn-text text-base">Chi tiết</div>
            <div className="btn-text text-base">Mua thêm</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Tùy chọn</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base">Sẵn sàng làm việc</div>
              <div className="text-label">Mở</div>
            </div>
            <Button type="text" shape="circle" icon={<FontAwesomeIcon icon={faPencil} />} />
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-red-500">
    //   <div className="flex items-center">
    //     <Input />

    //   </div>

    //   {/* <BaseModal
    //     title="Tìm kiếm nâng cao"
    //     onCancel={onCancel}
    //     centered
    //     open={isModalOpen}
    //     width="90vw"
    //     footer={[
    //       <Button type="primary" key="save" onClick={handleOk}>
    //         Tìm kiếm
    //       </Button>,
    //       <Button key="cancel" onClick={onCancel}>
    //         Thoát
    //       </Button>,
    //     ]}
    //   >
    //     <Form form={formSearchAVD} className="py-5">
    //       <div>
    //         <div className="flex gap-4">
    //           <div className="w-full">
    //             <Form.Item name="branchGroupId" label="Mã">
    //               <Input />
    //             </Form.Item>
    //           </div>
    //           <div className="w-full">
    //             <Form.Item name="Old" label="Tuổi">
    //               <Input />
    //             </Form.Item>
    //           </div>
    //         </div>
    //         <div className="flex gap-4">
    //           <div className="w-full">
    //             <Form.Item name="name" label="Tên">
    //               <Input />
    //             </Form.Item>
    //           </div>
    //           <div className="w-full">
    //             <Form.Item name="Old" label="Tuổi">
    //               <Input />
    //             </Form.Item>
    //           </div>
    //         </div>
    //       </div>
    //     </Form>
    //   </BaseModal> */}
    // </div>
  );
});

export default InputItems;
