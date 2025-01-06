import { Button, Checkbox, DatePicker, Form, Image, Input, InputNumber, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetUrlFileFromStorage, isNullOrEmpty, isRender } from "../../../utils/utils";
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
import BaseImageList from "../../../components/element/BaseImageList";
import { BaseUploadImage } from "../../../components/element/BaseUploadImage";
import { BaseUploadFile } from "../../../components/element/BaseUploadFile";

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
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    //set file list to form data
    if (fileList?.length > 0) {
      formInstance.setFieldValue(
        FormFeedback.Images,
        fileList
          .filter((e) => e.status === "done")
          .map((e) => e.name)
          .join("|")
      );
    } else {
      formInstance.setFieldValue(FormFeedback.Images, undefined);
    }
  }, [fileList]);

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
                <BaseUploadFile
                  fileList={fileList}
                  setFileList={setFileList}
                  maxFile={5}
                  props={{ accept: "image/png, image/gif, image/jpeg" }}
                />
              </div>

              <div>
                <Form.Item
                  shouldUpdate={(prevValues, currentValues) =>
                    isRender(prevValues, currentValues, [FormFeedback.Images])
                  }
                >
                  {({ getFieldValue }) => {
                    const images = getFieldValue(FormFeedback.Images)?.split("|");
                    console.log(images);
                    return (
                      <div>
                        {/* <Image.PreviewGroup
                          preview={{
                            onChange: (current, prev) =>
                              console.log(`current index: ${current}, prev index: ${prev}`),
                          }}
                        >
                          {images?.map((e) => (
                            <Image width={200} src={GetUrlFileFromStorage(e)} />
                          ))}
                          <Image
                            width={200}
                            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                          />
                          <Image
                            width={200}
                            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                          />
                        </Image.PreviewGroup> */}
                        <BaseImageList src={images}/>
                      </div>
                    );
                  }}
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
