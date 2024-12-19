import {
  Button,
  Carousel,
  Form,
  Input,
  Modal,
  Popconfirm,
  Progress,
  Rate,
  Tabs,
  Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { GroupBox } from "../../../components/element/GroupBox";
import { FormSystemCode, FormSystemCodeValue } from "../../../const/FormSystemCode";
import { convertToArray, isNullOrEmpty, isRender, makeid } from "../../../utils/utils";
import EditTableCommunityAG from "../../../components/controls/EditTableCommunityAG";
import { columnSystemCodeValue } from "./comom";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";
import delteteicon from "../../../assets/image/icon/ic_tip_delete.svg";
import addicon from "../../../assets/image/icon/ic_add_form.svg";
import BaseModal from "../../../components/controls/BaseModal";

import avt from "../../../assets/image/avtar.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faLocation,
  faLocationDot,
  faMagnifyingGlass,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle,
  faHeart as faHeartRegular,
  faThumbsDown,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { CONST_YN } from "../../../const/FormConst";
import { useBusinessAction } from "./BusinessAction";
import { FormFreelancer } from "../../../const/FormFreelancer";
import { useSelector } from "react-redux";
import ListJob from "./ListJob";
import { FormJob } from "../../../const/FormJob";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const apiClient = useBusinessAction();
  const popup = usePopupNotification();
  const notification = useNotification();
  const [jobs, setJobs] = useState([]);
  const userLogged = getUserFromStorage();

  const LoadJobs = () => {
    apiClient
      .GetByClientId(userLogged.client?.clientId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setJobs(convertToArray(res.data));
        }
      })
      .catch((e) => {
        setJobs([]);
      });
  };

  useEffect(() => {
    LoadJobs();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="text-lg font-medium">Xin chào {userLogged?.client?.name}</div>
        <div>
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => {
              navigate("/tao-cong-viec");
            }}
          >
            Tạo công việc mới
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-xl">Tổng quan</div>
        <ListJob datas={jobs} apiClient={apiClient} />
      </div>
    </div>
  );
});

export default InputItems;
