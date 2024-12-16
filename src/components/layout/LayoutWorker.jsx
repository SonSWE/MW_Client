import React from "react";

import { HeaderCustomer } from "../header/HeaderCustomer";
import FooterWorker from "../footer/FooterWorker";

const LayoutWorker = ({ pageConfig }) => {
  //filter


  return (
    <>
      <div className="bg-white relative">
        <div className="content-scroll !pb-0">
          <HeaderCustomer />

          <div>
            <div className="page-content-worker h-full">
              <pageConfig.Component />
            </div>
            <FooterWorker />
          </div>
        </div>
      </div>
      <div className="draw-lg"></div>
    </>
  );
};

export default LayoutWorker;
