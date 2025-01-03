import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../utils/formHelper";
import { useNavigate } from "react-router-dom";
import {
  convertToArray,
  getSystemCodeValues,
  isRender,
  GetUrlFileFromStorageAsync,
} from "../../utils/utils";
import { useBusinessAction } from "./BusinessAction";
import { CONST_CLIENT_TYPE, useGlobalConst } from "../../utils/constData";
import { formaterNumber, parserNumber } from "../../utils/Format";
import { useSelector } from "react-redux";
import { FormFreelancer } from "../../const/FormFreelancer";

import { CONST_YN } from "../../const/FormConst";
import { FormUser } from "../../const/FormUser";
import { useAxios } from "../../utils/apiHelper";
import { CONST_LOGIN_TYPE } from "../../const/LayoutConst";
import { BaseUploadImage } from "../../components/element/BaseUploadImage";
import { GroupBox } from "../../components/element/GroupBox";
import { FormClient } from "../../const/FormClient";

const Index = React.forwardRef(({ action, disabled }, ref) => {
  //state
  const [isLoadind, setIsLoadind] = useState(false);
  const [lstSkill, setLstSkill] = useState([]);
  const [lstSpecialty, setLstSpecialty] = useState([]);
  const [loginType, setLoginType] = useState();
  const [fileList, setFileList] = useState([]);
  const [clientType, setClientType] = useState();

  //hock
  const navigate = useNavigate();
  const apiClient = useBusinessAction();
  const axios = useAxios();
  const notification = useNotification();
  const [formInstance] = Form.useForm();
  const globalConst = useGlobalConst();
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  useEffect(() => {
    if (fileList?.length > 0) {
      if (fileList[0].status === "done") {
        GetUrlFileFromStorageAsync(fileList[0]?.name)
          .then((url) => {
            formInstance.setFieldValue("AVTLink", url);
            formInstance.setFieldValue(FormUser.Avatar, fileList[0]?.name);
          })
          .catch((error) => {
            console.log(error);
            // Handle any errors
          });
      }
    }
  }, [fileList]);

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

  //function
  const GetUrlFile = (fileName) => {};

  const submit = () => {
    formInstance.submit();
    formInstance.validateFields().then((values) => {
      setIsLoadind(true);
      if (loginType === CONST_LOGIN_TYPE.Client) {
        apiClient
          .SignUpClient(values)
          .then((res) => {
            setIsLoadind(false);
            if (res.status === 200) {
              notification.success({ message: "Đăng ký thành công" });
            }
            navigate("/login");
          })
          .catch((err) => {
            setIsLoadind(false);
            if (err.response) {
              if (err.response?.data?.message) {
                notification.error({
                  message: err.response.data.message,
                });
              }
            } else if (err.request) {
              notification.error({
                message: "Không thể kết nối đến máy chủ!",
              });
            } else {
              // Lỗi khác trong quá trình gửi yêu cầu
              console.error("Error:", err.message);
            }
          });
      } else if (loginType === CONST_LOGIN_TYPE.Freelancer) {
        apiClient
          .SignUpFreelancer(values)
          .then((res) => {
            setIsLoadind(false);
            if (res.status === 200) {
              notification.success({ message: "Đăng ký thành công" });
            }
            navigate("/");
          })
          .catch((err) => {
            setIsLoadind(false);
            if (err.response) {
              if (err.response?.data?.message) {
                notification.error({
                  message: err.response.data.message,
                });
              }
            } else if (err.request) {
              notification.error({
                message: "Không thể kết nối đến máy chủ!",
              });
            } else {
              // Lỗi khác trong quá trình gửi yêu cầu
              console.error("Error:", err.message);
            }
          });
      }
    });
  };

  return (
    <>
      <div className="bg-white relative">
        <div className="content-scroll !pb-0 !h-screen">
          <div>
            <div className="page-content-worker h-full">
              <div>
                {/* <Spin spinning={isLoadind}> */}
                <Form form={formInstance} className="py-5">
                  <div>
                    <div className="form-title text-2xl font-medium mb-5">Đăng ký tài khoản</div>
                    <div className="card-border">
                      <div className="text-xl font-medium mb-5">Loại tài khoản</div>
                      <Form.Item
                        name={FormUser.LoginType}
                        label=""
                        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                      >
                        <Select
                          onChange={(value) => setLoginType(value)}
                          options={[
                            ...getSystemCodeValues(systemCodes, "LOGIN_TYPE")?.map((e) => ({
                              value: e.value,
                              label: <span>{e.description}</span>,
                            })),
                          ]}
                        />
                      </Form.Item>
                    </div>

                    <div className="card-border">
                      <div className="text-xl font-medium mb-5">Thông tin tài khoản</div>

                      <div className="form-two-col">
                        <div className="group-items">
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
                        </div>
                      </div>
                    </div>
                    <div className="card-border">
                      <div className="text-xl font-medium mb-5">Ảnh đại diện</div>
                      <Form.Item name={FormUser.Avatar} hidden />
                      <Form.Item name={"AVTLink"} hidden />
                      <Form.Item
                        className="pt-3 w-100"
                        shouldUpdate={(prevValues, currentValues) =>
                          isRender(prevValues, currentValues, ["AVTLink"])
                        }
                      >
                        {({ getFieldValue }) => {
                          const url = getFieldValue("AVTLink");
                          return (
                            <div className="flex justify-center">
                              {/* <Image src={url} width={200} height={200}></Image> */}
                              <Avatar size={200} src={url} />
                            </div>
                          );
                        }}
                      </Form.Item>
                      <div className="card-border">
                        <div>Cập nhật ảnh đại diện</div>
                        <BaseUploadImage
                          fileList={fileList}
                          setFileList={setFileList}
                          multiple={false}
                        />
                      </div>
                    </div>
                    {loginType === CONST_LOGIN_TYPE.Freelancer ? (
                      <>
                        <div className="card-border">
                          <div className="text-xl font-medium mb-5">Thông tin cá nhân</div>
                          <div className="form-two-col">
                            <div className="group-items">
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
                            </div>
                          </div>
                        </div>
                        <div className="card-border">
                          <div className="text-xl font-medium mb-5">Thông tin chung</div>
                          <div className="form-two-col">
                            <div className="group-items">
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
                                      ...getSystemCodeValues(systemCodes, "PROJECT_LEVEL")?.map(
                                        (e) => ({
                                          value: e.value,
                                          label: <span>{e.description}</span>,
                                        })
                                      ),
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
                                <InputNumber
                                  className="w-full"
                                  step={1}
                                  min={0}
                                  max={80}
                                  suffix={"giờ/ tuần"}
                                />
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
                                    isRender(prevValues, currentValues, [
                                      FormFreelancer.IsOpeningForJob,
                                    ])
                                  }
                                >
                                  {({ getFieldValue, setFieldValue }) => {
                                    const checked =
                                      getFieldValue(FormFreelancer.IsOpeningForJob) === CONST_YN.Yes
                                        ? true
                                        : false;

                                    return (
                                      <Form.Item
                                        name={FormFreelancer.IsOpeningForJob}
                                        label={"Sẵn sàng nhận việc"}
                                      >
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
                          </div>
                        </div>
                      </>
                    ) : loginType === CONST_LOGIN_TYPE.Client ? (
                      <>
                        <div className="card-border">
                          <div className="text-xl font-medium mb-5">Thông tin cá nhân</div>
                          <div className="form-two-col">
                            <div className="group-items">
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
                                  name={FormClient.ClientType}
                                  label="Loại khách hàng"
                                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                                >
                                  <Select
                                    options={[
                                      ...getSystemCodeValues(systemCodes, "CLIENT_TYPE")?.map(
                                        (e) => ({
                                          value: e.value,
                                          label: <span>{e.description}</span>,
                                        })
                                      ),
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
                                <Form.Item
                                  name={FormClient.PeopleInCompany}
                                  label="Số lượng nhân sự"
                                >
                                  <Select
                                    options={[
                                      ...getSystemCodeValues(
                                        systemCodes,
                                        "COUNT_MEMBER_CLIENT"
                                      )?.map((e) => ({
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
                                  <Input.TextArea rows={4} />
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
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="flex flex-nowrap justify-end items-center gap-5 py-2">
                      <Button className="rounded-xl" type="primary" size="large" onClick={submit}>
                        Tiếp tục
                      </Button>
                      <Button className="rounded-xl" size="large">
                        Hủy bỏ
                      </Button>
                    </div>
                  </div>
                </Form>
                {/* </Spin> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Index;
