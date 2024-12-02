import { Modal } from "antd";

export const useNotification = () => {
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
        onCancel: info.onCancel,
        // onCancel:(close) => info?.onCancel? info?.onCancel : close(),
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
        className: info.className ?? "modal-center-notify",
        footer: false,
        closable: true,
        mask: true,
        centered: true,
        title: info?.message ? info.message : "Thông báo",
        content: info?.description ? info?.description : "",
        okText: "Xác nhận",
        cancelText: "Đóng",
        onOk: info.onOk,
        onCancel: (close) => (info?.onCancel ? info?.onCancel(close) : close()),
        // ...info,
        //   modalRender: (modalDom) => <ModalRender modalDom={modalDom}/>,
      });
      // setTimeout(() => {
      //   modal.destroy();
      // }, secondsToGo * 1000);
      return modal;
    },
  };
};
