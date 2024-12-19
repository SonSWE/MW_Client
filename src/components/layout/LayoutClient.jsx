import React from "react";

import { HeaderCustomer } from "../header/HeaderCustomer";
import FooterWorker from "../footer/FooterWorker";
import { HeaderClient } from "../header/HeaderClient";

const LayoutClient = ({ pageConfig }) => {
  //filter


  return (
    <>
      <div className="bg-white relative">
        <div className="content-scroll !pb-0">
          <HeaderClient />

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

export default LayoutClient;
