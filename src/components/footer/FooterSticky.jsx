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

const FooterSticky = () => {
  const [isConnected, setIsConnected] = useState(true);
  return (
    <div className="footer_sticky px-10">
      <div className={isConnected ? "connected" : "disconnected"}>
        <FontAwesomeIcon icon={faServer} color="black" size="xs" className="mr-2" />
        <FontAwesomeIcon icon={faCircle} size="xs" className="mr-2" />
        {isConnected ? <span>Kết nối thành công</span> : <span>Kết nối thất bại</span>}
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
