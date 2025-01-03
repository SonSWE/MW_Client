import { Form, Input, Select } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { FormClient } from "../../../const/FormClient";
import { useSelector } from "react-redux";
import { useAxios } from "../../../utils/apiHelper";
import { convertToArray } from "../../../utils/convertData";
import { getSystemCodeValues } from "../../../utils/utils";

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
    <div className="form-two-col">
      <div className="group-items">
        <div className="item-group">
          <Form.Item name={FormClient.ClientId} label="Mã khách hàng">
            <Input allowClear />
          </Form.Item>
        </div>
        <div className="item-group">
          <Form.Item name={FormClient.Name} label="Tên">
            <Input allowClear />
          </Form.Item>
        </div>
        <div className="item-group">
          <Form.Item name={FormClient.Email} label="Email">
            <Input allowClear />
          </Form.Item>
        </div>

        <div className="item-group">
          <Form.Item name={FormClient.ClientType} label="Loại khách hàng">
            <Select
              mode="multiple"
              allowClear
              options={[
                ...getSystemCodeValues(systemCodes, "CLIENT_TYPE")?.map((e) => ({
                  value: e.value,
                  label: <span>{e.description}</span>,
                })),
              ]}
              onChange={(value) => setClientType(value)}
            />
          </Form.Item>
        </div>

        <div className="item-group">
          <Form.Item name={FormClient.SpecialtyId} label="Chuyên ngành">
            <Select
              mode="multiple"
              allowClear
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
              mode="multiple"
              allowClear
              options={[
                ...getSystemCodeValues(systemCodes, "COUNT_MEMBER_CLIENT")?.map((e) => ({
                  value: e.value,
                  label: <span>{e.description}</span>,
                })),
              ]}
            />
          </Form.Item>
        </div>
        <div className="item-group">
          <Form.Item name={FormClient.TagLine} label="Khẩu hiệu">
            <Input allowClear />
          </Form.Item>
        </div>
        <div className="item-group">
          <Form.Item name={FormClient.Description} label="Mô tả">
            <Input allowClear />
          </Form.Item>
        </div>

        <div className="item-group">
          <Form.Item name={FormClient.Status} label="Trạng thái">
            <Select
              mode="multiple"
              allowClear
              options={[
                ...getSystemCodeValues(systemCodes, "CLIENT_STATUS")?.map((e) => ({
                  value: e.value,
                  label: <span>{e.description}</span>,
                })),
              ]}
            />
          </Form.Item>
        </div>

        <div className="item-group">
          <Form.Item name={FormClient.Website} label="Website">
            <Input allowClear />
          </Form.Item>
        </div>

        <div className="item-group">
          <Form.Item name={FormClient.Owner} label="Người sở hữu">
            <Input allowClear />
          </Form.Item>
        </div>

        <div className="item-group">
          <Form.Item name={FormClient.PhoneNumber} label="Số điện thoại">
            <Input allowClear />
          </Form.Item>
        </div>
        <div className="item-group">
          <Form.Item name={FormClient.Address} label="Địa chỉ">
            <Input allowClear />
          </Form.Item>
        </div>
      </div>
    </div>
  );
});

export default InputItemsSearch;
