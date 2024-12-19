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
import { FormJob } from "../../../const/FormJob";
import { PriceFormatter } from "../../../utils/convertData";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { countProposalText, formatCreatedDate } from "../../../utils/utils";
import { CONST_YN } from "../../../const/FormConst";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListJob = ({ datas, apiClient }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="border rounded-xl">
        {datas.map((item) => (
          <div className="job-card" onClick={() => ShowJobDetail(item?.[FormJob.JobId])}>
            <div className="p-5 flex items-center nowrap justify-between">
              <div className="w-1/4 text-base font-medium">{item?.[FormJob.Title]}</div>
              <div className="w-2/4 flex gap-3 items-center">
                <div className="rounded border bg-[#1677ff] w-fit px-2 text-white">
                  {item?.[FormJob.StatusText]}
                </div>
                <div className="text-xs text-label">
                  Đã đăng {formatCreatedDate(item?.[FormJob.CreateDate])}
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium taxt-base">Đề xuất</div>
                  <div className="text-label">{item?.[FormJob.CountOfProposal]}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium taxt-base">Đã ký hợp đồng</div>
                  <div className="text-label">{item?.[FormJob.CountOfContract]}</div>
                </div>
              </div>
              <div className="w-fit flex justify-end">
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/chi-tiet-cong-viec?jobId=" + item?.[FormJob.JobId]);
                  }}
                >
                  Chi tiết công việc
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListJob;
