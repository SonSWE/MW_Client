import { Button, Form, Input } from "antd";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { convertToArray, PriceFormatter } from "../../../utils/convertData";
import { countProposalText, formatCreatedDate } from "../../../utils/utils";
import {
  faCheckCircle,
  faHandHoldingDollar,
  faLocationDot,
  faMagnifyingGlass,
  faPencil,
  faUserTie,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListFreelancer from "./ListFreelancer";
import { useEffect, useState } from "react";
import ListProposal from "./ListProposal";
import ListContract from "./ListContract";
import BaseModal from "../../../components/controls/BaseModal";
import Dragger from "antd/es/upload/Dragger";
import { useNotification } from "../../../utils/formHelper";
import { FormContract } from "../../../const/FormContract";
import { useForm } from "antd/es/form/Form";

const TabContract = ({ apiClient, jobDetail, key }) => {
  const notification = useNotification();
  const [contracts, setContracts] = useState([]);
  const [formSubmitContract] = useForm();
  const [isShowModal, setIsShowModal] = useState(false);

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

  const openModal = () => {
    setIsShowModal(true);
  };
  const onCancel = () => {
    setIsShowModal(false);
  };
  const onApproval = () => {
    formSubmitContract.submit(),
      formSubmitContract.validateFields().then((values) => {
        apiClient
          .DoneContract(values?.[FormContract.ContractId])
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Hoành thành hợp đồng thành công" });
              LoadContract();
              onCancel();
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
      });
  };

  useEffect(() => {
    LoadContract();
  }, [key]);

  const LoadContract = () => {
    apiClient
      .GetContactByJobId(jobDetail?.[FormJob.JobId])
      .then((res) => {
        if (res.status === 200 && res.data) {
          setContracts([...convertToArray(res.data)]);
        }
      })
      .catch((e) => {
        setContracts([]);
      });
  };

  const approvalContract = (data) => {
    apiClient
      .GetContractDetail(data?.[FormContract.ContractId])
      .then((res) => {
        if (res.status === 200 && res.data) {
          setIsShowModal(true);
          formSubmitContract.setFieldsValue(res.data);
        }
      })
      .catch((e) => {
        formSubmitContract.setFieldsValue(undefined);
      });
  };

  const detailContract = (data) => {
    apiClient
      .GetContractDetail(data?.[FormContract.ContractId])
      .then((res) => {
        if (res.status === 200 && res.data) {
          setIsShowModal(true);
          formSubmitContract.setFieldsValue(res.data);
        }
      })
      .catch((e) => {
        formSubmitContract.setFieldsValue(undefined);
      });
  };

  return (
    <div>
      {contracts?.length > 0 ? (
        <div className="">
          <div className="my-5">
            <Input
              className="rounded-xl"
              size="large"
              placeholder="Tìm kiếm"
              prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              onKeyDown={(event) => {
                // if (event.code === "Enter" && !isNullOrEmpty(event.target.value)) {
                //   goToSearch(event.target.value);
                // }
              }}
            />
          </div>

          <ListContract
            datas={contracts}
            detailContract={detailContract}
            approvalContract={approvalContract}
          />
        </div>
      ) : (
        <div>Chưa có để xuất công việc nào được gửi</div>
      )}

      <BaseModal
        title="Duyệt kết quả"
        onCancel={onCancel}
        centered
        open={isShowModal}
        width="90vw"
        footer={[
          <Button type="primary" key="save" onClick={onApproval}>
            Hoàn thành
          </Button>,
          <Button key="cancel" onClick={onCancel}>
            Thoát
          </Button>,
        ]}
      >
        <Form form={formSubmitContract} className="py-5" disabled>
          <Form.Item name={FormContract.ContractId} hidden />
          <div className="mb-5">
            Hãy xem xét kỹ kết quả nhận được từ freelancer trước khi xác nhận hoàn thành hợp đồng
          </div>
          <div>
            <div className="">
              <div className="w-full">
                <Form.Item name={FormContract.Remark} label="Mô tả thêm">
                  <Input.TextArea
                    style={{
                      height: 120,
                    }}
                  />
                </Form.Item>
              </div>
              <div className="w-full">
                <Form.Item name="branchGroupId" label="File đính kèm">
                  <Dragger {...props}>
                    <p className="ant-upload-text">Chọn hoặc kéo thả file đính kèm để tải lên</p>
                  </Dragger>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </BaseModal>
    </div>
  );
};

export default TabContract;
