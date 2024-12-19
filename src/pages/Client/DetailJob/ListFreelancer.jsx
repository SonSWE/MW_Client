import {
  faCheckCircle,
  //   faThumbsDown,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faHeart as faHeartSolid,
  faThumbsDown,
  faArrowLeft,
  faHandHoldingDollar,
  faUserTie,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Drawer, Form, Rate } from "antd";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { PriceFormatter } from "../../../utils/convertData";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { countProposalText, formatCreatedDate } from "../../../utils/utils";
import { CONST_YN } from "../../../const/FormConst";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormFreelancer } from "../../../const/FormFreelancer";

const ListFreelancer = ({ datas, apiClient }) => {
  const navigate = useNavigate();

  return (
    <div>
      
        <div className="list-job border rounded-xl">
          {datas.map((item) => (
            <div className="job-card flex justify-between">
              
              <div>{item?.[FormFreelancer.Name]}</div>
              <div className="">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    navigate("/gui-yeu-cau?freelancerId=" + item?.[FormFreelancer.Name]);
                  }}
                >
                  Gửi yêu cầu
                </Button>
              </div>
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default ListFreelancer;
