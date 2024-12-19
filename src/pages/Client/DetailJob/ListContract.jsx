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
import { CONST_BUDGET_TYPE, CONST_CONTRACT_STATUS } from "../../../utils/constData";
import { countProposalText, formatCreatedDate } from "../../../utils/utils";
import { CONST_YN } from "../../../const/FormConst";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormFreelancer } from "../../../const/FormFreelancer";
import { FormContract } from "../../../const/FormContract";

import avt from "../../../assets/image/avtar.webp";

const ListContract = ({ datas, apiClient, detailContract, approvalContract }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="list-job border rounded-xl">
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
            </div>
            <div className="w-1/5">
              <div className="w-full flex flex-wrap items-center gap-3 mt-5">
                {item.freelancer?.[FormFreelancer.SkillsText]?.split(",")?.map((e) => (
                  <div className="tag-skill">{e}</div>
                ))}
              </div>
            </div>
            <div className="border rounded-xl h-fit p-2">{item?.[FormContract.StatusText]}</div>

            <div className="flex gap-3">
              {item?.[FormContract.Status] === CONST_CONTRACT_STATUS.PendingApprovalSubmit && (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    approvalContract(item);
                  }}
                >
                  Duyệt kết quả
                </Button>
              )}

              <Button
                size="large"
                onClick={() => {
                  detailContract(item);
                }}
              >
                Xem
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListContract;
