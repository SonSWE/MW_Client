import { Form } from "antd";
import React, { useEffect, useState } from "react";

import { convertToArray } from "../../../utils/utils";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { CONST_YN } from "../../../const/FormConst";
import { useBusinessAction } from "./BusinessAction";

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
