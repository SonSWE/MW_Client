import { Checkbox, Form, Input, Select } from "antd";
import React from "react";
import { FormUser } from "../../../const/FormUser";
import { getSystemCodeValues, isRender } from "../../../utils/utils";
import { useSelector } from "react-redux";
import { CONST_YN } from "../../../const/FormConst";

const InputItemsSearch = React.forwardRef(
  ({ controller, searchCode, pageConfig, onEvent }, ref) => {
    const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

    return (
      <div className="form-two-col">
        <div className="group-items">
          <div className="item-group">
            <Form.Item name={FormUser.UserName} label="Tài khoản">
              <Input />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item name={FormUser.Name} label="Tên">
              <Input />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item name={FormUser.Status} label="Trạng thái">
              <Select
                allowClear
                mode="multiple"
                options={[
                  ...getSystemCodeValues(systemCodes, "USER_STATUS")?.map((e) => ({
                    value: e.value,
                    label: <span>{e.description}</span>,
                  })),
                ]}
              />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item name={FormUser.UserType} label="Loại tài khoản">
              <Select
                allowClear
                mode="multiple"
                options={[
                  ...getSystemCodeValues(systemCodes, "USER_TYPE")?.map((e) => ({
                    value: e.value,
                    label: <span>{e.description}</span>,
                  })),
                ]}
              />
            </Form.Item>
          </div>

          <div className="item-group">
            <Form.Item name={FormUser.PhoneNumber} label="Số điện thoại">
              <Input />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                isRender(prevValues, currentValues, [FormUser.MustChangePasswordAtNextLogon])
              }
              label={"Đổi mật khẩu vào lần đăng nhập sau"}
            >
              {({ getFieldValue, setFieldValue }) => {
                const checked =
                  getFieldValue(FormUser.MustChangePasswordAtNextLogon) === CONST_YN.Yes
                    ? true
                    : false;
                return (
                  <Form.Item name={FormUser.MustChangePasswordAtNextLogon}>
                    <Checkbox
                      checked={checked}
                      onChange={(e) => {
                        setFieldValue(
                          FormUser.MustChangePasswordAtNextLogon,
                          e.target.checked ? CONST_YN.Yes : CONST_YN.No
                        );
                      }}
                    ></Checkbox>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                isRender(prevValues, currentValues, [FormUser.AccountIsLockedOut])
              }
              label={"Tài khoản bị khóa"}
            >
              {({ getFieldValue, setFieldValue }) => {
                const checked =
                  getFieldValue(FormUser.AccountIsLockedOut) === CONST_YN.Yes ? true : false;
                return (
                  <Form.Item name={FormUser.AccountIsLockedOut}>
                    <Checkbox
                      checked={checked}
                      onChange={(e) => {
                        setFieldValue(
                          FormUser.AccountIsLockedOut,
                          e.target.checked ? CONST_YN.Yes : CONST_YN.No
                        );
                      }}
                    ></Checkbox>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                isRender(prevValues, currentValues, [FormUser.EnableLogon])
              }
              label={"Cho phép đăng nhập"}
            >
              {({ getFieldValue, setFieldValue }) => {
                const checked = getFieldValue(FormUser.EnableLogon) === CONST_YN.Yes ? true : false;

                return (
                  <Form.Item name={FormUser.EnableLogon}>
                    <Checkbox
                      checked={checked}
                      onChange={(e) => {
                        setFieldValue(
                          FormUser.EnableLogon,
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
      </div>
    );
  }
);

export default InputItemsSearch;
