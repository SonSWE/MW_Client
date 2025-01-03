import { Form, Select } from "antd";
import { FormFreelancer } from "../../../../const/FormFreelancer";
import { useEffect, useState } from "react";
import { useGlobalConst } from "../../../../utils/constData";
import { useAxios } from "../../../../utils/apiHelper";
import { convertToArray } from "../../../../utils/convertData";

const FormSkill = ({ formInstance }) => {
  const [lstSkill, setLstSkill] = useState([]);
  const globalConst = useGlobalConst();

  const axios = useAxios();

  useEffect(() => {
    axios.collections.SAShare.GetSkills().then((res) => {
      if (res?.data) {
        setLstSkill(convertToArray(res.data));
      } else {
        setLstSkill([]);
      }
    });
  }, []);

  useEffect(() => {
    formInstance.setFieldValue(
      "skillSelect",
      formInstance.getFieldValue(FormFreelancer.Skills).map((e) => e?.[FormFreelancer.SkillId])
    );
  }, []);

  return (
    <div>
      <Form.Item name={FormFreelancer.Skills} />
      <Form.Item
        name={"skillSelect"}
        label="Kỹ năng"
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Select
          allowClear
          mode="multiple"
          maxCount={15}
          onChange={(values) => {
            formInstance.setFieldValue(
              FormFreelancer.Skills,
              values.map((e) => ({
                [FormFreelancer.SkillId]: e,
                [FormFreelancer.FreelancerId]: formInstance.getFieldValue(
                  FormFreelancer.FreelancerId
                ),
              }))
            );
          }}
          options={[
            ...lstSkill?.map((e) => ({
              value: e.skillId,
              label: <span>{e.name}</span>,
            })),
          ]}
        />
      </Form.Item>
    </div>
  );
};

export default FormSkill;
