import {
  Button,
  Carousel,
  Checkbox,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Progress,
  Rate,
  Select,
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
  faArrowLeft,
  faHandHoldingDollar,
  faLocation,
  faLocationDot,
  faMagnifyingGlass,
  faPencil,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle,
  faHeart as faHeartRegular,
  faThumbsDown,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const navigate = useNavigate();
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
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const ListJob = () => {
    return (
      <div className="list-job">
        {/* <div className="text-sm text-label mb-4 px-4">
          Chọn những công việc phù hợp với kinh nghiệm của bạn để có cơ hội ký hợp đồng cao hơn
        </div> */}
        <div className="job-card" onClick={showLoading}>
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
  const defaultGetContainer = () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    return div;
  };
  return (
    <div>
      <div className="mb-8">
        <Input
          className="rounded-3xl"
          size="large"
          placeholder="Tìm kiếm công việc"
          prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              console.log(event.target.value);
              //gọi lại hàm tìm kiếm
              // Search();
            }
          }}
        />
      </div>
      <div className="grid grid-flow-col grid-cols-4 gap-8 p-y">
        <div className="col-span-1 flex flex-col gap-6">
          <div>
            <div className="text-base font-medium mb-1">Danh mục</div>
            <Select
              placeholder="-- Lựa chọn --"
              className="max-w-lg w-full"
              options={[{ value: "sample", label: <span>sample</span> }]}
            />
          </div>
          <div>
            <div className="text-base font-medium mb-1">Kinh nghiệm</div>
            <Select
              placeholder="-- Lựa chọn --"
              className="max-w-lg w-full"
              options={[
                { value: "sample", label: <span>sample</span> },
                { value: "sample1", label: <span>sample</span> },
                { value: "sample2", label: <span>sample</span> },
              ]}
              mode="multiple"
            />
          </div>
          <div>
            <div className="text-base font-medium mb-1">Loại công việc</div>
            <Checkbox className="w-full">Theo giờ</Checkbox>
            <Checkbox className="w-full mt-2">Giá cố định</Checkbox>
          </div>
          <div>
            <div className="text-base font-medium mb-1">Số lượng đề xuất</div>
            <Checkbox className="w-full">Nhỏ hơn 5</Checkbox>
            <Checkbox className="w-full mt-2">Từ 5 đến 10</Checkbox>
            <Checkbox className="w-full mt-2">Từ 10 đến 15</Checkbox>
            <Checkbox className="w-full mt-2">Từ 15 đến 20</Checkbox>
            <Checkbox className="w-full mt-2">Từ 20 đến 50</Checkbox>
          </div>
          <div>
            <div className="text-base font-medium mb-1">Khu vực</div>
            <Select
              className="max-w-lg w-full"
              placeholder="-- Lựa chọn --"
              options={[
                { value: "sample", label: <span>Hà nội</span> },
                { value: "sample1", label: <span>Đống đa</span> },
                { value: "sample2", label: <span>Cầu giấy</span> },
              ]}
              mode="multiple"
            />
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex justify-between items-center pb-2">
            <div className="w-full"></div>

            <div className="flex items-center justify-end gap-3 w-full">
              <div
                className="btn-text text-base text-nowrap"
                onClick={() => {
                  navigate(`/cong-viec-da-luu`);
                }}
              >
                <FontAwesomeIcon icon={faHeartRegular} /> Đã lưu (7)
              </div>
              <Select
                className="max-w-lg w-full"
                options={[{ value: "sample", label: <span>sample</span> }]}
              />
            </div>
          </div>
          <ListJob />
        </div>
      </div>

      <Drawer
        closable
        destroyOnClose
        // title={<p>Loading Drawer</p>}
        closeIcon={<FontAwesomeIcon icon={faArrowLeft} />}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        rootStyle={{ width: "100%" }}
        getContainer={document.querySelector(".draw-lg")}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div className="job-preview-responesive">
          <div className="preview-content grid grid-flow-col grid-cols-4">
            <div className="col-span-3 border-r ">
              <div className="p-6 border-b">
                <div className="text-2xl font-medium">Video Editor for YouTube Shorts</div>
                <div className="flex text-sm text-label">
                  <div>Đã đăng 26 phút trước</div>
                  <div>
                    <div className="ml-3">
                      <FontAwesomeIcon icon={faLocationDot} /> Hà Nội
                    </div>
                  </div>
                </div>
                <div className="py-3 display-on-sm">
                  <div className="">
                    <span>Một lần gửi đề xuất: </span>
                    <span className="font-medium">6 Connects</span>
                  </div>
                  <div className="">
                    <span>Connects khả dụng: </span>
                    <span className="font-medium">140</span>
                  </div>
                </div>
              </div>
              <div className="p-6 border-b">
                Looking for a skilled video editor to join our YouTube Automation team in the animal
                niche. Voiceover and script will be provided—your job is to transform them into
                engaging 30–60 second YouTube Shorts by compiling clips. Details: $10 per video
                edited. 2 revisions allowed per video. Videos must follow a high-energy, engaging
                style to captivate viewers. Trello will be used for task management. Requirements:
                Experience editing YouTube Shorts or similar short-form content. Proficiency in
                video editing software (Premiere Pro, Final Cut, or similar). Ability to create
                visually engaging edits in a vertical (9:16) format. Are you okay with the price? If
                not, don’t message.
              </div>
              <div className="p-6 border-b">
                <div className="grid grid-flow-col grid-cols-3 gap-12">
                  <div className="flex w-full">
                    <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
                    <div>
                      <span className="font-medium ml-2">500.000</span>
                      <div className="">Giá cố định</div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <FontAwesomeIcon icon={faUserTie} size="lg" />
                    <div>
                      <span className="font-medium ml-2 ">Entry level</span>
                      <div className="">Tôi đang tìm kiếm freelance có kinh phí thấp</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-b">
                <div className="">
                  <span className="font-medium">Loại công việc: </span>
                  <span>Thanh toán 1 lần</span>
                </div>
              </div>
              <div className="p-6 border-b">
                <div className="text-2xl mb-3">Kỹ năng và kinh nghiệm</div>
                <div className="flex flex-wrap w-2/4 gap-4">
                  <div className="tag-skill">Chụp nhân dung</div>
                  <div className="tag-skill">Chụp nhân dung</div>
                  <div className="tag-skill">Chụp concert</div>
                  <div className="tag-skill">Chụp nhân</div>
                </div>
              </div>
              <div className="p-6 border-b">
                <div className="text-2xl mb-3">Trạng thái của công việc</div>
                <div className="text-sm text-label">
                  <div>
                    <span>Đề xuất: </span>
                    <span>nhỏ hơn 5</span>
                  </div>
                  <div>
                    <span>Phỏng vấn: </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
              <div className="p-6 border-b">
                <div className="display-on-sm">
                  <div className="text-2xl mb-3">Về khách hàng</div>
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} color="green" />
                    <span> Đã xác thực thanh toán</span>
                  </div>
                  <div className="mt-2">
                    <FontAwesomeIcon icon={faCheckCircle} color="green" />
                    <span> Đã xác thực định danh</span>
                  </div>
                  <div className="mt-2 font-medium">Hà Nội</div>
                </div>
              </div>
            </div>
            <div className="col-span-1 p-8 display-on-lg">
              <div className="content-lager">
                <div>
                  <Button
                    className="w-full rounded-xl"
                    type="primary"
                    onClick={() => {
                      navigate(`/gui-de-xuat`);
                    }}
                  
                  
                  >
                    Ứng tuyển ngay
                  </Button>
                  <Button className="w-full  rounded-xl mt-4">
                    <FontAwesomeIcon icon={faHeartRegular} /> Lưu
                  </Button>
                  {/* <Button>
                    <FontAwesomeIcon icon={faHeartSolid} /> Đã lưu
                  </Button> */}
                </div>
                <div className="py-3">
                  <div className="">
                    <span>Một lần gửi đề xuất: </span>
                    <span className="font-medium">6 Connects</span>
                  </div>
                  <div className="">
                    <span>Connects khả dụng: </span>
                    <span className="font-medium">140</span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl mb-3">Về khách hàng</div>
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} color="green" />
                    <span> Đã xác thực thanh toán</span>
                  </div>
                  <div className="mt-2">
                    <FontAwesomeIcon icon={faCheckCircle} color="green" />
                    <span> Đã xác thực định danh</span>
                  </div>
                  <div className="mt-2 font-medium">Hà Nội</div>
                </div>
              </div>
            </div>
          </div>
          <div className="display-on-sm preview-footer">
            <div className="flex flex-nowrap justify-between items-center gap-8 px-6 py-2">
              <Button
                className="w-full rounded-xl"
                type="primary"
                onClick={() => {
                  navigate(`/gui-de-xuat`);
                }}
              >
                Ứng tuyển ngay
              </Button>
              <Button className="w-full  rounded-xl">
                <FontAwesomeIcon icon={faHeartRegular} /> Lưu
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
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
