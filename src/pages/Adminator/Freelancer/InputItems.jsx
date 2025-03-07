import { Checkbox, DatePicker, Form, Input, InputNumber, Modal, Select, Tabs } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { convertToArray, getSystemCodeValues, isRender, makeid } from "../../../utils/utils";
import { usePopupNotification } from "../../../utils/formHelper";
import { useSelector } from "react-redux";
import { useAxios } from "../../../utils/apiHelper";
import { FormFreelancer, FormSpecialty } from "../../../const/FormFreelancer";
import WorkingHistoryTab from "./WorkingHistoryTab";
import EducationTab from "./EducationTab";
import CertificateTab from "./CertificateTab";

import { CONST_YN } from "../../../const/FormConst";
import moment from "moment/moment";
import { useGlobalConst } from "../../../utils/constData";
import { formaterNumber, parserNumber } from "../../../utils/Format";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {
      if (values?.[FormFreelancer.WorkingHistories]?.length > 0) {
        formInstance.setFieldValue(
          FormFreelancer.WorkingHistories,
          values?.[FormFreelancer.WorkingHistories].map((e, i) => ({ ...e, id: makeid() + i }))
        );
      }

      if (convertToArray(values?.[FormFreelancer.Skills]).length > 0) {
        formInstance.setFieldValue(
          FormFreelancer.Skills,
          convertToArray(values?.[FormFreelancer.Skills]).map((e) => e?.[FormFreelancer.SkillId])
        );
      }

      if (convertToArray(values?.[FormFreelancer.Specialties]).length > 0) {
        formInstance.setFieldValue(
          FormFreelancer.Specialties,
          convertToArray(values?.[FormFreelancer.Specialties]).map(
            (e) => e?.[FormSpecialty.SpecialtyId]
          )
        );
      }
    },
  }));

  const notification = usePopupNotification();
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);
  const axios = useAxios();
  const [lstSkill, setLstSkill] = useState([]);
  const [lstSpecialty, setLstSpecialty] = useState([]);
  const globalConst = useGlobalConst();

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
      key: "1",
      label: "Lịch sử làm việc",
      children: (
        <WorkingHistoryTab formInstance={formInstance} action={action} disabled={disabled} />
      ),
    },
    {
      key: "2",
      label: "Học vấn",
      children: <EducationTab formInstance={formInstance} action={action} disabled={disabled} />,
    },
    {
      key: "3",
      label: "Chứng chỉ",
      children: <CertificateTab formInstance={formInstance} action={action} disabled={disabled} />,
    },
  ];

  return (
    <div className="form-two-col">
      <div className="group-items">
        <Form.Item name={FormFreelancer.WorkingHistories} hidden></Form.Item>
        <Form.Item name={FormFreelancer.Educations} hidden></Form.Item>
        <Form.Item name={FormFreelancer.Certificates} hidden></Form.Item>
        <div className="">
          <Form.Item name={FormFreelancer.FreelancerId} label="Mã Freelancer">
            <Input disabled />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormFreelancer.Name}
            label="Họ và tên"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormFreelancer.DateOfBirth}
            label="Ngày sinh"
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
        <div className="">
          <Form.Item
            name={FormFreelancer.Email}
            label="Email"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormFreelancer.Password}
            label="Mật khẩu"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormFreelancer.PhoneNumber} label="Số điện thoại">
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormFreelancer.StreetAddress}
            label="Địa chỉ"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="">
          <Form.Item
            name={FormFreelancer.Status}
            label="Trạng thái"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Select
              options={[
                ...getSystemCodeValues(systemCodes, "CLIENT_STATUS")?.map((e) => ({
                  value: e.value,
                  label: <span>{e.description}</span>,
                })),
              ]}
            />
          </Form.Item>
        </div>

        <div className="">
          <Form.Item
            name={FormFreelancer.Skills}
            label="Kỹ năng"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Select
              allowClear
              mode="multiple"
              maxCount={15}
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
          <Form.Item
            name={FormFreelancer.Specialties}
            label="Chuyên môn"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Select
              mode="multiple"
              maxCount={10}
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
          <Form.Item
            name={FormFreelancer.LevelId}
            label="Trình độ"
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
        <Form.Item
          name={FormFreelancer.HourlyRate}
          label="Thu nhập bình quân"
          rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
        >
          <InputNumber
            className="w-full"
            min={1000}
            step={100}
            formatter={formaterNumber}
            parser={parserNumber}
            suffix={"đ/ giờ"}
          />
        </Form.Item>

        <Form.Item
          name={FormFreelancer.HourWorkingPerWeek}
          label="Số giờ làm việc trên tuần"
          rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
        >
          <InputNumber className="w-full" step={1} min={0} max={80} suffix={"giờ/ tuần"} />
        </Form.Item>

        <div className="">
          <Form.Item
            name={FormFreelancer.Title}
            label="Tiêu đề công việc"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input maxLength={250} />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormFreelancer.Bio} label="Giới thiệu bản thân">
            <Input.TextArea rows={4} maxLength={1000} />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              isRender(prevValues, currentValues, [FormFreelancer.IsOpeningForJob])
            }
          >
            {({ getFieldValue, setFieldValue }) => {
              const checked =
                getFieldValue(FormFreelancer.IsOpeningForJob) === CONST_YN.Yes ? true : false;

              return (
                <Form.Item name={FormFreelancer.IsOpeningForJob} label={"Sẵn sàng nhận việc"}>
                  <Checkbox
                    checked={checked}
                    onChange={(e) => {
                      setFieldValue(
                        FormFreelancer.IsOpeningForJob,
                        e.target.checked ? CONST_YN.Yes : CONST_YN.No
                      );
                    }}
                  ></Checkbox>
                </Form.Item>
              );
            }}
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
