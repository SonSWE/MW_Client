import {
  faCalendar,
  faCircle,
  faDotCircle,
  faServer,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState } from "react";
import { wsReadyState } from "../../utils/socket";
import { useSelector } from "react-redux";

const FooterSticky = () => {
  const connectStatus = useSelector((state) => state.sysparamsReducer.CONNECTSTATUS);
  const classnameStatusConnect = (status) => {
    switch (status) {
      case wsReadyState.CONNECTING:
        return "connecting";
      case wsReadyState.OPEN:
        return "connected";
      default:
        return "disconnected";
    }
  };
  const textStatusConnect = (status) => {
    switch (status) {
      case wsReadyState.CONNECTING:
        return "Đang kết nối";
      case wsReadyState.OPEN:
        return "Đã kết nối";
      default:
        return "Kết nối thất bại";
    }
  };
  return (
    <div className="footer_sticky px-10">
      <div className={classnameStatusConnect(connectStatus)}>
        <FontAwesomeIcon icon={faServer} color="black" size="xs" className="mr-2" />
        <FontAwesomeIcon icon={faCircle} size="xs" className="mr-2" />
        <span>{textStatusConnect(connectStatus)}</span>
      </div>
      <div className="flex items-center gap-3">
        <div>
          <FontAwesomeIcon icon={faUser} size="xs" className="mr-2" />
          <span>{"Adminator"}</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faCalendar} size="xs" className="mr-2" />
          <span>{moment().format("DD/MM/yyyy")}</span>
        </div>
      </div>
    </div>
  );
};

export default FooterSticky;
