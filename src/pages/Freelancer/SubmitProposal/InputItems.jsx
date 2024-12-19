import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../../utils/formHelper";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isNullOrEmpty } from "../../../utils/utils";
import { useBusinessAction } from "./BusinessAction";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE, useGlobalConst } from "../../../utils/constData";
import { PriceFormatter } from "../../../utils/convertData";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { CONST_FORM_ACTION } from "../../../const/FormConst";
import { formaterNumber, parserNumber } from "../../../utils/Format";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const navigate = useNavigate();
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

  const submit = () => {
    formInstance.submit();
    formInstance.validateFields().then((values) => {
      apiClient
        .SubmitProposal(values)
        .then((res) => {
          if (res.status === 200) {
            notification.success({ message: "Gửi thành công" });
          }

          setTimeout(() => {
            navigate("/");
          }, 2000);
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
        <div>
          <div className="form-title text-2xl font-medium mb-5">Gửi đề xuất công việc</div>
          <div className="card-border">
            <div className="text-xl font-medium mb-5">Thiết lập đề xuất</div>
            <div>Đề xuất này yêu cầu 6 connects</div>
            <div>Bạn sẽ còn lại 134 sau khi gửi bản đề xuất công việc này</div>
          </div>
          <div className="card-border">
            <div className="text-xl font-medium mb-5">Chi tiết công việc</div>
            <div className="text-lg font-medium">{jobDetail?.[FormJob.Title]}</div>
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
              <Form.Item
                className="w-full"
                name={FormProposal.Bid}
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
                    const fee = value * 0.1;
                    formInstance.setFieldValue(FormProposal.RealReceive, value - fee);
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
              <Form.Item className="w-full" name={FormProposal.RealReceive} label="">
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
            <Form.Item name={FormProposal.CoverLetter} label="">
              <Input.TextArea
                style={{
                  height: 120,
                }}
              />
            </Form.Item>

            <div>Dính kèm</div>
            <Dragger {...props}>
              <p className="ant-upload-text">Click chọn hoặc kéo thả file vào đây để tải lên</p>
            </Dragger>
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
