import { Form, Input, Select } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { FormClient } from "../../../const/FormClient";
import { useSelector } from "react-redux";
import { convertToArray } from "../../../utils/convertData";
import { useAxios } from "../../../utils/apiHelper";
import { getSystemCodeValues, isRender } from "../../../utils/utils";
import { GroupBox } from "../../../components/element/GroupBox";
import { CONST_CLIENT_TYPE } from "../../../utils/constData";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
  }));

  const axios = useAxios();
  const [lstSpecialty, setLstSpecialty] = useState([]);
  const [clientType, setClientType] = useState();

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
    <div>
      <div className="group-item">
        <div className="item-group">
          <Form.Item name={FormClient.ClientId} label="Mã">
            <Input disabled />
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
        <div className="">
          <Form.Item name={FormClient.Password} label="Mật khẩu">
            <Input.Password />
          </Form.Item>
        </div>

        <div className="item-group">
          <Form.Item name={FormClient.ClientType} label="Loại khách hàng">
            <Select
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
            <Input />
          </Form.Item>
        </div>
        <div className="item-group">
          <Form.Item name={FormClient.Description} label="Mô tả">
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
      <GroupBox title="Thông tin liên hệ">
        <div className="group-item">
          
          {clientType === CONST_CLIENT_TYPE.Organization && (
            <div className="item-group">
              <Form.Item name={FormClient.Website} label="Website">
                <Input />
              </Form.Item>
            </div>
          )}

          {clientType === CONST_CLIENT_TYPE.Organization && (
            <div className="item-group">
              <Form.Item name={FormClient.Owner} label="Người sở hữu">
                <Input />
              </Form.Item>
            </div>
          )}

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
        </div>
      </GroupBox>
    </div>
  );
});

export default InputItems;
