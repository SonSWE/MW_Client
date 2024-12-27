import React, { useEffect, useState } from "react";
import { useBusinessAction } from "./BusinessAction";
import { useSelector } from "react-redux";
import { Avatar, Button, Form, Image } from "antd";
import { FormCertificate, FormEducation, FormFreelancer } from "../../../const/FormFreelancer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faLocation,
  faLocationDot,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { CONST_YN } from "../../../const/FormConst";
import { PriceFormatter } from "../../../utils/convertData";
import BaseModal from "../../../components/controls/BaseModal";
import { useForm } from "antd/es/form/Form";
import { ACTION_INFO } from "./config";
import FormAvatar from "./FormContent/FormAvatar";
import { useNotification } from "../../../utils/formHelper";

const InputItems = React.forwardRef(({ disabled }, ref) => {
  const [infomation, setInformation] = useState();
  const apiClient = useBusinessAction();
  const userLogin = useSelector((state) => state.authReducer);
  const [formInstance] = useForm();
  const [isShowModal, setIsShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [title, setTitle] = useState("");
  const notification = useNotification();

  const showModal = (action) => {
    if (action == ACTION_INFO.Avatar) {
      setTitle("Ảnh đại diện");
    }
    setAction(action);
    setIsShowModal(true);
    formInstance.setFieldsValue(infomation);
  };

  const closeModal = () => {
    setAction("");
    setIsShowModal(false);
    formInstance.resetFields();
  };
  const onSave = () => {
    if (action === ACTION_INFO.Avatar) {
      apiClient
        .UpdateAvatar(formInstance.getFieldsValue())
        .then((res) => {
          if (res.status === 200) {
            notification.success({ message: "Cập nhật thành công" });
            LoadData();
            closeModal();
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
    }
  };

  const LoadData = () => {
    apiClient
      .GetFreelancerDetailById(userLogin.freelancer.freelancerId)
      .then((res) => {
        setInformation(res.data);
      })
      .catch((e) => {
        setInformation({});
      });
  };

  useEffect(() => {
    LoadData();
  }, [userLogin]);

  return (
    <div>
      <div className="border rounded-xl">
        <div className="p-5 flex justify-between">
          <div className="flex">
            <div className="relative">
              <Avatar shape="circle" size={80} src={infomation?.[FormFreelancer.Avatar]} />
              <div className="absolute right-[-5px] bottom-[-5px]">
                <Button
                  // type="text"
                  onClick={() => {
                    showModal(ACTION_INFO.Avatar);
                  }}
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faPencil} />}
                />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-2xl font-medium">{infomation?.[FormFreelancer.Name]}</div>
              <div className="text-label text-base">
                <FontAwesomeIcon icon={faLocationDot} size="lg" />{" "}
                {infomation?.[FormFreelancer.StreetAddress]}
              </div>
            </div>
          </div>
          <div>
            <Button className="rounded">Chế độ xem thông tin</Button>
          </div>
        </div>
        <div className="flex border-t">
          <div className="p-5 border-r min-w-[25%]">
            <div className="card">
              <div className="card-title">Trạng thái làm việc</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base text-label">Sẵn sàng làm việc</div>
                  <div className="text-[#008000]">
                    {infomation?.[FormFreelancer.IsOpeningForJob] === CONST_YN.Yes ? "Mở" : "Đóng"}
                  </div>
                </div>
                <Button
                  type="text"
                  // onClick={handleChangeOpenForJob}
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faPencil} />}
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="text-xl font-medium">Thời gian làm việc</div>
              <div className="text-label">
                Có thể làm việc {infomation?.[FormFreelancer.HourWorkingPerWeek]} tiếng/ tuần
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-between items-center mb-3">
                <div className="text-xl font-medium">Xác thực định danh</div>
              </div>

              <div className="text-label">
                <span className="font-bold">Số điện thoại:</span> Đã xác thực{" "}
                <FontAwesomeIcon icon={faCheckCircle} color="#008000" />
              </div>
              <div className="text-label">
                <span className="font-bold">Email:</span> Đã xác thực{" "}
                <FontAwesomeIcon icon={faCheckCircle} color="#008000" />
              </div>
              <div className="text-label">
                <span className="font-bold">Định danh:</span> Chưa xác thực
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-between items-center mb-3">
                <div className="text-xl font-medium">Học vấn</div>{" "}
                <Button shape="circle" icon={<FontAwesomeIcon icon={faPlus} />} />
              </div>
              {infomation?.[FormFreelancer.Educations]?.map((item, i) => (
                <div className="flex justify-between" key={i}>
                  <div>
                    <div className="text-lg font-medium">{item?.[FormEducation.SchoolName]}</div>
                    <div className="text-label">{`${item?.[FormEducation.Degree]}, ${
                      item?.[FormEducation.Major]
                    }`}</div>
                    <div className="text-label">{`${item?.[FormEducation.FromDate]}-${
                      item?.[FormEducation.EndDate]
                    }`}</div>
                  </div>
                  <div className="flex gap-3">
                    <Button shape="circle" icon={<FontAwesomeIcon icon={faPencil} />} />
                    <Button shape="circle" icon={<FontAwesomeIcon icon={faTrash} />} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full ">
            <div className="border-b">
              <div className="p-5">
                <div className="flex items-center justify-between ">
                  <div>
                    <span className="text-xl font-medium">
                      {infomation?.[FormFreelancer.Title]}{" "}
                    </span>
                    <Button shape="circle" icon={<FontAwesomeIcon icon={faPencil} />} />
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="text-xl font-medium">
                      {PriceFormatter(infomation?.[FormFreelancer.HourlyRate])}/giờ
                    </span>
                    <Button shape="circle" icon={<FontAwesomeIcon icon={faPencil} />} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="text-label">{infomation?.[FormFreelancer.Bio]}</div>
                  <Button shape="circle" icon={<FontAwesomeIcon icon={faPencil} />} />
                </div>
              </div>
            </div>
            <div className="border-b">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium">Dự án nổi bật</div>
                  <Button shape="circle" icon={<FontAwesomeIcon icon={faPlus} />} />
                </div>
                <div className="mt-5">
                  {infomation?.[FormFreelancer.SpecialtyProjects]?.map((item, i) => (
                    <div>
                      <div className="border rounded overflow-hidden">
                        <image className="w-full h-full object-cover" src={item.img} />
                      </div>
                      <div className="mt-3">{item?.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium">Lịch sử làm việc</div>
                  <Button shape="circle" icon={<FontAwesomeIcon icon={faPlus} />} />
                </div>
                <div className="mt-3">
                  {infomation?.[FormFreelancer.Educations]?.map((item, i) => (
                    <div className="flex justify-between" key={i}>
                      <div>
                        <div className="text-xl font-medium">
                          {item?.[FormEducation.SchoolName]}
                        </div>
                        <div className="text-label">{`${item?.[FormEducation.Degree]}, ${
                          item?.[FormEducation.Major]
                        }`}</div>
                        <div className="text-label">{`${item?.[FormEducation.FromDate]}-${
                          item?.[FormEducation.EndDate]
                        }`}</div>
                      </div>
                      <div className="flex gap-3">
                        <Button shape="circle" icon={<FontAwesomeIcon icon={faPencil} />} />
                        <Button shape="circle" icon={<FontAwesomeIcon icon={faTrash} />} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b">
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div className="text-xl font-medium">Kỹ năng</div>
                  <Button shape="circle" icon={<FontAwesomeIcon icon={faPlus} />} />
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  {infomation?.[FormFreelancer.SkillsText]?.split(",")?.map((item, i) => (
                    <div className="tag-skill text-s">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-xl mt-5 p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xl font-medium">Chứng chỉ</div>
          <Button shape="circle" icon={<FontAwesomeIcon icon={faPlus} />} />
        </div>
        {infomation?.[FormFreelancer.Certificates]?.map((item, i) => (
          <div className="flex justify-between" key={i}>
            <div>
              <div className="w-90 h-90">
                <image
                  className="w-full h-full object-cover"
                  src={item?.[FormCertificate.FileAttach]}
                />
              </div>
              <div>
                <div className="text-xl font-medium">{item?.[FormCertificate.Name]}</div>
                <div className="text-label">{item?.[FormCertificate.Description]}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button shape="circle" icon={<FontAwesomeIcon icon={faPencil} />} />
              <Button shape="circle" icon={<FontAwesomeIcon icon={faTrash} />} />
            </div>
          </div>
        ))}
      </div>
      {isShowModal && (
        <BaseModal
          title={title}
          onCancel={closeModal}
          centered
          open={isShowModal}
          width="90vw"
          footer={[
            <Button type="primary" key="save" onClick={onSave}>
              Lưu
            </Button>,
            <Button key="cancel" onClick={closeModal}>
              Thoát
            </Button>,
          ]}
        >
          <Form form={formInstance} className="py-5">
            <Form.Item name={FormFreelancer.FreelancerId} hidden />
            {action === ACTION_INFO.Avatar ? <FormAvatar formInstance={formInstance} /> : <></>}
          </Form>
        </BaseModal>
      )}
    </div>
  );
});

export default InputItems;
