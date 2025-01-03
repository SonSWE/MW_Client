import React, { useEffect, useState } from "react";
import { convertToArray, formatDate, PriceFormatter } from "../../utils/convertData";
import { FormTransaction, FormWallet } from "../../const/FormWallet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Input, InputNumber, List } from "antd";
import { CONST_TRANSACTION_TYPE, useGlobalConst } from "../../utils/constData";
import moment from "moment";
import { useSelector } from "react-redux";
import { useBusinessAction } from "./BusinessAction";
import { isNullOrEmpty, isRender } from "../../utils/utils";
import BaseModal from "../../components/controls/BaseModal";
import { useForm } from "antd/es/form/Form";
import { formaterNumber, parserNumber } from "../../utils/Format";
import { useNotification } from "../../utils/formHelper";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const apiClient = useBusinessAction();
  const userLogin = useSelector((state) => state.authReducer);
  const [detailWallet, setDetailWallet] = useState();
  const [isShowModal, setIsShowModal] = useState(false);
  const [formInstance] = useForm();
  const [title, setTitle] = useState("");
  const globalConst = useGlobalConst();
  const notification = useNotification();

  const onSubmit = () => {
    formInstance.submit(),
      formInstance.validateFields().then((values) => {
        console.log(values);
        if (values?.[FormTransaction.TransactionType] === CONST_TRANSACTION_TYPE.Deposit) {
          apiClient
            .Deposit(values)
            .then((res) => {
              if (res.status === 200) {
                notification.success({ message: "Nạp tiền thành công thành công" });
                onCancel();
                LoadData();
              }
            })
            .catch((err) => {
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
        } else if (values?.[FormTransaction.TransactionType] === CONST_TRANSACTION_TYPE.Withdraw) {
          apiClient
            .Withdraw(values)
            .then((res) => {
              if (res.status === 200) {
                notification.success({ message: "Rút tiền thành công thành công" });
                onCancel();
                LoadData();
              }
            })
            .catch((err) => {
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

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = () => {
    if (!isNullOrEmpty(userLogin?.username)) {
      apiClient
        .GetWalletDetail(userLogin?.username)
        .then((res) => {
          if (res?.status === 200 && res?.data) {
            setDetailWallet(res?.data);
          } else {
            setDetailWallet(undefined);
          }
        })
        .catch((e) => {
          setDetailWallet(undefined);
        });
    }
  };

  const OnShowModal = (action) => {
    if (action === CONST_TRANSACTION_TYPE.Deposit) {
      setTitle("Nạp tiền");
    } else if (action === CONST_TRANSACTION_TYPE.Withdraw) {
      setTitle("Rút tiền");
    }

    setIsShowModal(true);
    formInstance.setFieldValue(FormTransaction.TransactionType, action);
    formInstance.setFieldValue(FormTransaction.WalletId, detailWallet?.[FormWallet.WalletId]);
  };
  const onCancel = () => {
    setIsShowModal(false);
    formInstance.resetFields();
  };
  const IconByTransType = (type) => {
    if (type === CONST_TRANSACTION_TYPE.Receive) {
      return <FontAwesomeIcon icon={faCirclePlus} color="#3dc43d" size="3x" />;
    } else if (type === CONST_TRANSACTION_TYPE.Deposit) {
      return <FontAwesomeIcon icon={faMoneyBillTransfer} color="#3dc43d" size="3x" />;
    } else if (type === CONST_TRANSACTION_TYPE.Withdraw) {
      return <FontAwesomeIcon icon={faMoneyBillTransfer} color="#ff4949" size="3x" />;
    } else {
      return <FontAwesomeIcon icon={faMoneyBillTransfer} color="#73b0df" size="3x" />;
    }
  };
  return (
    <div>
      <div className="w-full flex items-center justify-between mt-5">
        <div className="text-2xl font-medium ">Ví tiền của bạn</div>
        <div className="flex items-center gap-5">
          <Button
            size="large"
            onClick={() => {
              OnShowModal(CONST_TRANSACTION_TYPE.Deposit);
            }}
          >
            Nạp Tiền
          </Button>
          <Button
            size="large"
            onClick={() => {
              OnShowModal(CONST_TRANSACTION_TYPE.Withdraw);
            }}
          >
            Rút tiền
          </Button>
        </div>
      </div>

      <div className="grid grid-flow-col gap-10 mt-5">
        <div className="border rounded-xl w-full h-full p-5">
          <div className="text-lg">Số tài khoản</div>
          <div className="text-xl font-bold">{detailWallet?.[FormWallet.WalletId]}</div>
          <div className="text-label">Trạng thái: <span className="text-[#3dc43d] font-bold">{detailWallet?.[FormWallet.StatusText]}</span></div>
        </div>
        <div className="border rounded-xl w-full h-full p-5">
          <div className="text-lg">Số dư tài khoản</div>
          <div className="text-xl font-bold">
            {PriceFormatter(detailWallet?.[FormWallet.Balance])}
          </div>
        </div>
      </div>
      <div className="text-2xl font-medium mt-5">Lịch sử giao dịch</div>
      <List
        className="mt-5"
        header={<div>{formatDate(moment(), "DD/MM/yyyy")}</div>}
        bordered
        dataSource={convertToArray(detailWallet?.[FormWallet.Transactions])}
        renderItem={(item) => (
          <List.Item>
            <div className="w-full flex items-start justify-between">
              <div className="w-full flex items-start gap-3">
                <div>{IconByTransType(item?.[FormTransaction.TransactionType])}</div>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-base">
                    {item?.[FormTransaction.TransactionTypeText]}
                  </div>
                  <div className="text-xs text-label">
                    {formatDate(item?.[FormTransaction.TransactionDate], "DD/MM/YYYY HH:mm")}
                  </div>
                  <div className="">STK nhận: {item?.[FormTransaction.WalletReceiveId]}</div>
                  <div className="">{item?.[FormTransaction.Description]}</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-base">
                  {PriceFormatter(item?.[FormTransaction.Amount])}
                </div>
                <div>{item?.[FormTransaction.StatusText]}</div>
              </div>
            </div>
          </List.Item>
        )}
      />
      <BaseModal
        title={title}
        onCancel={onCancel}
        centered
        open={isShowModal}
        width="90vw"
        footer={[
          <Button type="primary" key="save" onClick={onSubmit}>
            Tiếp tục
          </Button>,
          <Button key="cancel" onClick={onCancel}>
            Thoát
          </Button>,
        ]}
      >
        <Form form={formInstance} className="py-5">
          <Form.Item name={FormTransaction.TransactionType} hidden />
          <Form.Item name={FormTransaction.WalletId} hidden />
          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              isRender(prevValues, currentValues, [FormTransaction.TransactionType])
            }
          >
            {({ getFieldValue }) => {
              const transactionType = getFieldValue(FormTransaction.TransactionType);
              return (
                <>
                  <Form.Item
                    name={FormTransaction.Amount}
                    label={
                      transactionType === CONST_TRANSACTION_TYPE.Deposit
                        ? "Số tiền nạp"
                        : transactionType === CONST_TRANSACTION_TYPE.Deposit
                        ? "Số tiền rút"
                        : "Số tiền"
                    }
                    rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                  >
                    <InputNumber
                      className="w-full"
                      min={1000}
                      step={100}
                      formatter={formaterNumber}
                      parser={parserNumber}
                      suffix="đ"
                    />
                  </Form.Item>
                </>
              );
            }}
          </Form.Item>
          <Form.Item
            label="Mật khẩu đăng nhập"
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
          <Form.Item
            name={FormTransaction.Description}
            label="Ghi chú"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input maxLength={200} />
          </Form.Item>
        </Form>
      </BaseModal>
    </div>
  );
});

export default InputItems;
