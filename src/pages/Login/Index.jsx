import { Button, Checkbox, Form, Input } from "antd";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import md5 from "md5";
import { saveUserToStorage } from "../../store/actions/sharedActions";
import { useAxios } from "../../utils/apiHelper";
import { useNotification } from "../../utils/formHelper";
import { FormUser } from "../../const/FormUser";
import { GetUrlFileFromStorageAsync } from "../../utils/utils";

const Index = () => {
  const [form] = Form.useForm();
  const Axios = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useNotification();

  const onFinish = async (values) => {
    let param = {
      Username: values?.username,
      // Password: md5(values?.Password),
      Password: values?.Password,
      Grant_type: "password",
      Refresh_token: "",
    };

    Axios.Login(param)
      .then(async (res) => {
        if (res) {
          if (res?.status === 200 && res?.data?.code > 0) {
            saveUserToStorage(res.data);

            dispatch({ type: "SET_USER", payload: res.data });

            if (values.remember === true) {
              localStorage.setItem(
                "userRemember",
                JSON.stringify({
                  username: values?.username,
                  Password: values?.Password,
                  Remember: values?.remember,
                })
              );
            }
            notification.success({
              message: "Đăng nhập thành công",
            });
            navigate("/");
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            notification.error({
              message: err.response.data.message,
            });
          }
        } else if (err.request) {
          notification.error({
            message: "Đăng nhập thất bại, không thể kết nối đến máy chủ!",
          });
        } else {
          // Lỗi khác trong quá trình gửi yêu cầu
          console.error("Error:", err.message);
        }
      });
  };
  return (
    <>
      <div className="w-screen h-screen flex bg-blue-500 overflow-auto">
        <div className="m-auto rounded-xl py-20 px-6 bg-white shadow-lg shadow-indigo-500/40 w-96">
          <div className="font-bold text-2xl mb-10 uppercase">Đăng nhập</div>
          <Form
            form={form}
            onFinish={onFinish}
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <div className="flex flex-col gap-3">
              <Form.Item
                label="Tài khoản"
                name={"username"}
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
              >
                <Input placeholder="Username" className="h-10 rounded-3xl" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name={"Password"}
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
              >
                <Input.Password placeholder="Password" className="h-10  rounded-3xl" />
              </Form.Item>

              <div className="ant-form-remember flex ">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Nhớ mật khẩu</Checkbox>
                </Form.Item>
              </div>
              <div className="login_footer w-full flex gap-5">
                <Button
                  className="w-full h-12  rounded-3xl"
                  onClick={() => {
                    navigate("/dang-ky");
                  }}
                >
                  Đăng ký
                </Button>
                <Button type="primary" className="w-full h-12  rounded-3xl" htmlType="submit">
                  Đăng nhập
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Index;
