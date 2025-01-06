import React, { useEffect, useState } from "react";
import { useBusinessAction } from "./BusinessAction";
import { useSelector } from "react-redux";
import { Button, Form, Rate } from "antd";
import {
  FormCertificate,
  FormEducation,
  FormFreelancer,
  FormSpecialProject,
  FormSpecialty,
  FormWorkingHistory,
} from "../../../const/FormFreelancer";
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
import { useNotification, usePopupNotification } from "../../../utils/formHelper";
import { FormUser } from "../../../const/FormUser";
import FormTitle from "./FormContent/FormTitle";
import FormSkill from "./FormContent/FormSkill";
import BaseAvatar from "../../../components/element/BaseAvatar";
import FormHourlyRate from "./FormContent/FormHourlyRate";
import FormBio from "./FormContent/FormBio";
import FormEducations from "./FormContent/FormEducation";
import { convertToArray } from "../../../utils/utils";
import FormWorkingHistorys from "./FormContent/FormWorkingHistorys";
import FormCertificates from "./FormContent/FormCertificates";
import BaseImage from "../../../components/element/BaseImage";
import FormSpecialProjects from "./FormContent/FormSpecialProjects";
import { FormFeedback } from "../../../const/FormFeedback";
import BaseImageList from "../../../components/element/BaseImageList";

const InputItems = React.forwardRef(({ disabled }, ref) => {
  const [infomation, setInformation] = useState();
  const apiClient = useBusinessAction();
  const popup = usePopupNotification();
  const userLogin = useSelector((state) => state.authReducer);
  const [formInstance] = useForm();
  const [isShowModal, setIsShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [title, setTitle] = useState("");
  const notification = useNotification();

  const showModal = (action, data) => {
    if (action == ACTION_INFO.Avatar) {
      setTitle("Ảnh đại diện");
    } else if (action == ACTION_INFO.Title) {
      setTitle("Tiêu đề");
    } else if (action == ACTION_INFO.HourlyRate) {
      setTitle("Thu nhập bình quân");
    } else if (action == ACTION_INFO.Bio) {
      setTitle("Giới thiệu bản thân");
    } else if (action == ACTION_INFO.Skill) {
      setTitle("Kỹ năng");
    } else if (action == ACTION_INFO.EDU_INSERT) {
      setTitle("Thêm học vấn");
    } else if (action == ACTION_INFO.EDU_UPDATE) {
      setTitle("Sửa học vấn");
    } else if (action == ACTION_INFO.WH_INSERT) {
      setTitle("Thêm lịch sử làm việc");
    } else if (action == ACTION_INFO.WH_UPDATE) {
      setTitle("Sửa lịch sử làm việc");
    } else if (action == ACTION_INFO.CERT_INSERT) {
      setTitle("Thêm chứng chỉ");
    } else if (action == ACTION_INFO.CERT_UPDATE) {
      setTitle("Sửa chứng chỉ");
    } else if (action == ACTION_INFO.PROJECT_INSERT) {
      setTitle("Thêm dự án nổi bật");
    } else if (action == ACTION_INFO.PROJECT_UPDATE) {
      setTitle("Sửa dự án nổi bật");
    }
    setAction(action);
    setIsShowModal(true);
    formInstance.setFieldsValue({ ...infomation, ...data });
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
      return apiClient
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
        .Update({
          ...infomation,
          ...formInstance.getFieldsValue(),
        })
        .then((res) => {
          if (res.status === 200) {
            notification.success({ message: "Cập nhật thành công" });
            LoadData();
            closeModal();
          }
        })
        .catch((err) => handleError(err));
    } else if (action === ACTION_INFO.EDU_UPDATE) {
      formInstance.submit();
      formInstance.validateFields().then((values) => {
        //thêm thông tin vào ds hiện tại
        const oldDatas = [...convertToArray(values?.[FormFreelancer.Educations])];

        const newDatas = oldDatas.map((e) =>
          e?.[FormEducation.EducationId] === values?.[FormEducation.EducationId]
            ? {
                [FormEducation.EducationId]: values?.[FormEducation.EducationId],
                [FormFreelancer.FreelancerId]: values?.[FormFreelancer.FreelancerId],
                [FormEducation.SchoolName]: values?.[FormEducation.SchoolName],
                [FormEducation.Degree]: values?.[FormEducation.Degree],
                [FormEducation.Major]: values?.[FormEducation.Major],
                [FormEducation.FromDate]: values?.[FormEducation.FromDate],
                [FormEducation.EndDate]: values?.[FormEducation.EndDate],
                [FormEducation.Description]: values?.[FormEducation.Description],
              }
            : e
        );

        apiClient
          .Update({ ...infomation, [FormFreelancer.Educations]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Cập nhật thành công" });
              LoadData();
              closeModal();
            }
          })
          .catch((err) => handleError(err));
      });
    } else if (action === ACTION_INFO.EDU_INSERT) {
      formInstance.submit();
      formInstance.validateFields().then((values) => {
        //thêm thông tin vào ds hiện tại
        const oldDatas = convertToArray(values?.[FormFreelancer.Educations]);

        const newDatas = [
          ...oldDatas,
          {
            [FormFreelancer.FreelancerId]: values?.[FormFreelancer.FreelancerId],
            [FormEducation.SchoolName]: values?.[FormEducation.SchoolName],
            [FormEducation.Degree]: values?.[FormEducation.Degree],
            [FormEducation.Major]: values?.[FormEducation.Major],
            [FormEducation.FromDate]: values?.[FormEducation.FromDate],
            [FormEducation.EndDate]: values?.[FormEducation.EndDate],
            [FormEducation.Description]: values?.[FormEducation.Description],
          },
        ];
        apiClient
          .Update({ ...infomation, [FormFreelancer.Educations]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Thêm mới thành công" });
              LoadData();
              closeModal();
            }
          })
          .catch((err) => handleError(err));
      });
    } else if (action === ACTION_INFO.WH_INSERT) {
      formInstance.submit();
      formInstance.validateFields().then((values) => {
        //thêm thông tin vào ds hiện tại
        const oldDatas = convertToArray(values?.[FormFreelancer.WorkingHistories]);

        const newDatas = [
          ...oldDatas,
          {
            [FormFreelancer.FreelancerId]: values?.[FormFreelancer.FreelancerId],
            [FormWorkingHistory.CompanyName]: values?.[FormWorkingHistory.CompanyName],
            [FormWorkingHistory.Address]: values?.[FormWorkingHistory.Address],
            [FormWorkingHistory.Position]: values?.[FormWorkingHistory.Position],
            [FormWorkingHistory.FromDate]: values?.[FormWorkingHistory.FromDate],
            [FormWorkingHistory.EndDate]: values?.[FormWorkingHistory.EndDate],
            [FormWorkingHistory.IsCurrentlyWorkingHere]:
              values?.[FormWorkingHistory.IsCurrentlyWorkingHere],
            [FormWorkingHistory.Description]: values?.[FormWorkingHistory.Description],
          },
        ];
        apiClient
          .Update({ ...infomation, [FormFreelancer.WorkingHistories]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Thêm mới thành công" });
              LoadData();
              closeModal();
            }
          })
          .catch((err) => handleError(err));
      });
    } else if (action === ACTION_INFO.WH_UPDATE) {
      formInstance.submit();
      formInstance.validateFields().then((values) => {
        //thêm thông tin vào ds hiện tại
        const oldDatas = [...convertToArray(values?.[FormFreelancer.WorkingHistories])];

        const newDatas = oldDatas.map((e) =>
          e?.[FormWorkingHistory.WorkingHistoryId] === values?.[FormWorkingHistory.WorkingHistoryId]
            ? {
                [FormWorkingHistory.WorkingHistoryId]:
                  values?.[FormWorkingHistory.WorkingHistoryId],
                [FormFreelancer.FreelancerId]: values?.[FormFreelancer.FreelancerId],
                [FormWorkingHistory.CompanyName]: values?.[FormWorkingHistory.CompanyName],
                [FormWorkingHistory.Address]: values?.[FormWorkingHistory.Address],
                [FormWorkingHistory.Position]: values?.[FormWorkingHistory.Position],
                [FormWorkingHistory.FromDate]: values?.[FormWorkingHistory.FromDate],
                [FormWorkingHistory.EndDate]: values?.[FormWorkingHistory.EndDate],
                [FormWorkingHistory.IsCurrentlyWorkingHere]:
                  values?.[FormWorkingHistory.IsCurrentlyWorkingHere],
                [FormWorkingHistory.Description]: values?.[FormWorkingHistory.Description],
              }
            : e
        );

        apiClient
          .Update({ ...infomation, [FormFreelancer.WorkingHistories]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Cập nhật thành công" });
              LoadData();
              closeModal();
            }
          })
          .catch((err) => handleError(err));
      });
    } else if (action === ACTION_INFO.CERT_INSERT) {
      formInstance.submit();
      formInstance.validateFields().then((values) => {
        //thêm thông tin vào ds hiện tại
        const oldDatas = convertToArray(values?.[FormFreelancer.Certificates]);

        const newDatas = [
          ...oldDatas,
          {
            [FormFreelancer.FreelancerId]: values?.[FormFreelancer.FreelancerId],
            [FormCertificate.CertificateName]: values?.[FormCertificate.CertificateName],
            [FormCertificate.FileAttach]: values?.[FormCertificate.FileAttach],
            [FormCertificate.Description]: values?.[FormCertificate.Description],
          },
        ];
        apiClient
          .Update({ ...infomation, [FormFreelancer.Certificates]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Thêm mới thành công" });
              LoadData();
              closeModal();
            }
          })
          .catch((err) => handleError(err));
      });
    } else if (action === ACTION_INFO.CERT_UPDATE) {
      formInstance.submit();
      formInstance.validateFields().then((values) => {
        //thêm thông tin vào ds hiện tại
        const oldDatas = [...convertToArray(values?.[FormFreelancer.Certificates])];

        const newDatas = oldDatas.map((e) =>
          e?.[FormCertificate.CertificateId] === values?.[FormCertificate.CertificateId]
            ? {
                [FormWorkingHistory.CertificateId]: values?.[FormCertificate.CertificateId],
                [FormFreelancer.FreelancerId]: values?.[FormFreelancer.FreelancerId],
                [FormCertificate.CertificateName]: values?.[FormCertificate.CertificateName],
                [FormCertificate.FileAttach]: values?.[FormCertificate.FileAttach],
                [FormCertificate.Description]: values?.[FormCertificate.Description],
              }
            : e
        );

        apiClient
          .Update({ ...infomation, [FormFreelancer.Certificates]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Cập nhật thành công" });
              LoadData();
              closeModal();
            }
          })
          .catch((err) => handleError(err));
      });
    } else if (action === ACTION_INFO.PROJECT_INSERT) {
      formInstance.submit();
      formInstance.validateFields().then((values) => {
        //thêm thông tin vào ds hiện tại
        const oldDatas = convertToArray(values?.[FormFreelancer.SpecialProjects]);

        const newDatas = [
          ...oldDatas,
          {
            [FormFreelancer.FreelancerId]: values?.[FormFreelancer.FreelancerId],
            [FormSpecialProject.ProjectId]: values?.[FormSpecialProject.ProjectId],
            [FormSpecialProject.ProjectName]: values?.[FormSpecialProject.ProjectName],
            [FormSpecialProject.FileAttach]: values?.[FormSpecialProject.FileAttach],
            [FormSpecialProject.Description]: values?.[FormSpecialProject.Description],
          },
        ];
        apiClient
          .Update({ ...infomation, [FormFreelancer.SpecialProjects]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Thêm mới thành công" });
              LoadData();
              closeModal();
            }
          })
          .catch((err) => handleError(err));
      });
    } else if (action === ACTION_INFO.PROJECT_UPDATE) {
      formInstance.submit();
      formInstance.validateFields().then((values) => {
        //thêm thông tin vào ds hiện tại
        const oldDatas = [...convertToArray(values?.[FormFreelancer.SpecialProjects])];

        const newDatas = oldDatas.map((e) =>
          e?.[FormCertificate.CertificateId] === values?.[FormCertificate.CertificateId]
            ? {
                [FormFreelancer.FreelancerId]: values?.[FormFreelancer.FreelancerId],
                [FormSpecialProject.ProjectId]: values?.[FormSpecialProject.ProjectId],
                [FormSpecialProject.ProjectName]: values?.[FormSpecialProject.ProjectName],
                [FormSpecialProject.FileAttach]: values?.[FormSpecialProject.FileAttach],
                [FormSpecialProject.Description]: values?.[FormSpecialProject.Description],
              }
            : e
        );

        apiClient
          .Update({ ...infomation, [FormFreelancer.SpecialProjects]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Cập nhật thành công" });
              LoadData();
              closeModal();
            }
          })
          .catch((err) => handleError(err));
      });
    }
  };

  const deleteEducation = (id) => {
    popup.confirmDuplicate({
      message: "Cảnh báo",
      description: "Bạn có chắc chắn muốn xóa học vấn này",
      onOk: (close) => {
        const oldDatas = convertToArray(infomation?.[FormFreelancer.Educations]);

        const newDatas = convertToArray(
          oldDatas.filter((x) => x?.[FormEducation.EducationId] !== id)
        );

        apiClient
          .Update({ ...infomation, [FormFreelancer.Educations]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Xóa thành công" });
              LoadData();
              closeModal();
              close();
            }
          })
          .catch((err) => handleError(err));
      },
    });
  };

  const deleteWorkingHis = (id) => {
    popup.confirmDuplicate({
      message: "Cảnh báo",
      description: "Bạn có chắc chắn muốn xóa lịch sử làm việc này",
      onOk: (close) => {
        const oldDatas = convertToArray(infomation?.[FormFreelancer.WorkingHistories]);

        const newDatas = convertToArray(
          oldDatas.filter((x) => x?.[FormWorkingHistory.WorkingHistoryId] !== id)
        );

        apiClient
          .Update({ ...infomation, [FormFreelancer.WorkingHistories]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Xóa thành công" });
              LoadData();
              closeModal();
              close();
            }
          })
          .catch((err) => handleError(err));
      },
    });
  };

  const deleteCertificate = (id) => {
    popup.confirmDuplicate({
      message: "Cảnh báo",
      description: "Bạn có chắc chắn muốn xóa chứng chỉ này",
      onOk: (close) => {
        const oldDatas = convertToArray(infomation?.[FormFreelancer.Certificates]);

        const newDatas = convertToArray(
          oldDatas.filter((x) => x?.[FormCertificate.CertificateId] !== id)
        );

        apiClient
          .Update({ ...infomation, [FormFreelancer.Certificates]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Xóa thành công" });
              LoadData();
              closeModal();
              close();
            }
          })
          .catch((err) => handleError(err));
      },
    });
  };

  const deleteSpecialProject = (id) => {
    popup.confirmDuplicate({
      message: "Cảnh báo",
      description: "Bạn có chắc chắn muốn xóa dự án nổi bật này",
      onOk: (close) => {
        const oldDatas = convertToArray(infomation?.[FormFreelancer.SpecialProjects]);

        const newDatas = convertToArray(
          oldDatas.filter((x) => x?.[FormSpecialProject.ProjectId] !== id)
        );

        apiClient
          .Update({ ...infomation, [FormFreelancer.SpecialProjects]: newDatas })
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Xóa thành công" });
              LoadData();
              closeModal();
              close();
            }
          })
          .catch((err) => handleError(err));
      },
    });
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
                <Button
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  onClick={() => {
                    showModal(ACTION_INFO.EDU_INSERT);
                  }}
                />
              </div>
              {infomation?.[FormFreelancer.Educations]?.map((item, i) => (
                <div className="flex justify-between" key={i}>
                  <div>
                    <div className="text-lg font-medium">{item?.[FormEducation.SchoolName]}</div>
                    <div className="text-label">{`${item?.[FormEducation.DegreeText]}, ${
                      item?.[FormEducation.Major]
                    }`}</div>
                    <div className="text-label">{`${item?.[FormEducation.FromDate]}-${
                      item?.[FormEducation.EndDate]
                    }`}</div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      shape="circle"
                      icon={<FontAwesomeIcon icon={faPencil} />}
                      onClick={() => {
                        showModal(ACTION_INFO.EDU_UPDATE, item);
                      }}
                    />
                    <Button
                      shape="circle"
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      onClick={() => {
                        deleteEducation(item?.[FormEducation.EducationId]);
                      }}
                    />
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
                    <Button
                      shape="circle"
                      icon={<FontAwesomeIcon icon={faPencil} />}
                      onClick={() => {
                        showModal(ACTION_INFO.HourlyRate);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="text-label">{infomation?.[FormFreelancer.Bio]}</div>
                  <Button
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faPencil} />}
                    onClick={() => {
                      showModal(ACTION_INFO.Bio);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="border-b">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium">Dự án nổi bật</div>
                  <Button
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() => {
                      showModal(ACTION_INFO.PROJECT_INSERT);
                    }}
                  />
                </div>
                <div className="mt-5">
                  <div className="flex">
                    {infomation?.[FormFreelancer.SpecialProjects]?.map((item, i) => (
                      <div className="" key={i}>
                        <div className="w-[200px]">
                          <div className="flex gap-3 mb-2 justify-end">
                            <Button
                              shape="circle"
                              icon={<FontAwesomeIcon icon={faPencil} />}
                              onClick={() => {
                                showModal(ACTION_INFO.CERT_UPDATE, item);
                              }}
                            />
                            <Button
                              shape="circle"
                              icon={<FontAwesomeIcon icon={faTrash} />}
                              onClick={() => {
                                deleteSpecialProject(item?.[FormSpecialProject.ProjectId]);
                              }}
                            />
                          </div>
                          <div className="">
                            <BaseImage
                              height={200}
                              width={200}
                              className="border rounded-xl"
                              src={item?.[FormSpecialProject.FileAttach]}
                            />
                          </div>
                          <div className="text-xl font-medium">
                            {item?.[FormSpecialProject.ProjectName]}
                          </div>
                          <div className="text-label">{item?.[FormSpecialProject.Description]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium">Lịch sử làm việc</div>
                  <Button
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() => {
                      showModal(ACTION_INFO.WH_INSERT);
                    }}
                  />
                </div>
                <div className="mt-3">
                  {infomation?.[FormFreelancer.WorkingHistories]?.map((item, i) => (
                    <div className="flex justify-between" key={i}>
                      <div>
                        <div className="text-xl font-medium">
                          {item?.[FormWorkingHistory.CompanyName]}
                        </div>
                        <div className="text-label">{`${item?.[FormWorkingHistory.Position]}`}</div>
                        <div className="text-label">{`${item?.[FormWorkingHistory.FromDate]}-${
                          item?.[FormWorkingHistory.IsCurrentlyWorkingHere] === CONST_YN.Yes
                            ? "Hiện tại"
                            : item?.[FormWorkingHistory.EndDate]
                        }`}</div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          shape="circle"
                          icon={<FontAwesomeIcon icon={faPencil} />}
                          onClick={() => {
                            showModal(ACTION_INFO.WH_UPDATE, item);
                          }}
                        />
                        <Button
                          shape="circle"
                          icon={<FontAwesomeIcon icon={faTrash} />}
                          onClick={() => {
                            deleteWorkingHis(item?.[FormWorkingHistory.WorkingHistoryId]);
                          }}
                        />
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
                  {infomation?.[FormFreelancer.Skills]?.map((item, i) => (
                    <div className="tag-skill text-s">{item.name}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b">
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div className="text-xl font-medium">Chuyên môn</div>
                  <Button
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faPencil} />}
                    onClick={() => {
                      showModal(ACTION_INFO.Skill);
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  {infomation?.[FormFreelancer.Specialties]?.map((item, i) => (
                    <div className="tag-skill text-s">{item?.[FormSpecialty.Name]}</div>
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
          <Button
            shape="circle"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => {
              showModal(ACTION_INFO.CERT_INSERT);
            }}
          />
        </div>
        {infomation?.[FormFreelancer.Certificates]?.map((item, i) => (
          <div className="flex justify-between" key={i}>
            <div className="flex gap-5">
              <div className="border rounded">
                <BaseImage height={150} width={150} src={item?.[FormCertificate.FileAttach]} />
              </div>
              <div>
                <div className="text-xl font-medium">{item?.[FormCertificate.CertificateName]}</div>
                <div className="text-label">{item?.[FormCertificate.Description]}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                shape="circle"
                icon={<FontAwesomeIcon icon={faPencil} />}
                onClick={() => {
                  showModal(ACTION_INFO.CERT_UPDATE, item);
                }}
              />
              <Button
                shape="circle"
                icon={<FontAwesomeIcon icon={faTrash} />}
                onClick={() => {
                  deleteCertificate(item?.[FormCertificate.CertificateId]);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-xl mt-5 p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xl font-medium">Đánh giá</div>
        </div>
        {infomation?.[FormFreelancer.FeedBacks]?.map((item, i) => (
          <div className="border-b py-3" key={i}>
            <div className="">
              <div>
                <div className="text-xl font-medium">{item?.[FormFeedback.JobTitle]}</div>
                <Rate value={item?.[FormFeedback.Rate]} />
                <div className="text-label">{item?.[FormFeedback.Description]}</div>
              </div>

              <div className="">
                <BaseImageList src={item?.[FormFeedback.Images]?.split("|")} />
              </div>
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
            <Form.Item name={FormFreelancer.WorkingHistories} hidden></Form.Item>
            <Form.Item name={FormFreelancer.Educations} hidden></Form.Item>
            <Form.Item name={FormFreelancer.Certificates} hidden></Form.Item>

            {action === ACTION_INFO.Avatar ? (
              <FormAvatar formInstance={formInstance} />
            ) : action === ACTION_INFO.Title ? (
              <FormTitle formInstance={formInstance} />
            ) : action === ACTION_INFO.HourlyRate ? (
              <FormHourlyRate formInstance={formInstance} />
            ) : action === ACTION_INFO.Bio ? (
              <FormBio formInstance={formInstance} />
            ) : action === ACTION_INFO.Skill ? (
              <FormSkill formInstance={formInstance} />
            ) : action === ACTION_INFO.EDU_INSERT || action === ACTION_INFO.EDU_UPDATE ? (
              <FormEducations formInstance={formInstance} />
            ) : action === ACTION_INFO.WH_INSERT || action === ACTION_INFO.WH_UPDATE ? (
              <FormWorkingHistorys formInstance={formInstance} />
            ) : action === ACTION_INFO.CERT_INSERT || action === ACTION_INFO.CERT_UPDATE ? (
              <FormCertificates formInstance={formInstance} />
            ) : action === ACTION_INFO.PROJECT_INSERT || action === ACTION_INFO.PROJECT_UPDATE ? (
              <FormSpecialProjects formInstance={formInstance} />
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
