import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../../utils/formHelper";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSystemCodeValues, isNullOrEmpty, isRender } from "../../../utils/utils";
import { useBusinessAction } from "./BusinessAction";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { convertToArray, PriceFormatter } from "../../../utils/convertData";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { CONST_FORM_ACTION } from "../../../const/FormConst";
import { useAxios } from "../../../utils/apiHelper";
import { useSelector } from "react-redux";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const navigate = useNavigate();
  const apiClient = useBusinessAction();
  const notification = useNotification();
  const [formInstance] = Form.useForm();
  const userLogged = getUserFromStorage();

  const axios = useAxios();

  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);
  const [lstSkill, setLstSkill] = useState([]);
  const [lstSpecialty, setLstSpecialty] = useState([]);

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

  const submit = () => {
    formInstance.submit();
    formInstance.validateFields().then((values) => {
      apiClient
        .PostJob(values)
        .then((res) => {
          if (res.status === 200) {
            notification.success({ message: "Đăng công việc thành công" });
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
        <Form.Item name={FormJob.ClientId} hidden />
        <div>
          <div className="flex justify-between  mb-5">
            <div className="form-title text-2xl font-medium">Chi tiết công việc</div>
            <Button className="rounded-xl" type="primary" size="large" onClick={submit}>
              Đăng tải
            </Button>
          </div>

          <div className="border rounded-xl py-5">
            <div className="border-b p-5">
              <div className="text-lg font-medium mb-5">Tiêu đề</div>
              <Form.Item name={FormJob.Title} label="">
                <Input />
              </Form.Item>
            </div>
            <div className="border-b p-5">
              <div className="text-lg font-medium mb-5">Mô tả</div>
              <Form.Item name={FormJob.Description} label="">
                <Input.TextArea rows={4} />
              </Form.Item>
            </div>
            <div className="border-b p-5">
              <div>
                <div className="text-lg font-medium mb-5">Vị trí</div>
                <Form.Item name={FormJob.Position} label="">
                  <Input />
                </Form.Item>
              </div>
              <div className="">
                <div className="text-lg font-medium mb-5">Chuyên môn</div>
                <Form.Item name={FormJob.SpecialtyId} label="">
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
                <div className="text-lg font-medium mb-5">Kỹ năng</div>
                <Form.Item name={FormJob.JobSkills} label="">
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
                <div className="text-lg font-medium mb-5">Loại thời hạn</div>
                <Form.Item name={FormJob.TermType} label="">
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
              <div className="">
                <div className="text-lg font-medium mb-5">Trình độ kinh nghiệm</div>
                <Form.Item name={FormJob.LevelFreelancerId} label="">
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
                <div className="text-lg font-medium mb-5">Loại kinh phí</div>
                <Form.Item name={FormJob.BudgetType} label="">
                  <Select
                    options={[
                      ...getSystemCodeValues(systemCodes, "BUDGET_TYPE")?.map((e) => ({
                        value: e.value,
                        label: <span>{e.description}</span>,
                      })),
                    ]}
                  />
                </Form.Item>
              </div>

              <Form.Item
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
                            <Form.Item name={FormJob.HourlyRateFrom} label="Từ">
                              <InputNumber /> / giờ
                            </Form.Item>

                            <Form.Item name={FormJob.HourlyRateTo} label="Đến">
                              <InputNumber /> / giờ
                            </Form.Item>
                          </div>
                        </>
                      ) : budgetType === CONST_BUDGET_TYPE.Fixed ? (
                        <>
                          <div className="">
                            <Form.Item name={FormJob.CostEstimate} label="Kinh phí đề xuất">
                              <InputNumber />
                            </Form.Item>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                }}
              </Form.Item>
            </div>
            <div className="border-b p-5">
              <div className="text-lg font-medium mb-5">Tệp đính kèm</div>
              <Dragger {...props}>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
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
