import { Button, Form, Input } from "antd";
import { faLink, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useNotification, usePopupNotification } from "../../../../utils/formHelper";
import { FormContract } from "../../../../const/FormContract";
import { convertToArray } from "../../../../utils/convertData";
import ListContract from "../ListComponet/ListContract";
import BaseModal from "../../../../components/controls/BaseModal";
import { FormJob } from "../../../../const/FormJob";
import { CONST_ACTION } from "../config";
import FormApprovalResult from "../FormContent/FormApprovalResult";
import FormEndContact from "../FormContent/FormEndContact";

const TabContract = ({ apiClient, jobDetail, key }) => {
  const notification = useNotification();
  const popup = usePopupNotification();
  const [contracts, setContracts] = useState([]);
  const [formSubmitContract] = useForm();
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate();
  const [action, setAction] = useState();
  const [title, setTitle] = useState("");
  
  const onCancel = () => {
    setAction("");
    setTitle("");
    setIsShowModal(false);
    formSubmitContract.resetFields();
  };

  const showModal = (_action) => {
    setAction(_action);
    if (_action === CONST_ACTION.ApprovalResult) {
      setTitle("Duyệt kết quả");
    } else if (_action === CONST_ACTION.EndContract) {
      setTitle("Kết thúc hợp đồng");
    }
    setIsShowModal(true);
  };
  const onSubmit = () => {
    formSubmitContract.submit();

    if (action === CONST_ACTION.ApprovalResult) {
      navigate(
        "/ket-thuc-hop-dong?contractId=" + formSubmitContract.getFieldValue(FormContract.ContractId)
      );
    } else if (action === CONST_ACTION.EndContract) {
      console.log(formSubmitContract.getFieldsValue());
      formSubmitContract.validateFields().then((values) => {
        console.log(values);
        apiClient
          .EndContract(values)
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Gửi yêu cầu thành công" });
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
    }
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
    apiClient.GetContractResultByContractId(data?.[FormContract.ContractId]).then((res) => {
      if (res.status === 200 && res.data) {
        formSubmitContract.setFieldValue(FormContract.ContractResults, convertToArray(res.data));
      }
    });
    formSubmitContract.setFieldValue(FormContract.ContractId, data?.[FormContract.ContractId]);
    showModal(CONST_ACTION.ApprovalResult);
  };

  const endContract = (data) => {
    apiClient.GetContractResultByContractId(data?.[FormContract.ContractId]).then((res) => {
      if (res.status === 200 && res.data) {
        formSubmitContract.setFieldValue(FormContract.ContractResults, convertToArray(res.data));
      }
    });
    formSubmitContract.setFieldValue(FormContract.ContractId, data?.[FormContract.ContractId]);
    console.log(data?.[FormContract.ContractId]);
    showModal(CONST_ACTION.EndContract);
    // setTimeout(formSubmitContract.setFieldsValue(data), 2000);
  };

  const detailContract = (data) => {
    apiClient
      .GetContractDetail(data?.[FormContract.ContractId])
      .then((res) => {
        if (res.status === 200 && res.data) {
          showModal(CONST_ACTION.DetailContract);
          formSubmitContract.setFieldsValue(res.data);
        }
      })
      .catch((e) => {
        formSubmitContract.setFieldsValue(undefined);
      });
  };
  const paymentContract = (data) => {
    popup.confirmDuplicate({
      message: "Thông báo",
      description:
        "Sau khi bạn thanh toán, tiền trong ví của bạn sẽ được chuyển đến MediaWork. MediaWork đảm bảo sẽ tiếp nhận xử lý khi có sảy ra tranh chấp hợp đồng",
      onOk: (close) => {
        apiClient
          .PaymentContract(data?.[FormContract.ContractId])
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Thanh toán thành công" });
            }
            close();
            LoadContract();
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
            paymentContract={paymentContract}
            endContract={endContract}
          />
        </div>
      ) : (
        <div>Chưa có để xuất công việc nào được gửi</div>
      )}

      {isShowModal && (
        <BaseModal
          title={title}
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
          <Form
            form={formSubmitContract}
            className="py-5"
            disable={action !== CONST_ACTION.EndContract}
          >
            <Form.Item name={FormContract.ContractId} hidden />
            
            {action === CONST_ACTION.ApprovalResult ? (
              <FormApprovalResult formInstance={formSubmitContract} />
            ) : action === CONST_ACTION.EndContract ? (
              <FormEndContact formInstance={formSubmitContract} />
            ) : (
              <></>
            )}
          </Form>
        </BaseModal>
      )}
    </div>
  );
};

export default TabContract;
