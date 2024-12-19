import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isNullOrEmpty } from "../../../utils/utils";
import { useBusinessAction } from "./BusinessAction";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE, useGlobalConst } from "../../../utils/constData";
import { PriceFormatter } from "../../../utils/convertData";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { CONST_FORM_ACTION } from "../../../const/FormConst";
import { FormContract } from "../../../const/FormContract";
import { formaterNumber, parserNumber } from "../../../utils/Format";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const navigate = useNavigate();
  const popup = usePopupNotification();
  const apiClient = useBusinessAction();
  const notification = useNotification();
  const [formInstance] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobDetail, setJobDetail] = useState();
  const userLogged = getUserFromStorage();
  const globalConst = useGlobalConst();

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
    LoadContract();
  }, [searchParams]);

  const LoadContract = () => {
    const contractId = searchParams.get("contractId");

    if (!isNullOrEmpty(contractId)) {
      apiClient
        .GetContractDetail(contractId)
        .then((res) => {
          if (res.status === 200 && res.data) {
            formInstance.setFieldsValue(res.data);
            setJobDetail(res.data.job);
          }
        })
        .catch((e) => {
          formInstance.setFieldsValue({});
        });
    } else {
      formInstance.setFieldsValue({});
    }
  };

  const onAccept = () => {
    popup.confirmDuplicate({
      message: "Cảnh báo",
      description: "Bạn có chắc chắn muốn ký hợp đồng công việc này",
      onOk: (close) => {
        apiClient
          .AcceptContract(formInstance.getFieldValue(FormContract.ContractId))
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Ký hợp đồng thành công" });
              navigate("/hop-dong");
            }
            close();
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

  const onReject = () => {
    popup.confirmDuplicate({
      message: "Cảnh báo",
      description: "Bạn có chắc chắn muốn từ chối ký hợp đồng công việc này",
      onOk: (close) => {
        apiClient
          .RejectContract(formInstance.getFieldValue(FormContract.ContractId))
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Từ chối thành công" });
              navigate("/hop-dong");
            }
            close();
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
      <div className="form-title text-2xl font-medium mb-5">Chi tiết hợp đồng</div>
      <div className="grid grid-flow-col grid-cols-4 gap-8 p-y">
        <div className="col-span-4">
          <Form form={formInstance}>
            <Form.Item name={FormContract.JobId} hidden />
            <Form.Item name={FormContract.FreelancerId} hidden />
            <Form.Item name={FormContract.ContractId} hidden />
            {/* <Form.Item name={FormContract.ProposalId} hidden /> */}
            <div className="card-border">
              <div className="text-xl font-medium mb-5">Chi tiết công việc</div>
              <div className="text-lg font-medium">{FormContract.job?.[FormJob.Title]}</div>
              <div className="mt-1 text-xs text-label">
                {jobDetail?.[FormJob.TermTypeText]} - {jobDetail?.[FormJob.LevelFreelancerIdText]} -{" "}
                {jobDetail?.[FormJob.BudgetTypeText]}:
                {jobDetail?.[FormJob.BudgetType] === CONST_BUDGET_TYPE.Hourly
                  ? ` ${PriceFormatter(jobDetail?.[FormJob.HourlyRateFrom])}/Giờ-${PriceFormatter(
                      jobDetail?.[FormJob.HourlyRateTo]
                    )}/Giờ`
                  : ` ${PriceFormatter(jobDetail?.[FormJob.CostEstimate])}`}
              </div>
              <div className="mt-2">
                <a className="underline hover:!underline">Xem chi tiết công việc ...</a>
              </div>
            </div>
            <div className="card-border">
              <div className="text-xl font-medium mb-5">Điều khoản</div>
              <div className="pb-3">
                Tổng số tiền bạn muốn nhận được từ công việc này là bao nhiêu?
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Đấu thầu</div>
                  <div className="text-label">
                    Tổng số tiền khách hàng sẽ thấy trên đề xuất của bạn
                  </div>
                </div>
                <Form.Item className="w-full" name={FormContract.Bid} label="">
                  <InputNumber
                    className="w-full"
                    disabled
                    min={1000}
                    step={100}
                    formatter={formaterNumber}
                    parser={parserNumber}
                    suffix="đ"
                    onChange={(value) => {
                      const fee = value * 0.1;
                      formInstance.setFieldValue(FormContract.RealReceive, value - fee);
                      formInstance.setFieldValue("ServiceFee", fee);
                    }}
                  />
                </Form.Item>
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Phí dịch vụ 10%</div>
                </div>
                <Form.Item className="w-full" name="ServiceFee" label="">
                  <InputNumber
                    className="w-full"
                    disabled
                    min={1000}
                    step={100}
                    formatter={formaterNumber}
                    parser={parserNumber}
                    suffix="đ"
                  />
                </Form.Item>
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Số tiền sau phí</div>
                  <div className="text-label">Tổng số tiền thực tế bạn sẽ nhận được</div>
                </div>
                <Form.Item className="w-full" name={FormContract.RealReceive} label="">
                  <InputNumber
                    className="w-full"
                    disabled
                    min={1000}
                    step={100}
                    formatter={formaterNumber}
                    parser={parserNumber}
                    suffix="đ"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Ngày bắt đầu</div>
                </div>
                <Form.Item
                  className="w-full"
                  name={FormContract.StartDate}
                  rules={[]}
                  {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
                >
                  <DatePicker
                    disabled
                    className="w-full"
                    placeholder="dd/MM/yyyy"
                    format={globalConst.ANT.LOCALE.dateFormat}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-3 w-full">
            <Button className="w-full rounded-full" type="primary" onClick={onAccept}>
              Đồng ý
            </Button>
            <Button className="w-full rounded-full" onClick={onReject}>
              Từ chối
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});

export default InputItems;
