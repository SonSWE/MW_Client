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
  faArrowLeft,
  faHeart as faHeartSolid,
  faLocation,
  faLocationDot,
  faMagnifyingGlass,
  faPencil,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSearchAVD] = Form.useForm();
  const [jobsSuggest, setJobSuggest] = useState([]);
  const [jobsSaved, setJobsSaved] = useState([]);
  const userLogged = getUserFromStorage();

  const LoadJobsSuggest = () => {
    apiClient
      .GetSuggestByFreelancer(userLogged.freelancer?.freelancerId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setJobSuggest(convertToArray(res.data));
        }
      })
      .catch((e) => {
        setJobSuggest([]);
      });
  };

  const LoadJobsSaved = () => {
    apiClient
      .GetJobsSaved(userLogged.freelancer?.freelancerId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setJobsSaved([...convertToArray(res.data)]);
        }
      })
      .catch((e) => {
        setJobsSaved([]);
      });
  };
  useEffect(() => {
    LoadJobsSuggest();
    LoadJobsSaved();
  }, []);


  const navigate = useNavigate();

  const saveJob = (prop) => {
    if (prop?.[FormJob.Saved] === CONST_YN.Yes) {
      apiClient
        .RemoveSaveJob(prop)
        .then((res) => {
          if (res.status === 200 && res.data) {
            LoadJobsSaved();
          }
        })
        .catch((e) => {});
    } else {
      apiClient
        .InsertSaveJob(prop)
        .then((res) => {
          if (res.status === 200 && res.data) {
            LoadJobsSaved();
          }
        })
        .catch((e) => {});
    }
  };

  return (
    <div className="">
      <div className="py-2">
        <a
          onClick={() => {
            navigate("/tim-viec");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Quay lại trang tìm kiếm
        </a>
      </div>
      <div className="">
        <ListJob datas={jobsSuggest} apiClient={apiClient} saveJob={saveJob} />
      </div>
    </div>
  );
});

export default InputItems;
