import { Form, Input, Select } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { FormClient } from "../../../const/FormClient";
import { useSelector } from "react-redux";
import { convertToArray } from "../../../utils/convertData";
import { useAxios } from "../../../utils/apiHelper";
import { getSystemCodeValues, isRender } from "../../../utils/utils";
import { GroupBox } from "../../../components/element/GroupBox";
import { CONST_CLIENT_TYPE, useGlobalConst } from "../../../utils/constData";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);
  const globalConst = useGlobalConst();
  const axios = useAxios();
  const [lstSpecialty, setLstSpecialty] = useState([]);
  const [clientType, setClientType] = useState();

  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
  }));

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
            <Input disabled />
          </Form.Item>
        </div>
        <div className="item-group">
          <Form.Item
            name={FormClient.Name}
            label="Tên"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="item-group">
          <Form.Item
            name={FormClient.Email}
            label="Email"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            name={FormClient.Password}
            label="Mật khẩu"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input.Password />
          </Form.Item>
        </div>

        <div className="item-group">
          <Form.Item
            name={FormClient.ClientType}
            label="Loại khách hàng"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
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
          <Form.Item
            name={FormClient.SpecialtyId}
            label="Chuyên ngành"
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
          <Form.Item
            name={FormClient.Status}
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
      </div>
      <GroupBox title="Thông tin liên hệ" className="mt-12">
        <div className="form-two-col">
          <div className="group-items">
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
        </div>
      </GroupBox>
    </div>
  );
});

export default InputItems;
