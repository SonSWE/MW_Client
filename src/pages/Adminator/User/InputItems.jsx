import { Checkbox, Form, Input, Select } from "antd";
import React, { useImperativeHandle } from "react";
import { FormUser } from "../../../const/FormUser";
import { useSelector } from "react-redux";
import { getSystemCodeValues, isRender } from "../../../utils/utils";
import { CONST_YN } from "../../../const/FormConst";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {
      formInstance.setFieldValue(FormUser.EnableLogon, CONST_YN.Yes);
    },
  }));

  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  return (
    <div>
      <div className="group-item">
        <div className="">
          <Form.Item name={FormUser.UserName} label="Tài khoản">
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormUser.Password} label="Mật khẩu">
            <Input.Password />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormUser.Name} label="Tên">
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormUser.Status} label="Trạng thái">
            <Select
              options={[
                ...getSystemCodeValues(systemCodes, "USER_STATUS")?.map((e) => ({
                  value: e.value,
                  label: <span>{e.description}</span>,
                })),
              ]}
            />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormUser.UserType} label="Loại tài khoản">
            <Select
              options={[
                ...getSystemCodeValues(systemCodes, "USER_TYPE")?.map((e) => ({
                  value: e.value,
                  label: <span>{e.description}</span>,
                })),
              ]}
            />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            className="pt-3 w-100"
            shouldUpdate={(prevValues, currentValues) =>
              isRender(prevValues, currentValues, [FormUser.MustChangePasswordAtNextLogon])
            }
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
                  >
                    Đổi mật khẩu vào lần đăng nhập sau
                  </Checkbox>
                </Form.Item>
              );
            }}
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            className="pt-3 w-100"
            shouldUpdate={(prevValues, currentValues) =>
              isRender(prevValues, currentValues, [FormUser.AccountIsLockedOut])
            }
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
                  >
                    Tài khoản bị khóa
                  </Checkbox>
                </Form.Item>
              );
            }}
          </Form.Item>
        </div>
        <div className="">
          <Form.Item
            className="pt-3 w-100"
            shouldUpdate={(prevValues, currentValues) =>
              isRender(prevValues, currentValues, [FormUser.EnableLogon])
            }
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
                  >
                    Cho phép đăng nhập
                  </Checkbox>
                </Form.Item>
              );
            }}
          </Form.Item>
        </div>
      </div>
    </div>
  );
});

export default InputItems;
