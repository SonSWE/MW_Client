import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Rate } from "antd";
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
import { FormFeedback } from "../../../const/FormFeedback";
import { FormFreelancer } from "../../../const/FormFreelancer";

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
    const contractId = searchParams.get("contractId");

    detailContract(contractId);
  }, [searchParams]);

  const detailContract = (contractId) => {
    apiClient
      .GetContractDetail(contractId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          formInstance.setFieldValue(FormFeedback.ContractId, res.data?.[FormContract.ContractId]);
          formInstance.setFieldValue(
            FormFeedback.FreelancerId,
            res.data?.[FormContract.FreelancerId]
          );
          formInstance.setFieldValue(FormFeedback.JobId, res.data?.[FormContract.JobId]);
        }
      })
      .catch((e) => {
        formInstance.setFieldValue(FormFeedback.ContractId, undefined);
        formInstance.setFieldValue(FormFeedback.FreelancerId, undefined);
        formInstance.setFieldValue(FormFeedback.JobId, undefined);
      });
  };

  const onAccept = () => {
    formInstance.submit(),
      formInstance.validateFields().then((values) => {
        apiClient
          .DoneContract(values)
          .then((res) => {
            if (res.status === 200) {
              notification.success({ message: "Hoành thành hợp đồng thành công" });
              navigate(-1);
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

  const onReject = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="form-title text-2xl font-medium mb-5">Hoàn thành hơp đồng và đánh giá</div>
      <div className="">
        <div className="">
          <Form form={formInstance}>
            <Form.Item name={FormFeedback.ContractId} hidden />
            <Form.Item name={FormFeedback.FreelancerId} hidden />
            <Form.Item name={FormFeedback.Images} hidden />

            <div className="card-border">
              <div className="flex flex-col items-center">
                <div className="w-full">
                  <div className="font-medium">Chấm điểm</div>
                  <div className="text-label">
                    Bạn cảm thấy freelancer đã làm công việc này ở mức nào
                  </div>
                </div>
                <Form.Item
                  className="w-full"
                  name={FormFeedback.Rate}
                  label=""
                  rrules={[
                    {
                      required: true,
                      message: "không được để trống",
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-full">
                  <div className="font-medium">Mô tả</div>
                  <div className="text-label">
                    Mô tả về cảm nhận của bạn về freelancer, chất lượng công việc, ...
                  </div>
                </div>
                <Form.Item
                  className="w-full"
                  name={FormFeedback.Description}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Input.TextArea rows={5} maxLength={2000} />
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
            <div className="flex gap-3 w-full justify-end px-10">
              <Button className=" rounded-full" type="primary" onClick={onAccept}>
                Hoàn thành hợp đồng
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
