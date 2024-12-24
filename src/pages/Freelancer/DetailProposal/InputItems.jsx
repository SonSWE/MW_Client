import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertToArray, isNullOrEmpty } from "../../../utils/utils";
import { useBusinessAction } from "./BusinessAction";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE, CONST_PARAM_ID } from "../../../utils/constData";
import { PriceFormatter } from "../../../utils/convertData";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { CONST_FORM_ACTION } from "../../../const/FormConst";
import { BaseUploadFile } from "../../../components/element/BaseUploadFile";
import { useSelector } from "react-redux";
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
  const [disabledEdit, setDisabledEdit] = useState(true);
  const [fileList, setFileList] = useState([]);
  const sysParam = useSelector((state) => state.sysparamsReducer.SYSPARAMS);
  const ServiceFeePercent = useMemo(
    () =>
      Number(
        convertToArray(sysParam).find((x) => x.sysParamId === CONST_PARAM_ID.FEE_SERVICE_PER_JOB)
          ?.pValue ?? 0
      ),
    [sysParam]
  );

  useEffect(() => {
    formInstance.setFieldValue(FormProposal.FreelancerId, userLogged?.freelancer?.freelancerId);
  }, [userLogged]);

  useEffect(() => {
    LoadProposal();
  }, [searchParams]);

  const LoadProposal = () => {
    const proposalId = searchParams.get("proposalId");

    if (!isNullOrEmpty(proposalId)) {
      apiClient
        .GetDetailById(proposalId)
        .then((res) => {
          if (res.status === 200 && res.data) {
            formInstance.setFieldsValue(res.data);

            //xử lý hiển thị file
            if (!isNullOrEmpty(res.data?.[FormProposal.FileAttaches])) {
              setFileList(
                convertToArray(res.data?.[FormProposal.FileAttaches].split("|")).map((e) => ({
                  name: e,
                  status: "done",
                }))
              );
            }

            LoadJobDetail(res.data?.[FormProposal.JobId]);
          }
        })
        .catch((e) => {
          formInstance.setFieldsValue({});
        });
    } else {
      formInstance.setFieldsValue({});
    }
  };

  const LoadJobDetail = (id) => {
    if (!isNullOrEmpty(id)) {
      apiClient
        .GetDetailJobById(id)
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
      <div className="form-title text-2xl font-medium mb-5">Chi tiết đề xuất công việc</div>
      <div className="grid grid-flow-col grid-cols-4 gap-8 p-y">
        <div className="col-span-4">
          <Form form={formInstance} disabled={disabledEdit}>
            <Form.Item name={FormJob.JobId} hidden />
            <Form.Item name={FormProposal.FreelancerId} hidden />
            <Form.Item name={FormProposal.ProposalId} hidden />
            <Form.Item name={FormProposal.FileAttaches} hidden />

            <div className="card-border">
              <div className="text-xl font-medium mb-5">Chi tiết công việc</div>
              <div className="text-lg font-medium">{jobDetail?.[FormJob.Title]}</div>
              <div className="mt-1 text-xs text-label">
                {jobDetail?.[FormJob.TermTypeText]} - {jobDetail?.[FormJob.LevelFreelancerIdText]} -{" "}
                Ngân sách: {PriceFormatter(jobDetail?.[FormJob.CostEstimate])}
              </div>
              <div className="mt-2">
                <a className="underline hover:!underline">Xem chi tiết công việc</a>
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
                <Form.Item className="w-full" name={FormProposal.BidAmount} label="">
                  <InputNumber
                    className="w-full"
                    formatter={formaterNumber}
                    parser={parserNumber}
                    suffix="đ"
                    disabled
                  />
                </Form.Item>
              </div>

              {ServiceFeePercent > 0 && (
                <div className="flex items-center mb-5">
                  <div className="w-full">
                    <div className="font-medium">Phí dịch vụ {ServiceFeePercent * 100}%</div>
                  </div>
                  <Form.Item className="w-full !mb-0" name={FormProposal.FeeService} label="">
                    <InputNumber
                      className="w-full"
                      disabled
                      formatter={formaterNumber}
                      parser={parserNumber}
                      suffix="đ"
                    />
                  </Form.Item>
                </div>
              )}

              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Số tiền sau phí</div>
                  <div className="text-label">Tổng số tiền thực tế bạn sẽ nhận được</div>
                </div>
                <Form.Item className="w-full" name={FormProposal.RealReceive} label="">
                  <InputNumber
                    className="w-full"
                    formatter={formaterNumber}
                    parser={parserNumber}
                    suffix="đ"
                    disabled
                  />
                </Form.Item>
              </div>
            </div>

            <div className="card-border">
              <div className="text-xl font-medium mb-5">Mô tả giải pháp công việc</div>
              <Form.Item name={FormProposal.CoverLetter} label="">
                <Input.TextArea
                  style={{
                    height: 120,
                  }}
                />
              </Form.Item>

              <div>Dính kèm</div>
              <BaseUploadFile fileList={fileList} setFileList={setFileList} maxFile={5} disabled />
            </div>
          </Form>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-3 w-full">
            {disabledEdit ? (
              <Button
                className="w-full rounded-full"
                type="primary"
                onClick={() => setDisabledEdit(false)}
              >
                Chỉnh sửa đề xuất
              </Button>
            ) : (
              <Button className="w-full rounded-full" type="primary" onClick={onSaveChange}>
                Lưu
              </Button>
            )}
            {disabledEdit ? (
              <Button className="w-full rounded-full" onClick={onRemove}>
                Rút lại đề xuất
              </Button>
            ) : (
              <Button className="w-full rounded-full" onClick={onCancel}>
                Hủy
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default InputItems;
