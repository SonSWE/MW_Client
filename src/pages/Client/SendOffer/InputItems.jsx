import { Button, Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isNullOrEmpty } from "../../../utils/utils";
import { useBusinessAction } from "./BusinessAction";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE, CONST_PARAM_ID, useGlobalConst } from "../../../utils/constData";
import { convertToArray, PriceFormatter } from "../../../utils/convertData";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { CONST_FORM_ACTION } from "../../../const/FormConst";
import { FormContract } from "../../../const/FormContract";
import { formaterNumber, parserNumber } from "../../../utils/Format";
import { useSelector } from "react-redux";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const navigate = useNavigate();

  const popup = usePopupNotification();
  const apiClient = useBusinessAction();
  const notification = useNotification();
  const [formInstance] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobDetail, setJobDetail] = useState();
  const userLogged = getUserFromStorage();
  const [allowSave, setAllowSave] = useState(false);
  const globalConst = useGlobalConst();
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
            LoadJobDetail(res.data?.[FormJob.JobId]);

            // const fee = res.data?.[FormProposal.BidAmount] * 0.1;
            // formInstance.setFieldValue(FormProposal.RealReceive, value - fee);
            // formInstance.setFieldValue("ServiceFee", fee);
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

  const onAccept = () => {
    popup.confirmDuplicate({
      message: "Cảnh báo",
      description: "Bạn có chắc chắn muốn gửi yêu cầu ký hợp đồng đến freelancer này",
      onOk: (close) => {
        formInstance.submit();
        formInstance.validateFields().then((values) => {
          const newContract = {
            [FormContract.JobId]: values?.[FormProposal.JobId],
            [FormContract.FreelancerId]: values?.[FormProposal.FreelancerId],
            [FormContract.ContractAmount]: values?.[FormProposal.BidAmount],
            [FormContract.FeeService]: values?.[FormProposal.FeeService],
            [FormContract.RealReceive]: values?.[FormProposal.RealReceive],
            [FormContract.ProposalId]: values?.[FormProposal.ProposalId],
            [FormContract.StartDate]: values?.[FormContract.StartDate],
            [FormContract.EndDate]: values?.[FormContract.EndDate],
            [FormContract.JobTitle]: values?.[FormContract.JobTitle],
          };
          apiClient
            .SendOffer(newContract)
            .then((res) => {
              if (res.status === 200) {
                notification.success({ message: "Gửi yêu cầu thành công" });
              }
              navigate(-1);
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
        });
      },
    });
  };

  const onReject = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="form-title text-2xl font-medium mb-5">Gửi yêu cầu làm việc</div>
      <div className="grid grid-flow-col grid-cols-4 p-y">
        <div className="col-span-3 border-r">
          <Form form={formInstance}>
            <Form.Item name={FormProposal.JobId} hidden />
            <Form.Item name={FormProposal.FreelancerId} hidden />
            <Form.Item name={FormProposal.ProposalId} hidden />
            <Form.Item name={FormProposal.JobTitle} hidden />

            <div className="card-border">
              <div className="text-xl font-medium mb-5">Điều khoản</div>

              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Số tiền</div>
                  <div className="text-label">Tổng số tiền bạn cần chi trả cho freelancer</div>
                </div>
                <Form.Item
                  className="w-full"
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
                      const fee = value * 0.1;
                      formInstance.setFieldValue(FormProposal.RealReceive, value - fee);
                      formInstance.setFieldValue("ServiceFee", fee);
                    }}
                  />
                </Form.Item>
              </div>

              {/* <div className="flex items-center">
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
              </div> */}

              {/* <div className="flex items-center">
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
              </div> */}

              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Ngày bắt đầu</div>
                </div>
                <Form.Item
                  className="w-full"
                  name={FormContract.StartDate}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                  {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
                >
                  <DatePicker
                    className="w-full"
                    placeholder="dd/MM/yyyy"
                    format={globalConst.ANT.LOCALE.dateFormat}
                  />
                </Form.Item>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="font-medium">Ngày kết thúc</div>
                </div>
                <Form.Item
                  className="w-full"
                  name={FormContract.EndDate}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                  {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
                >
                  <DatePicker
                    className="w-full"
                    placeholder="dd/MM/yyyy"
                    format={globalConst.ANT.LOCALE.dateFormat}
                  />
                </Form.Item>
              </div>
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
              <div className="mt-1">{jobDetail?.[FormJob.Description]}</div>
            </div>
            <div className="my-5 px-10">
              <Checkbox
                value={allowSave}
                onChange={(e) => {
                  setAllowSave(e.target.checked);
                }}
              >
                Có, tôi hiểu và đồng ý với Điều khoản dịch vụ của Mediawork , bao gồm Thỏa thuận
                người dùng và Chính sách bảo mật .
              </Checkbox>
            </div>
            <div className="flex gap-3 w-full justify-end px-10">
              <Button
                className=" rounded-full"
                type="primary"
                onClick={onAccept}
                disabled={!allowSave}
              >
                Tiếp tục
              </Button>
              <Button className="rounded-full" onClick={onReject}>
                Hủy bỏ
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
});

export default InputItems;
