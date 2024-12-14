import { Form, Input } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { FormClient } from "../../../const/FormClient";
import { useSelector } from "react-redux";
import { useAxios } from "../../../utils/apiHelper";
import { convertToArray } from "../../../utils/convertData";

const InputItemsSearch = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
  }));

  const axios = useAxios();
  const [lstSpecialty, setLstSpecialty] = useState([]);

  useEffect(() => {
    axios.collections.SAShare.GetSpecialties().then((res) => {
      if (res?.data) {
        setLstSpecialty(convertToArray(res.data));
      } else {
        setLstSpecialty([]);
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="item-group">
        <Form.Item name={FormClient.ClientId} label="Mã">
          <Input
            disabled
            onChange={(e) => {
              formInstance.setFieldValue(FormClient.ClientId, e.target.value.toUpperCase());
            }}
          />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.Name} label="Tên">
          <Input />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.Email} label="Email">
          <Input />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.Website} label="Website">
          <Input />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.SpecialtyId} label="Chuyên ngành">
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
      <div className="item-group">
        <Form.Item name={FormClient.PeopleInCompany} label="Số lượng nhân sự">
          <Select
            options={[
              ...getSystemCodeValues(systemCodes, "FREELANCER_STATUS")?.map((e) => ({
                value: e.value,
                label: <span>{e.description}</span>,
              })),
            ]}
          />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.TagLine} label="Khẩu hiệu">
          <Input />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.Description} label="Mô tả">
          <Input />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.Owner} label="Người sở hữu">
          <Input />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.PhoneNumber} label="Số điện thoại">
          <Input />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.Address} label="Địa chỉ">
          <Input />
        </Form.Item>
      </div>
      <div className="item-group">
        <Form.Item name={FormClient.Status} label="Trạng thái">
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
    </div>
  );
});

export default InputItemsSearch;
