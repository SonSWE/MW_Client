import { Button, Form, Input, InputNumber, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isNullOrEmpty } from "../../../utils/utils";
import { useBusinessAction } from "./BusinessAction";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { PriceFormatter } from "../../../utils/convertData";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { CONST_FORM_ACTION } from "../../../const/FormConst";
import TabJobInformation from "./TabJobInformation";
import TabInviteFreelancer from "./TabInviteFreelancer";
import TabReviewProposal from "./TabReviewProposal";
import TabContract from "./TabContract";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const navigate = useNavigate();
  const popup = usePopupNotification();
  const apiClient = useBusinessAction();
  const notification = useNotification();
  const [formInstance] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobDetail, setJobDetail] = useState();
  const userLogged = getUserFromStorage();
  const [disabledEdit, setDisabledEdit] = useState(true);
  const [key, setKey] = useState();

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

  useEffect(() => {
    formInstance.setFieldValue(FormProposal.FreelancerId, userLogged?.freelancer?.freelancerId);
  }, [userLogged]);

  useEffect(() => {
    LoadProposal();
  }, [searchParams]);

  const LoadProposal = () => {
    const jobId = searchParams.get("jobId");

    if (!isNullOrEmpty(jobId)) {
      apiClient
        .GetDetailJobById(jobId)
        .then((res) => {
          if (res.status === 200 && res.data) {
            setJobDetail(res.data);
          }
        })
        .catch((e) => {
          setJobDetail(undefined);
        });
    } else {
      setJobDetail(undefined);
    }
  };

  const LoadJobDetail = (id) => {};

  const onSaveChange = () => {
    formInstance.submit();
    formInstance.validateFields().then((values) => {
      apiClient
        .UpdateProposal(values)
        .then((res) => {
          if (res.status === 200) {
            notification.success({ message: "Gửi thành công" });
          }
          LoadProposal();
          setDisabledEdit(true);
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
    });
  };

  const onCancel = () => {
    LoadProposal();
    setDisabledEdit(true);
  };

  const onRemove = () => {
    popup.confirmDuplicate({
      message: "Cảnh báo",
      description: "Bạn có chắc chắn muốn xóa đề xuất công việc này",
      onOk: (close) => {
        apiClient
          .DeleteProposal(formInstance.getFieldValue(FormProposal.ProposalId))
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Xóa thành công" });
            }
            close();
            navigate("/de-xuat-cong-viec");
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

  return (
    <>
      <div className="form-title text-2xl font-medium mb-5">{jobDetail?.[FormJob.Title]}</div>
      <Tabs
        activeKey={key}
        onChange={(newKey) => setKey(newKey)}
        defaultActiveKey="1"
        type="card"
        size={"large"}
   
        items={[
          {
            label: "Thông tin công việc",
            key: "1",
            children: <TabJobInformation jobDetail={jobDetail} />,
          },
          {
            label: "Mời freelancer",
            key: "2",
            children: <TabInviteFreelancer />,
          },
          {
            label: `Review đề xuất công việc (${jobDetail?.[FormJob.CountOfProposal]})`,
            key: "3",
            children: <TabReviewProposal jobDetail={jobDetail} apiClient={apiClient} key={key} />,
          },
          {
            label: `Đã thuê (${jobDetail?.[FormJob.CountOfContract]})`,
            key: "4",
            children: <TabContract jobDetail={jobDetail} apiClient={apiClient} key={key} />,
          },
        ]}
      />
    </>
  );
});

export default InputItems;
