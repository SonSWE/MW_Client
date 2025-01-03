import React, { useEffect, useState } from "react";
import { useBusinessAction } from "./BusinessAction";
import { useSelector } from "react-redux";
import { Avatar, Button, Form } from "antd";
import { FormCertificate, FormEducation, FormFreelancer } from "../../../const/FormFreelancer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faLocationDot,
  faPencil,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { CONST_YN } from "../../../const/FormConst";
import { PriceFormatter } from "../../../utils/convertData";
import BaseModal from "../../../components/controls/BaseModal";
import { useForm } from "antd/es/form/Form";
import { ACTION_INFO } from "./config";
import FormAvatar from "./FormContent/FormAvatar";
import { useNotification } from "../../../utils/formHelper";
import { GetUrlFileFromStorageAsync } from "../../../utils/utils";
import { FormUser } from "../../../const/FormUser";
import FormTitle from "./FormContent/FormTitle";
import FormSkill from "./FormContent/FormSkill";

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
    } else if (action == ACTION_INFO.Title) {
      setTitle("Tiêu đề");
    } else if (action == ACTION_INFO.Skill) {
      setTitle("Kỹ năng");
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

  const handleError = (err) => {
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
        .catch((err) => handleError(err));
    } else if (action === ACTION_INFO.Skill) {
      apiClient
        .UpdateSkills(formInstance.getFieldsValue())
        .then((res) => {
          if (res.status === 200) {
            notification.success({ message: "Cập nhật thành công" });
            LoadData();
            closeModal();
          }
        })
        .catch((err) => handleError(err));
    }
  };

  const LoadData = () => {
    apiClient
      .GetFreelancerDetailById(userLogin.freelancer.freelancerId)
      .then(async (res) => {
        if (res && res?.data) {
          setInformation({ ...res.data });
        }
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
              <BaseAvatar size={80} src={infomation?.[FormFreelancer.Avatar]} />
              <div className="absolute right-[-5px] bottom-[-5px]">
                <Button
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

              {/* <div className="text-label">
                <span className="font-bold">Số điện thoại: </span>
                
              </div> */}
              <div className="text-label">
                <span className="font-bold">Email:</span>{" "}
                {infomation?.[FormUser.IsEmailVerified] === CONST_YN.Yes ? (
                  <span>
                    Đã xác thực <FontAwesomeIcon icon={faCheckCircle} color="#008000" />
                  </span>
                ) : (
                  <span>
                    Chưa xác thực <FontAwesomeIcon icon={faXmark} color="red" />
                  </span>
                )}
              </div>
              <div className="text-label">
                <span className="font-bold">Định danh:</span>{" "}
                {infomation?.[FormUser.IsEkycVerified] === CONST_YN.Yes ? (
                  <span>
                    Đã xác thực <FontAwesomeIcon icon={faCheckCircle} color="#008000" />
                  </span>
                ) : (
                  <span>
                    Chưa xác thực <FontAwesomeIcon icon={faXmark} color="red" />
                  </span>
                )}
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
                    <Button
                      shape="circle"
                      icon={<FontAwesomeIcon icon={faPencil} />}
                      onClick={() => {
                        showModal(ACTION_INFO.Title);
                      }}
                    />
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
                  <Button
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faPencil} />}
                    onClick={() => {
                      showModal(ACTION_INFO.Skill);
                    }}
                  />
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
            <Form.Item name={FormFreelancer.Email} hidden />

            {action === ACTION_INFO.Avatar ? (
              <FormAvatar formInstance={formInstance} />
            ) : action === ACTION_INFO.Title ? (
              <FormTitle formInstance={formInstance} />
            ) : action === ACTION_INFO.Skill ? (
              <FormSkill formInstance={formInstance} />
            ) : (
              <></>
            )}
          </Form>
        </BaseModal>
      )}
    </div>
  );
});

export default InputItems;
