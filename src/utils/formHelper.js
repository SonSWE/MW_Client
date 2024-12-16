import { Modal, notification } from "antd";

export const usePopupNotification = () => {
  return {
    error: ({ title = "Thất bại", message = "Thất bại" }) => {
      const modal = Modal.error({
        title: title,
        centered: true,
        content: message,
      });
      return modal;
    },
    info: (info) => {
      let secondsToGo = 5;
      const modal = Modal.info({
        className: "modal-center-notify",
        footer: false,
        closable: true,
        mask: true,
        centered: true,
        title: info?.message ? info.message : "Thông báo",
        content: info?.description ? info?.description : "",
        //   modalRender: (modalDom) => <ModalRender modalDom={modalDom}/>,
        // ...info,
      });
      // setTimeout(() => {
      //   modal.destroy();
      // }, secondsToGo * 1000);
      return modal;
    },
    success: ({ title = "Thông báo", message = "Thành công" }) => {
      const modal = Modal.success({
        title: title,
        centered: true,
        content: message,
      });
      return modal;
    },
    warning: (info) => {
      let secondsToGo = 5;
      const modal = Modal.warning({
        className: info.className ?? "modal-center-notify",
        footer: false,
        closable: false,
        mask: true,
        centered: true,
        title: info?.message ? info.message : "Thông báo",
        content: info?.description ? info?.description : "",
        okText: "Đóng",
        // ...info,
        //   modalRender: (modalDom) => <ModalRender modalDom={modalDom}/>,
      });
      // setTimeout(() => {
      //   modal.destroy();
      // }, secondsToGo * 1000);
      return modal;
    },
    confirm: (info) => {
      let secondsToGo = 500;
      const modal = Modal.confirm({
        className: info.className ?? "modal-center-notify",
        footer: false,
        closable: false,
        mask: true,
        centered: true,
        title: info?.message ? info.message : "Thông báo",
        content: info?.description ? info?.description : "",
        okText: "Xác nhận",
        cancelText: "Đóng",
        onOk: info.onOk,
        // onCancel: info.onCancel,
        onCancel:(close) => info?.onCancel ? info?.onCancel(close) : close(),
        // ...info,
        //   modalRender: (modalDom) => <ModalRender modalDom={modalDom}/>,
      });
      // setTimeout(() => {
      //   modal.destroy();
      // }, secondsToGo * 1000);
      return modal;
    },
    confirmDuplicate: (info) => {
      let secondsToGo = 500;
      const modal = Modal.confirm({
        centered: true,
        title: info?.message ? info.message : "Thông báo",
        content: info?.description ? info?.description : "",
        okText: "Xác nhận",
        cancelText: "Đóng",
        onOk: info.onOk,
        onCancel: (close) => (info?.onCancel ? info?.onCancel(close) : close()),
        // ...info,
      });
      // setTimeout(() => {
      //   modal.destroy();
      // }, secondsToGo * 1000);
      return modal;
    },
  };
};

export const useNotification = () => {
  return {
    error: (prop) => {
      return notification.error({
        message: prop?.title ? prop.title : "Thất bại",
        description: prop?.message ? prop?.message : "Thất bại",
        placement: "bottomRight",
      });
    },
    info: (prop) => {
      return notification.info({
        message: prop?.title ? prop.title : "Thông báo",
        description: prop?.message ? prop?.message : "",
        placement: "bottomRight",
      });
    },
    success: (prop) => {
      return notification.success({
        message: prop?.title ? prop.title : "Thông báo",
        description: prop?.message ? prop?.message : "",
        placement: "bottomRight",
      });
    },
    warning: (prop) => {
      return notification.warning({
        message: prop?.title ? prop.title : "Cảnh báo",
        description: prop?.message ? prop?.message : "",
        placement: "bottomRight",
      });
    },
  };
};
