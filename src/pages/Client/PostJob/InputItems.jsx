import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../../utils/formHelper";
import { useNavigate } from "react-router-dom";
import { getSystemCodeValues } from "../../../utils/utils";
import { useBusinessAction } from "./BusinessAction";
import { FormJob } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE, useGlobalConst } from "../../../utils/constData";
import { convertToArray } from "../../../utils/convertData";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { useAxios } from "../../../utils/apiHelper";
import { useSelector } from "react-redux";
import { formaterNumber, parserNumber } from "../../../utils/Format";
import { BaseUploadFile } from "../../../components/element/BaseUploadFile";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const navigate = useNavigate();
  const apiClient = useBusinessAction();
  const notification = useNotification();
  const [formInstance] = Form.useForm();
  const userLogged = getUserFromStorage();
  const globalConst = useGlobalConst();

  const axios = useAxios();

  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);
  const [lstSkill, setLstSkill] = useState([]);
  const [lstSpecialty, setLstSpecialty] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    //set file list to form data
    if (fileList?.length > 0) {
      formInstance.setFieldValue(FormJob.FileAttach, fileList.map((e) => e.name).join("|"));
    } else {
      formInstance.setFieldValue(FormJob.FileAttach, undefined);
    }
  }, [fileList]);

  useEffect(() => {
    axios.collections.SAShare.GetSkills().then((res) => {
      if (res?.data) {
        setLstSkill(convertToArray(res.data));
      } else {
        setLstSkill([]);
      }
    });

    axios.collections.SAShare.GetSpecialties().then((res) => {
      if (res?.data) {
        setLstSpecialty(convertToArray(res.data));
      } else {
        setLstSpecialty([]);
      }
    });
  }, []);

  useEffect(() => {
    formInstance.setFieldValue(FormJob.ClientId, userLogged?.client?.clientId);
  }, [userLogged]);

  const submit = () => {
    formInstance.submit();
    formInstance.validateFields().then((values) => {
      apiClient
        .PostJob({ ...values, [FormJob.BudgetType]: CONST_BUDGET_TYPE.Fixed })
        .then((res) => {
          if (res.status === 200) {
            notification.success({ message: "Đăng công việc thành công" });

            navigate("/");
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

  return (
    <>
      <Form form={formInstance} className="py-5">
        <Form.Item name={FormJob.JobId} hidden />
        <Form.Item name={FormJob.ClientId} hidden />
        <Form.Item name={FormJob.FileAttach} hidden />
        <div>
          <div className="flex justify-between  mb-5">
            <div className="form-title text-2xl font-medium">Chi tiết công việc</div>
            <Button className="rounded-xl" type="primary" size="large" onClick={submit}>
              Đăng tải
            </Button>
          </div>

          <div className="border rounded-xl py-5">
            <div className="border-b p-5">
              <div className="text-lg font-medium mb-2">
                Tiêu đề
                <div className="text-base font-normal text-label">
                  Đặt một tiêu đề ngắn gọi súc tính để tăng khả năng tiếp cận với freelancer
                </div>
              </div>
              <Form.Item
                name={FormJob.Title}
                label=""
                rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
              >
                <Input maxLength={1000} />
              </Form.Item>
            </div>
            <div className="border-b p-5">
              <div className="text-lg font-medium mb-2">
                Mô tả
                <div className="text-base font-normal text-label">
                  Hãy mô tả chi tiết về những yêu cầu bạn cần thực hiện để freelancer có thể hiểu và
                  hoàn thành 1 cách nhanh nhất có thể. Hãy tải thêm các file đính kèm mô tả, ví dụ
                  chi tiết hơn về công việc nếu có
                </div>
              </div>
              <Form.Item
                name={FormJob.Description}
                label=""
                rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
              >
                <Input.TextArea rows={4} maxLength={3000} />
              </Form.Item>
              <div className="text-lg font-medium mb-2">Tệp đính kèm</div>
              <BaseUploadFile fileList={fileList} setFileList={setFileList} maxFile={5} />
            </div>
            <div className="p-5">
              <div>
                <div className="text-lg font-medium mb-2">
                  Vị trí
                  <div className="text-base font-normal text-label">
                    Hãy nhập vị trí dạng "Phường Xã, Quận/Huyện, Thành Phố"
                  </div>
                </div>
                <Form.Item
                  name={FormJob.Position}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Input maxLength={100} />
                </Form.Item>
              </div>
              <div className="">
                <div className="text-lg font-medium mb-2">
                  Chuyên môn
                  <div className="text-base font-normal text-label">
                    Chọn một chuyên môn về công việc của bạn
                  </div>
                </div>
                <Form.Item
                  name={FormJob.SpecialtyId}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Select
                    options={[
                      ...lstSpecialty?.map((e) => ({
                        value: e.specialtyId,
                        label: <span>{e.name}</span>,
                      })),
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="">
                <div className="text-lg font-medium mb-2">
                  Kỹ năng
                  <div className="text-base font-normal text-label">
                    Các kỹ năng tốí thiểu mà Freelancer cần có để thực hiện công việc này, tối đa 10
                    kỹ năng
                  </div>
                </div>
                <Form.Item
                  name={FormJob.JobSkills}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Select
                    allowClear
                    mode="multiple"
                    maxCount={10}
                    options={[
                      ...lstSkill?.map((e) => ({
                        value: e.skillId,
                        label: <span>{e.name}</span>,
                      })),
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="">
                <div className="text-lg font-medium mb-2">
                  Trình độ kinh nghiệm
                  <div className="text-base font-normal text-label">
                    Trình độ kinh nghiệm của Freelancer
                  </div>
                </div>
                <Form.Item
                  name={FormJob.LevelFreelancerId}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Select
                    options={[
                      ...getSystemCodeValues(systemCodes, "PROJECT_LEVEL")?.map((e) => ({
                        value: e.value,
                        label: <span>{e.description}</span>,
                      })),
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="">
                <div className="text-lg font-medium mb-2">
                  Loại thời hạn
                  <div className="text-base font-normal text-label">
                    Công việc sẽ diễn ra trong bao lâu, Ngắn hạn: dưới 3 tháng, Dài hạn: dài hơn 3
                    tháng
                  </div>
                </div>
                <Form.Item
                  name={FormJob.TermType}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Select
                    options={[
                      ...getSystemCodeValues(systemCodes, "PROJECT_TERM")?.map((e) => ({
                        value: e.value,
                        label: <span>{e.description}</span>,
                      })),
                    ]}
                  />
                </Form.Item>
              </div>

              {/* <div className="">
                <div className="text-lg font-medium mb-2">
                  Loại kinh phí
                  <div className="text-base font-normal text-label">
                    Hình thức mà bạn muốn chi trả cho Freelancer. Cố định: chi phí bạn muốn bỏ ra
                    cho toàn bộ công việc không phát sinh thêm, Theo giờ: khi phỏng vấn và ký hợp
                    đồng với Freelancer sẽ đưa ra thời gian để hoàn thành công việc và bạn cần thanh
                    toán số tiền theo tổng thời gian hoàn thành đã thương lượng
                  </div>
                </div>
                <Form.Item
                  name={FormJob.BudgetType}
                  label=""
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Select
                    options={[
                      ...getSystemCodeValues(systemCodes, "BUDGET_TYPE")?.map((e) => ({
                        value: e.value,
                        label: <span>{e.description}</span>,
                      })),
                    ]}
                  />
                </Form.Item>
              </div> */}

              <div className="">
                <Form.Item
                  name={FormJob.CostEstimate}
                  label="Kinh phí đề xuất"
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <InputNumber
                    className="w-80"
                    min={1000}
                    step={100}
                    formatter={formaterNumber}
                    parser={parserNumber}
                    suffix="đ"
                  />
                </Form.Item>
              </div>

              {/* <Form.Item
                shouldUpdate={(prevValues, currentValues) =>
                  isRender(prevValues, currentValues, [FormJob.BudgetType])
                }
              >
                {({ getFieldValue }) => {
                  const budgetType = getFieldValue(FormJob.BudgetType);
                  return (
                    <>
                      {budgetType === CONST_BUDGET_TYPE.Hourly ? (
                        <>
                          <div className="flex gap-10">
                            <Form.Item
                              name={FormJob.HourlyRateFrom}
                              label="Từ"
                              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                            >
                              <InputNumber
                                className="w-80"
                                min={1000}
                                step={100}
                                formatter={formaterNumber}
                                parser={parserNumber}
                                suffix="đ/ giờ"
                              />
                            </Form.Item>
                            <Form.Item
                              name={FormJob.HourlyRateTo}
                              label="Đến"
                              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                            >
                              <InputNumber
                                className="w-80"
                                min={1000}
                                step={100}
                                formatter={formaterNumber}
                                parser={parserNumber}
                                suffix="đ/ giờ"
                              />
                            </Form.Item>
                          </div>
                        </>
                      ) : budgetType === CONST_BUDGET_TYPE.Fixed ? (
                        <>
                          <div className="">
                            <Form.Item
                              name={FormJob.CostEstimate}
                              label="Kinh phí đề xuất"
                              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                            >
                              <InputNumber
                                className="w-80"
                                min={1000}
                                step={100}
                                formatter={formaterNumber}
                                parser={parserNumber}
                                suffix="đ"
                              />
                            </Form.Item>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                }}
              </Form.Item> */}
            </div>
          </div>

          <div className="flex flex-nowrap justify-end items-center gap-5 py-5">
            <Button className="rounded-xl" type="primary" size="large" onClick={submit}>
              Đăng tải
            </Button>
            <Button
              className="rounded-xl"
              size="large"
              onClick={() => {
                navigate("/");
              }}
            >
              Hủy bỏ
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
});

export default InputItems;
