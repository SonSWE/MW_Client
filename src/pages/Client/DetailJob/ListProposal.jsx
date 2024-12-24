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

import avt from "../../../assets/image/avtar.webp";

const ListProposal = ({ datas, apiClient }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="list-job">
        {datas.map((item) => (
          <div className="job-card flex justify-between">
            <div className="w-1/5">
              <div className="flex">
                <div className="w-10 rounded-full overflow-hidden">
                  <img className="w-full h-full" src={avt}></img>
                </div>
                <div className="ml-5">
                  <div className="text-base font-medium">
                    {item.freelancer?.[FormFreelancer.Name]}
                  </div>
                  <div className="text-label">{item.freelancer?.[FormFreelancer.Title]}</div>
                </div>
              </div>
              <div className="mt-10">
                <Button
                  type="primary"
                  // size="large"
                  onClick={() => {
                    navigate("/gui-yeu-cau?proposalId=" + item?.[FormProposal.ProposalId]);
                  }}
                >
                  Gửi yêu cầu
                </Button>
              </div>
            </div>
            <div className="w-1/5">
              <div className="w-full flex flex-wrap items-center gap-3 mt-5">
                {item.freelancer?.[FormFreelancer.SkillsText]?.split(",")?.map((e) => (
                  <div className="tag-skill">{e}</div>
                ))}
              </div>
            </div>
            <div className="w-2/5">
              <div className="font-medium">{PriceFormatter(item?.[FormProposal.BidAmount])}</div>
              <div>{item?.[FormProposal.CoverLetter]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProposal;
