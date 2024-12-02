import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";

const BaseModal = ({ title, open, footer, onCancel, children, props }) => {
  //modal

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
  }, [open]);

  return (
    <Modal
      title={title}
      onCancel={onCancel}
      centered
      open={open}
      width="90vw"
      footer={footer}
      {...props}
    >
      <div
        className="body-scroll"
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
        {children ? React.cloneElement(children, {}) : <></>}
        <div ref={bottomRef}></div>
      </div>
    </Modal>
  );
};
export default BaseModal;
