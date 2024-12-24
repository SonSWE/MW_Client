import { Button, Form, Input, List } from "antd";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { convertToArray, formatDate, PriceFormatter } from "../../../utils/convertData";
import { countProposalText, formatCreatedDate, isRender } from "../../../utils/utils";
import {
  faCheckCircle,
  faHandHoldingDollar,
  faLink,
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
import { FormContract, FormContractResult } from "../../../const/FormContract";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

const TabContract = ({ apiClient, jobDetail, key }) => {
  const notification = useNotification();
  const [contracts, setContracts] = useState([]);
  const [formSubmitContract] = useForm();
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate();

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

  const onCancel = () => {
    setIsShowModal(false);
  };
  const onApproval = () => {
    navigate(
      "/ket-thuc-hop-dong?contractId=" +
        formSubmitContract.getFieldValue(FormContractResult.ContractId)
    );
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
    setIsShowModal(true);
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
          <Form.Item name={FormContract.ContractResults} hidden />

          <div className="mb-5">
            Hãy xem xét kỹ kết quả nhận được từ freelancer trước khi xác nhận hoàn thành hợp đồng
          </div>
          <div>
            <Form.Item
              className="!p-0 !m-0"
              shouldUpdate={(prevValues, currentValues) =>
                isRender(prevValues, currentValues, [FormContract.ContractResults])
              }
            >
              {({ getFieldValue }) => {
                const lst = convertToArray(getFieldValue(FormContract.ContractResults));
                return lst.length > 0 ? (
                  <div>
                    <div className="text-base font-bold">Danh sách kết quả</div>
                    <List
                      className="mt-2"
                      bordered
                      dataSource={lst}
                      renderItem={(item) => {
                        const lstFile = convertToArray(
                          item?.[FormContractResult.FileAttach]?.split("|")
                        );

                        return (
                          <List.Item>
                            <div className="w-full flex items-start justify-between">
                              <div>
                                <div>{item?.[FormContractResult.Remark]}</div>
                                {lstFile.length > 0 &&
                                  lstFile.map((e) => (
                                    <div className="text-[#1677ff] !underline">
                                      <FontAwesomeIcon icon={faLink} /> <a>{e}</a>
                                    </div>
                                  ))}
                              </div>

                              <div>
                                Ngày gửi:{" "}
                                {formatDate(
                                  item?.[FormContractResult.CreateDate],
                                  "DD/MM/YYYY hh:mm"
                                )}
                              </div>
                            </div>
                          </List.Item>
                        );
                      }}
                    ></List>
                  </div>
                ) : (
                  <></>
                );
              }}
            </Form.Item>
          </div>
        </Form>
      </BaseModal>
    </div>
  );
};

export default TabContract;
