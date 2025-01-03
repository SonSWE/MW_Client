import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useNotification } from "../../../utils/formHelper";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertToArray, isNullOrEmpty } from "../../../utils/utils";
import { useBusinessAction } from "./BusinessAction";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE, CONST_PARAM_ID, useGlobalConst } from "../../../utils/constData";
import { PriceFormatter } from "../../../utils/convertData";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { formaterNumber, parserNumber } from "../../../utils/Format";
import { BaseUploadFile } from "../../../components/element/BaseUploadFile";
import { useSelector } from "react-redux";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  //state
  const [jobDetail, setJobDetail] = useState();
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

  //hock
  const navigate = useNavigate();
  const apiClient = useBusinessAction();
  const notification = useNotification();
  const [formInstance] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const userLogged = getUserFromStorage();
  const globalConst = useGlobalConst();

  //effect state
  useEffect(() => {
    formInstance.setFieldValue(FormProposal.FreelancerId, userLogged?.freelancer?.freelancerId);
  }, [userLogged]);

  useEffect(() => {
    const jobId = searchParams.get("jobId");

    if (!isNullOrEmpty(jobId)) {
      apiClient
        .GetDetailById(jobId)
        .then((res) => {
          if (res.status === 200 && res.data) {
            setJobDetail(res.data);
            formInstance.setFieldValue(FormJob.JobId, res.data?.[FormJob.JobId]);
          }
        })
        .catch((e) => {
          setJobDetail(undefined);
        });
    } else {
      setJobDetail(undefined);
    }
  }, [searchParams]);

  useEffect(() => {
    //set file list to form data
    if (fileList?.length > 0) {
      formInstance.setFieldValue(FormProposal.FileAttach, fileList.map((e) => e.name).join("|"));
    } else {
      formInstance.setFieldValue(FormProposal.FileAttach, undefined);
    }
  }, [fileList]);

  //function
  const submit = () => {
    formInstance.submit();
    formInstance.validateFields().then((values) => {
      apiClient
        .SubmitProposal(values)
        .then((res) => {
          if (res.status === 200) {
            notification.success({ message: "Gửi thành công" });
          }
          navigate("/");
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

  return (
    <>
      <Form form={formInstance} className="py-5">
        <Form.Item name={FormJob.JobId} hidden />
        <Form.Item name={FormProposal.FreelancerId} hidden />
        <Form.Item name={FormProposal.FileAttach} hidden />

        <div>
          <div className="form-title text-2xl font-medium mb-5">Gửi đề xuất công việc</div>
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

            <div className="flex items-center mb-5">
              <div className="w-full">
                <div className="font-medium">Đấu thầu</div>
                <div className="text-label">
                  Tổng số tiền khách hàng sẽ thấy trên đề xuất của bạn
                </div>
              </div>
              <Form.Item
                className="w-full !mb-0"
                name={FormProposal.BidAmount}
                label=""
                rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
              >
                <InputNumber
                  className="w-full"
                  min={1000}
                  step={100}
                  formatter={formaterNumber}
                  parser={parserNumber}
                  suffix="đ"
                  onChange={(value) => {
                    if (ServiceFeePercent > 0) {
                      const fee = value * ServiceFeePercent;
                      formInstance.setFieldValue(FormProposal.RealReceive, value - fee);
                      formInstance.setFieldValue(FormProposal.FeeService, fee);
                    }
                  }}
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

            <div className="flex items-center mb-5">
              <div className="w-full">
                <div className="font-medium">Số tiền sau phí</div>
                <div className="text-label">Tổng số tiền thực tế bạn sẽ nhận được</div>
              </div>
              <Form.Item className="w-full !mb-0" name={FormProposal.RealReceive} label="">
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
          </div>

          <div className="card-border">
            <div className="text-xl font-medium mb-5">Mô tả giải pháp công việc</div>
            <Form.Item
              name={FormProposal.CoverLetter}
              label=""
              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            >
              <Input.TextArea
                style={{
                  height: 120,
                }}
              />
            </Form.Item>

            <div>Dính kèm</div>
            <BaseUploadFile fileList={fileList} setFileList={setFileList} maxFile={5} />
          </div>

          <div className="flex flex-nowrap justify-start items-center gap-5 py-2">
            <Button className="rounded-xl" type="primary" size="large" onClick={submit}>
              Gửi
            </Button>
            <Button className="rounded-xl" size="large">
              Hủy bỏ
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
});

export default InputItems;
