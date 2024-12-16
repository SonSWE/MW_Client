import {
  faCheckCircle,
  //   faThumbsDown,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faHeart as faHeartSolid,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Rate } from "antd";
import { FormJob } from "../../../const/FormJob";
import { PriceFormatter } from "../../../utils/convertData";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { countProposalText, formatCreatedDate } from "../../../utils/utils";
import { CONST_YN } from "../../../const/FormConst";
import { getUserFromStorage } from "../../../store/actions/sharedActions";

const ListJob = ({ datas, apiClient, saveJob }) => {
    const userLogged = getUserFromStorage();

  return (
    <div className="list-job">
      <div className="text-sm text-label mb-4 px-4">
        Chọn những công việc phù hợp với kinh nghiệm của bạn để có cơ hội ký hợp đồng cao hơn
      </div>
      {datas.map((item) => (
        <div className="job-card">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-label">
                Đã đăng {formatCreatedDate(item?.[FormJob.CreateDate])}
              </div>
              <div className="text-lg !no-underline btn-text !text-black">
                {item?.[FormJob.Title]}
              </div>
            </div>
            <div className="flex">
              <Button type="text" shape="circle" icon={<FontAwesomeIcon icFon={faThumbsDown} />} />
              <Button
                type="text"
                shape="circle"
                onClick={() => {
                  saveJob({
                    [FormJob.JobId]: item?.[FormJob.JobId],
                    [FormJob.Saved]: item?.[FormJob.Saved],
                    freelancerId: userLogged?.freelancer?.freelancerId,
                  });
                }}
                icon={
                  <FontAwesomeIcon
                    icon={item?.[FormJob.Saved] === CONST_YN.Yes ? faHeartSolid : faHeartRegular}
                  />
                }
              />
            </div>
          </div>
          <div className="mt-2 text-xs text-label">
            {item?.[FormJob.TermTypeText]} - {item?.[FormJob.LevelFreelancerIdText]} -{" "}
            {item?.[FormJob.BudgetTypeText]}:
            {item?.[FormJob.BudgetType] === CONST_BUDGET_TYPE.Hourly
              ? `${PriceFormatter(item?.[FormJob.HourlyRateFrom])}/Giờ-${PriceFormatter(
                  item?.[FormJob.HourlyRateTo]
                )}/Giờ`
              : `${PriceFormatter(item?.[FormJob.CostEstimate])}`}
          </div>
          <div className="mt-5 text-base text-label mt-5">{item?.[FormJob.Description]}</div>
          <div className="flex items-center gap-3 mt-5">
            {item?.[FormJob.JobSkillsText]?.split(",")?.map((e) => (
              <div className="tag-skill">{e}</div>
            ))}
          </div>
          <div className="flex items-center gap-8 mt-5">
            <div className="">
              <FontAwesomeIcon icon={faCheckCircle} /> <span>Thanh toán được xác thực</span>
            </div>
            <div className="">
              <Rate style={{ fontSize: "14px" }} disabled defaultValue={2} />
              <span className="ml-2"> Đã thanh toán 500K+</span>
            </div>

            <div className="">
              <FontAwesomeIcon icon={faLocationDot} /> {item?.[FormJob.Position]}
            </div>
          </div>
          <div className="mt-5 text-base text-label mt-5">
            Đề xuất: {countProposalText(item?.[FormJob.CountOfProposal])}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListJob;
