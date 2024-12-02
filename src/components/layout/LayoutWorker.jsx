import React from "react";

import { HeaderWorker } from "../header/HeaderWorker";
import FooterWorker from "../footer/FooterWorker";

const LayoutWorker = ({ pageConfig }) => {
  //filter


  return (
    <>
      <div className="bg-white relative">
        <div className="content-scroll !pb-0">
          <HeaderWorker />

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
