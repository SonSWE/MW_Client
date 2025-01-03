import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import React, { useImperativeHandle } from "react";
import { FormUser } from "../../../const/FormUser";
import { useSelector } from "react-redux";
import { getSystemCodeValues, isRender } from "../../../utils/utils";
import { CONST_YN } from "../../../const/FormConst";
import { useGlobalConst } from "../../../utils/constData";
import { GroupBox } from "../../../components/element/GroupBox";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const globalConst = useGlobalConst();
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
  }));

  return (
    <>
      <div className="form-two-col">
        <div className="group-items">
          <div className="item-group">
            <Form.Item
              name={FormUser.UserName}
              label="Tài khoản"
              rules={[
                globalConst.ANT.FORM.RULES.yeuCauNhap,
                globalConst.ANT.FORM.RULES.chiNhapEmail,
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item
              name={FormUser.Password}
              label="Mật khẩu"
              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item
              name={FormUser.Name}
              label="Tên"
              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item
              name={FormUser.Status}
              label="Trạng thái"
              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            >
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
          <div className="item-group">
            <Form.Item
              name={FormUser.UserType}
              label="Loại tài khoản"
              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            >
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
          <div className="item-group">
            <Form.Item
              name={FormUser.IdentityCard}
              label="Mã CMND"
              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item
              name={FormUser.IdentityAddress}
              label="Nơi cấp"
              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item
              className="w-full"
              name={FormUser.IdentityIssueDate}
              label="Ngày hết hạn"
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
          <div className="item-group">
            <Form.Item
              className="w-full"
              name={FormUser.IdentityExpirationDate}
              label="Ngày hết hạn"
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
          <div className="item-group">
            <Form.Item
              name={FormUser.PhoneNumber}
              label="Số điện thoại"
              rules={[
                globalConst.ANT.FORM.RULES.yeuCauNhap,
                globalConst.ANT.FORM.RULES.soDienThoai,
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item name={FormUser.LoginType} label="Tài khoản đang đăng nhập" rules={[]}>
              <Input disabled />
            </Form.Item>
          </div>
          <div className="item-group">
            <Form.Item
              name={FormUser.LoggedClientId}
              label="Mã khách hàng đang đăng nhặp"
              rules={[]}
            >
              <Input disabled />
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
    </>
  );
});

export default InputItems;
