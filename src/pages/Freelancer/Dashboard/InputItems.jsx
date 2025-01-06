import { Avatar, Button, Input, Progress, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import { convertToArray, isNullOrEmpty } from "../../../utils/utils";

import { useNotification, usePopupNotification } from "../../../utils/formHelper";

import avt from "../../../assets/image/avtar.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPencil } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { CONST_YN } from "../../../const/FormConst";
import { useBusinessAction } from "./BusinessAction";
import { FormFreelancer } from "../../../const/FormFreelancer";

import ListJob from "./ListJob";
import { FormJob } from "../../../const/FormJob";
import { useSelector } from "react-redux";
import BaseAvatar from "../../../components/element/BaseAvatar";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const apiClient = useBusinessAction();
  const popup = usePopupNotification();
  const notification = useNotification();
  const [jobsSuggest, setJobSuggest] = useState([]);
  const [jobsSaved, setJobsSaved] = useState([]);
  const userLogged = useSelector((state) => state.authReducer);

  const LoadJobsSuggest = () => {
    apiClient
      .GetSuggestByFreelancer(userLogged.freelancer?.freelancerId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setJobSuggest(convertToArray(res.data));
        }
      })
      .catch((e) => {
        setJobSuggest([]);
      });
  };

  const LoadJobsSaved = () => {
    apiClient
      .GetJobsSaved(userLogged.freelancer?.freelancerId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setJobsSaved([...convertToArray(res.data)]);
        }
      })
      .catch((e) => {
        setJobsSaved([]);
      });
  };
  useEffect(() => {
    LoadJobsSuggest();
    LoadJobsSaved();

    if (userLogged?.isEkycVerified === CONST_YN.No) {
      const modal = popup.confirmDuplicate({
        message: "Cảnh báo",
        description: "Bạn cần xác thực tài khoản để có thể thực hiện các chức năng trên ứng dụng.",
        onOk: (close) => {
          window.location.href = "/xac-thuc-tai-khoan";
        },
      });
    }
  }, []);

  const navigate = useNavigate();

  const goToSearch = (value = "") => {
    navigate(`/tim-viec-nang-cao?value=${value}`); // Chuyển đến trang /target-page
  };

  const handleChangeOpenForJob = () => {
    const description =
      userLogged?.freelancer?.isOpeningForJob === CONST_YN.Yes
        ? "Bạn có chắn chắn muốn tắt trạng thái sẵn sàng nhận việc"
        : "Bạn có chắn chắn muốn bật trạng thái sẵn sàng nhận việc";
    const newValue =
      userLogged?.freelancer?.isOpeningForJob === CONST_YN.Yes ? CONST_YN.No : CONST_YN.Yes;

    popup.confirmDuplicate({
      description: description,
      onOk: (close) => {
        apiClient
          .UpdateIsOpenForJob({
            [FormFreelancer.FreelancerId]: userLogged?.freelancer?.[[FormFreelancer.FreelancerId]],
            [FormFreelancer.IsOpeningForJob]: newValue,
          })
          .then((res) => {
            if (res.status === 200) {
              close();
              notification.success({ message: "Cập nhật thành công" });
            }
          })
          .catch((err) => {
            if (err.response) {
              if (err.response?.data?.message) {
                notification.error({
                  message: err.response.data.message,
                });
              }
            } else if (err.request) {
              notification.error({
                message: "Không thể kết nối đến máy chủ!",
              });
            } else {
              // Lỗi khác trong quá trình gửi yêu cầu
              console.error("Error:", err.message);
            }
          });
      },
    });
  };

  const saveJob = (prop) => {
    if (prop?.[FormJob.Saved] === CONST_YN.Yes) {
      apiClient
        .RemoveSaveJob(prop)
        .then((res) => {
          if (res.status === 200 && res.data) {
            LoadJobsSaved();
          }
        })
        .catch((e) => {});
    } else {
      apiClient
        .InsertSaveJob(prop)
        .then((res) => {
          if (res.status === 200 && res.data) {
            LoadJobsSaved();
          }
        })
        .catch((e) => {});
    }
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
              children: <ListJob datas={jobsSuggest} apiClient={apiClient} saveJob={saveJob} />,
            },
            {
              label: `Đã lưu (${jobsSaved?.length})`,
              key: "3",
              children: <ListJob datas={jobsSaved} apiClient={apiClient} saveJob={saveJob} />,
            },
          ]}
        />
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="block">
              <BaseAvatar size={70} src={userLogged?.avatar} />
            </div>
            <div className="ml-5">
              <div
                className="text-lg underline  btn-text !text-black"
                onClick={() => {
                  navigate("/thong-tin-ca-nhan");
                }}
              >
                {userLogged?.fullName}
              </div>
              <div className="text-sm">{userLogged?.freelancer?.[FormFreelancer.Title]}</div>
            </div>
          </div>
          <div className="mt-2">
            <div
              className="btn-text"
              onClick={() => {
                navigate("/thong-tin-ca-nhan");
              }}
            >
              Hoàn thiện thông tin cá nhân
            </div>
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
            <Button
              type="text"
              onClick={handleChangeOpenForJob}
              shape="circle"
              icon={<FontAwesomeIcon icon={faPencil} />}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-title">Xu: 140</div>
          <div className="flex items-center justify-between">
            <div className="btn-text text-base">Chi tiết</div>
            <div className="btn-text text-base">Mua thêm</div>
          </div>
        </div>

        {/* <div className="card">
          <div className="card-title">Tùy chọn</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base">Sẵn sàng làm việc</div>
              <div className="text-label">Mở</div>
            </div>
            <Button type="text" shape="circle" icon={<FontAwesomeIcon icon={faPencil} />} />
          </div>
        </div> */}
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
