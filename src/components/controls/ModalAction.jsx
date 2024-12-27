import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { TYPE_ACTION } from "../../const/LayoutConst";
import { CONST_FORM_ACTION } from "../../const/FormConst";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { usePopupNotification } from "../../utils/formHelper";

const ModalAction = React.forwardRef(({ controller, searchCode, pageConfig, onEvent }, ref) => {
  //modal
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [formInstance] = Form.useForm();
  const notification = usePopupNotification();

  const refInput = useRef(null);

  useImperativeHandle(ref, () => ({
    onEvent: (data) => {
      if (data.type === TYPE_ACTION.OPEN_MODAL) {
        formInstance.setFieldsValue(data.data);
        if (data.data.action === CONST_FORM_ACTION.Detail) {
          setDisable(true);
        }
        showModal(data.data.action);
      } else if (data.type === TYPE_ACTION.SAVE_DATA_SUCCESS) {
        setIsLoading(false);
      } else if (data.type === TYPE_ACTION.BUTTON_ACTION_CLICK) {
        if (data.data.action === CONST_FORM_ACTION.Delete) {
          formInstance.setFieldsValue(data.data);
          showModal(data.data.action);
        } else {
          pageConfig
            .businessAction()
            .getDetailById(data.data[pageConfig.dataGrid.recordKey])
            .then((res) => {
              if (res?.data) {
                formInstance.setFieldsValue(res.data);
                showModal(data.data.action);
              }
            });
        }
      }
    },
  }));

  useEffect(() => {
    if (isModalOpen) {
      if (refInput.current?.triggerThayDoiBanGhi) {
        refInput.current?.triggerThayDoiBanGhi(formInstance.getFieldsValue());
      }
    }
  }, [isModalOpen]);

  const closeModal = () => {
    formInstance.resetFields();
    setAction("");
    setIsModalOpen(false);
    setIsLoading(false);
  };
  const handleOk = () => {
    formInstance.submit();
    formInstance.validateFields().then((values) => {
      setIsLoading(true);
      if (action === CONST_FORM_ACTION.Create) {
        pageConfig
          .businessAction()
          .addOne(values)
          .then((res) => {
            setIsLoading(false);
            if (res?.status === 200 && res?.data?.code > 0) {
              closeModal();
              notification.success({ message: "Tạo bản ghi thành công" });
              onEvent({
                type: TYPE_ACTION.SAVE_DATA_SUCCESS,
                data: { ...res.data },
              });
            }
          })
          .catch((err) => {
            onEvent({
              type: TYPE_ACTION.SAVE_DATA_ERROR,
              data: { ...err?.data },
            });
            setIsLoading(false);
            if (err.response) {
              if (err.response?.data?.message) {
                notification.error({
                  message: err.response.data.code + ": " + err.response.data.message,
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
      } else if (action === CONST_FORM_ACTION.Update) {
        pageConfig
          .businessAction()
          .updateOne(values)
          .then((res) => {
            setIsLoading(false);
            if (res?.status === 200 && res?.data?.code > 0) {
              closeModal();
              notification.success({ message: "Cập nhật thông tin bản ghi thành công" });
              onEvent({
                type: TYPE_ACTION.SAVE_DATA_SUCCESS,
                data: { ...res.data },
              });
            }
          })
          .catch((err) => {
            onEvent({
              type: TYPE_ACTION.SAVE_DATA_ERROR,
              data: { ...err?.data },
            });
            setIsLoading(false);
            if (err.response) {
              if (err.response?.data?.message) {
                notification.error({
                  message: err.response.data.code + ": " + err.response.data.message,
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
      } else if (action === CONST_FORM_ACTION.Delete) {
        pageConfig
          .businessAction()
          .deleteOne(values?.[pageConfig.dataGrid.recordKey])
          .then((res) => {
            setIsLoading(false);
            if (res?.status === 200 && res?.data?.code > 0) {
              closeModal();
              notification.success({ message: "Xóa thông tin bản ghi thành công" });
              onEvent({
                type: TYPE_ACTION.SAVE_DATA_SUCCESS,
                data: { ...res.data },
              });
            }
          })
          .catch((err) => {
            onEvent({
              type: TYPE_ACTION.SAVE_DATA_ERROR,
              data: { ...err?.data },
            });
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
      }
    });
  };

  const handleCancel = () => {
    // setIsModalOpen(false);
    const mustConfirmCloseAction = [CONST_FORM_ACTION.Create, CONST_FORM_ACTION.Update];
    if (mustConfirmCloseAction.includes(action)) {
      Modal.confirm({
        title: "Xác nhận",
        centered: true,
        // icon: <FontAwesomeIcon icon={faTriangleExclamation} size="2x" color="rgb(250 204 21)" />,
        content: "Thông tin có thể chưa đươc lưu, bạn có chắc chắn muốn thoát",
        okText: "Đồng ý",
        cancelText: "Hủy",
        onOk: () => {
          closeModal();
        },
      });
    } else {
      closeModal();
    }
  };
  const [action, setAction] = useState("");

  const showModal = (action) => {
    const allowedAction = [
      CONST_FORM_ACTION.Create,
      CONST_FORM_ACTION.Update,
      CONST_FORM_ACTION.Delete,
      CONST_FORM_ACTION.Detail,
    ];
    if (!allowedAction.includes(action)) {
      return;
    }

    setAction(action);
    setIsModalOpen(true);
  };

  const title = useMemo(() => {
    let title = "";
    switch (action) {
      case CONST_FORM_ACTION.Create:
        title = "Thêm mới";
        break;
      case CONST_FORM_ACTION.Update:
        title = "Cập nhật";
        break;
      case CONST_FORM_ACTION.Detail:
        title = "Xem chi tiết";
        break;
      case CONST_FORM_ACTION.Delete:
        title = (
          <span className="flex items-center gap-3">
            <FontAwesomeIcon icon={faTriangleExclamation} size="2x" color="rgb(250 204 21)" />{" "}
            <span>Cảnh báo</span>
          </span>
        );
        break;
      default:
        title = "";
    }
    return title;
  }, [action]);

  const topShadow =
    "inset 0px 6px 4px -4px rgba(17, 24, 39, 0.15), inset 0px 5px 1px -4px rgba(17, 24, 39, 0.1)";
  const bottomShadow =
    "inset 0px -6px 4px -4px rgba(17, 24, 39, 0.15), inset 0px -5px 1px -4px rgba(17, 24, 39, 0.1)";
  const noShadow = "none";

  const topRef = useRef();
  const bottomRef = useRef();
  const [topVisible, setTopVisible] = useState();
  const [bottomVisible, setBottomVisible] = useState();

  useEffect(() => {
    if (topRef.current) {
      const parentDiv = topRef.current.parentNode;
      const observerTop = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setTopVisible(entry.isIntersecting);
        },
        {
          root: parentDiv,
          rootMargin: "16px",
          threshold: 1,
        }
      );
      const observerBottom = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setBottomVisible(entry.isIntersecting);
        },
        {
          root: parentDiv,
          rootMargin: "16px",
          threshold: 1,
        }
      );
      observerTop.observe(topRef.current);
      observerBottom.observe(bottomRef.current);
    } else return;
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <Modal
          title={title}
          onCancel={handleCancel}
          centered
          open={isModalOpen}
          width="90vw"
          footer={[
            <Button
              type="primary"
              key="save"
              onClick={handleOk}
              hidden={
                ![
                  CONST_FORM_ACTION.Delete,
                  CONST_FORM_ACTION.Create,
                  CONST_FORM_ACTION.Update,
                ].includes(action)
              }
            >
              Lưu
            </Button>,
            <Button key="cancel" onClick={handleCancel}>
              Thoát
            </Button>,
          ]}
        >
          <div
            className="body-scroll relative z-50"
            style={{
              boxShadow: topVisible
                ? bottomVisible
                  ? noShadow
                  : bottomShadow
                : bottomVisible
                ? topShadow
                : `${topShadow}, ${bottomShadow}`,
            }}
          >
            <div ref={topRef}></div>
            <Form
              form={formInstance}
              className="py-5"
              disabled={disable || action === CONST_FORM_ACTION.Detail}
            >
              {action === CONST_FORM_ACTION.Delete ? (
                <div>
                  <div className="text-center font-bold mb-5">
                    Thao tác này không thể hoàn tác, Bạn có chắc chắn muốn xóa thông tin này ?
                  </div>
                  <Form.Item name={pageConfig.dataGrid.recordKey} hidden>
                    <Input />
                  </Form.Item>
                  {/* <Form.Item name="reasonDelete" label="Lý do xóa">
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item> */}
                </div>
              ) : (
                <Spin spinning={isLoading}>
                  <pageConfig.config.InputItems
                    formInstance={formInstance}
                    action={action}
                    ref={refInput}
                  />
                </Spin>
              )}
            </Form>
            <div ref={bottomRef}></div>
          </div>
        </Modal>
      )}
    </>
  );
});
export default ModalAction;
