import { Button, Form, Image, Spin } from "antd";
import { FormUser } from "../../const/FormUser";
import { useBusinessAction } from "./BusinessAction";
import { useNotification, usePopupNotification } from "../../utils/formHelper";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import imgDemo from "../../assets/image/ekyc.png";
import { useDispatch, useSelector } from "react-redux";
import { saveUserToStorage } from "../../store/actions/sharedActions";
import { useAxios } from "../../utils/apiHelper";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const popup = usePopupNotification();
  const apiClient = useBusinessAction();
  const Axios = useAxios();
  const notification = useNotification();
  const [formInstance] = Form.useForm();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.authReducer);

  const onAccept = () => {
    popup.confirmDuplicate({
      message: "Cảnh báo",
      description: "Bạn hãy kiểm tra chính xác các thông tin đã nhập.",
      onOk: (close) => {
        setIsLoading(true);
        formInstance.submit(),
          formInstance.validateFields().then((values) => {
            apiClient
              .VerifyEKYC(userLogged.username)
              .then((res) => {
                setIsLoading(false);
                if (res.status === 200) {
                  const userRemember = JSON.parse(localStorage.getItem("userRemember"));
                  console.log(localStorage.getItem("userRemember"), userRemember);
                  Axios.Login({
                    Username: userRemember?.username,
                    // Password: md5(values?.Password),
                    Password: userRemember?.Password,
                    Grant_type: "password",
                    Refresh_token: "",
                  }).then((res) => {
                    if (res) {
                      if (res?.status === 200 && res?.data?.code > 0) {
                        close();
                        saveUserToStorage(res.data);
                        dispatch({ type: "SET_USER", payload: res.data });
                        notification.success({ message: "Xác thực thành công" });
                        navigate("/");
                      }
                    }
                  });
                }
              })
              .catch((err) => {
                setIsLoading(false);
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
          });
      },
    });
  };

  const onReject = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="form-title text-2xl font-medium mb-5">Xác thực tài khoản</div>
      <div className="">
        <div className="">
          <Spin spinning={isLoading}>
            <Form form={formInstance}>
              <Form.Item name={FormUser.UserName} hidden />
              <div className="py-10">
                <Image src={imgDemo}></Image>
              </div>
              <div className="flex gap-3 w-full justify-end px-10">
                <Button className=" rounded-full" type="primary" onClick={onAccept}>
                  Hoàn thành
                </Button>
                <Button className="rounded-full" onClick={onReject}>
                  Hủy bỏ
                </Button>
              </div>
            </Form>
          </Spin>
        </div>
      </div>
    </>
  );
});

export default InputItems;
