import React from "react";
import FooterWorker from "../footer/FooterWorker";
import { Header } from "../header/Header";

const LayoutMessenger = ({ pageConfig }) => {
  //filter

  return (
    <>
      <div className="bg-white relative">
        <div className="content-scroll !pb-0 !h-screen">
          <Header />

          <div>
            <div className="h-full">
              <pageConfig.Component />
            </div>
            {/* <FooterWorker /> */}
          </div>
        </div>
      </div>
      <div className="draw-lg"></div>
    </>
  );
};

export default LayoutMessenger;
