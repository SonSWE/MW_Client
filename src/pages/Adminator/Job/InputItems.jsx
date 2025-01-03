import { Form, Input, InputNumber, Modal, Select, Tabs } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { convertToArray, getSystemCodeValues, isRender, makeid } from "../../../utils/utils";
import { usePopupNotification } from "../../../utils/formHelper";
import { FormJob, FormJobSkill, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { useSelector } from "react-redux";
import { useAxios } from "../../../utils/apiHelper";
import ProposalTab from "./ProposalTab";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {
      if (values?.[FormJob.Proposals]?.length > 0) {
        formInstance.setFieldValue(
          FormJob.Proposals,
          values?.[FormJob.Proposals].map((e, i) => ({ ...e, id: makeid() + i }))
        );
      }

      if (convertToArray(values?.[FormJob.JobSkills]).length > 0) {
        formInstance.setFieldValue(
          FormJob.JobSkills,
          convertToArray(values?.[FormJob.JobSkills]).map((e) => e?.[FormJobSkill.SkillId])
        );
      }
    },
  }));

  const notification = usePopupNotification();
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);
  const axios = useAxios();
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

  const items = [
    {
      key: "PROPOSAL",
      label: "Đề xuất công việc",
      children: <ProposalTab formInstance={formInstance} action={action} disabled={disabled} />,
    },
  ];

  return (
    <div>
      <div className="group-items">
        <Form.Item name={FormJob.Proposals} hidden></Form.Item>
        <div className="">
          <Form.Item name={FormJob.JobId} label="Mã">
            <Input disabled />
          </Form.Item>
        </div>

        <div className="">
          <Form.Item name={FormJob.Status} label="Trạng thái">
            <Select
              options={[
                ...getSystemCodeValues(systemCodes, "JOB_STATUS")?.map((e) => ({
                  value: e.value,
                  label: <span>{e.description}</span>,
                })),
              ]}
            />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormJob.TermType} label="Loại thời hạn">
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
          <Form.Item name={FormJob.SpecialtyId} label="Chuyên môn">
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
          <Form.Item name={FormJob.JobSkills} label="Kỹ năng">
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
          <Form.Item name={FormJob.LevelFreelancerId} label="Trình độ kinh nghiệm">
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
          <Form.Item name={FormJob.BudgetType} label="Loại kinh phí">
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
                    <div className="">
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
        <div className="">
          <Form.Item name={FormJob.Title} label="Tiêu đề">
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormJob.Description} label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormJob.Skills} label="Tệp đính kèm">
            <Input />
          </Form.Item>
        </div>

        <div className="">
          <Form.Item name={FormJob.BudgetType} label="Ví trị">
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
      </div>
      <div className="row-item">
        <Tabs className="w-full" items={items} />
      </div>
    </div>
  );
});

export default InputItems;
