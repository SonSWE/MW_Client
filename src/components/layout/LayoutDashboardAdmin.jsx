import React, { useRef } from "react";

import { Header } from "../header/Header";

import FooterSticky from "../footer/FooterSticky";

const LayoutDashboardAdmin = ({ ComponentConfig }) => {
  const ref = useRef({
    refFooter: useRef(null),
  });

  const onEvent = (data) => {
    return {
      Footer: ref.current.refFooter?.current?.onEvent(data),
    };
  };

  return (
    <>
      <div className="bg-gray-50 relative">
        <div className="content-scroll">
          <Header />

          <div className="px-16 py-4 h-full ">
            <ComponentConfig.pageConfig.config.PageContent />
          </div>
        </div>
        <FooterSticky />
      </div>
    </>
  );
};

export default LayoutDashboardAdmin;
