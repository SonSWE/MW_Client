import React, { useEffect, useMemo, useRef, useState } from "react";
import { convertToArray } from "../../../utils/utils";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";

import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { useBusinessAction } from "./BusinessAction";
import ListContract from "./ListContract";
import { Button, Form, Input, Tabs } from "antd";
import { FormContract } from "../../../const/FormContract";
import { CONST_CONTRACT_STATUS } from "../../../utils/constData";
import BaseModal from "../../../components/controls/BaseModal";
import { useForm } from "antd/es/form/Form";
import Dragger from "antd/es/upload/Dragger";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const navigate = useNavigate();
  const apiClient = useBusinessAction();
  const popup = usePopupNotification();
  const notification = useNotification();
  const [contracts, setContracts] = useState([]);
  const userLogged = getUserFromStorage();

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
  const onSubmit = () => {
    formSubmitContract.submit(),
      formSubmitContract.validateFields().then((values) => {
        apiClient
          .SubmitContract(values)
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Gửi yêu kết quả thành công" });
              onCancel();
              LoadContract();
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

  const LoadContract = () => {
    apiClient
      .GetContactsByFreelancer(userLogged.freelancer?.freelancerId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setContracts([...convertToArray(res.data)]);
        }
      })
      .catch((e) => {
        setContracts([]);
      });
  };
  useEffect(() => {
    LoadContract();
  }, []);

  const lstContractActive = useMemo(
    () =>
      contracts.filter(
        (x) =>
          ![
            CONST_CONTRACT_STATUS.Pending,
            CONST_CONTRACT_STATUS.Rejected,
            CONST_CONTRACT_STATUS.Done,
          ].includes(x?.[FormContract.Status])
      ),
    [contracts]
  );

  const lstContractPending = useMemo(
    () => contracts.filter((x) => x?.[FormContract.Status] === CONST_CONTRACT_STATUS.Pending),
    [contracts]
  );

  const lstContractOther = useMemo(
    () =>
      contracts.filter((x) =>
        [
          CONST_CONTRACT_STATUS.Rejected,
          CONST_CONTRACT_STATUS.Done,
          CONST_CONTRACT_STATUS.Closed,
          CONST_CONTRACT_STATUS.Fail,
        ].includes(x?.[FormContract.Status])
      ),
    [contracts]
  );

  const submitContract = (data) => {
    formSubmitContract.setFieldValue(FormContract.ContractId, data?.[FormContract.ContractId]);
    setIsShowModal(true);
  };

  return (
    <div className="">
      <div className="text-2xl font-bold py-2">Danh sách hợp đồng</div>
      <div className="p-5 rounded-xl border">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: `Hợp đồng của bạn (${lstContractActive.length})`,
              key: "1",
              children: (
                <ListContract
                  datas={lstContractActive}
                  apiClient={apiClient}
                  submitContract={submitContract}
                />
              ),
            },
            {
              label: `Chờ xác nhận (${lstContractPending?.length})`,
              key: "2",
              children: <ListContract datas={lstContractPending} apiClient={apiClient} />,
            },
            {
              label: `Lưu trữ`,
              key: "3",
              children: <ListContract datas={lstContractOther} apiClient={apiClient} />,
            },
          ]}
        />
      </div>

      <BaseModal
        title="Gửi kết quả"
        onCancel={onCancel}
        centered
        open={isShowModal}
        width="90vw"
        footer={[
          <Button type="primary" key="save" onClick={onSubmit}>
            Tiếp tục
          </Button>,
          <Button key="cancel" onClick={onCancel}>
            Thoát
          </Button>,
        ]}
      >
        <Form form={formSubmitContract} className="py-5">
          <Form.Item name={FormContract.ContractId} hidden />
          <div className="mb-5">
            Kết quả sẽ được gửi đến khách hàng, sau khi khách hàng duyệt kết quả hợp đồng sẽ hoàn
            thành và bạn sẽ nhận được tiền trong vòng 24h tiếp theo
          </div>
          <div>
            <div className="">
              <div className="w-full">
                <Form.Item name="Remark" label="Mô tả thêm">
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
});

export default InputItems;
