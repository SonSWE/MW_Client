import { Button } from "antd";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { PriceFormatter } from "../../../utils/convertData";
import { countProposalText, formatCreatedDate } from "../../../utils/utils";
import {
  faCheckCircle,
  faHandHoldingDollar,
  faLocationDot,
  faPencil,
  faUserTie,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabJobInformation = ({ jobDetail }) => {
  return (
    <div>
      <div className="job-preview-responesive">
        <div className="preview-content grid grid-flow-col grid-cols-4">
          <div className="col-span-3 border-r ">
            <div className="p-6 border-b">
              <div className="flex text-sm text-label mt-1">
                <div className="">Đã đăng {formatCreatedDate(jobDetail?.[FormJob.CreateDate])}</div>
                <div>
                  <div className="ml-3">
                    <FontAwesomeIcon icon={faLocationDot} /> {jobDetail?.[FormJob.Position]}
                  </div>
                </div>
              </div>
              <div className="py-3 display-on-sm">
                <div className="">
                  <span>Một lần gửi đề xuất: </span>
                  <span className="font-medium">6 Connects</span>
                </div>
                <div className="">
                  <span>Connects khả dụng: </span>
                  <span className="font-medium">140</span>
                </div>
              </div>
            </div>
            <div className="p-6 border-b">{jobDetail?.[FormJob.Description]}</div>
            <div className="p-6 border-b">
              <div className="grid grid-flow-col grid-cols-3 gap-12">
                <div className="flex w-full">
                  <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
                  <div>
                    <span className="font-medium ml-2">
                      {jobDetail?.[FormJob.BudgetType] === CONST_BUDGET_TYPE.Hourly
                        ? `${PriceFormatter(
                            jobDetail?.[FormJob.HourlyRateFrom]
                          )}/Giờ-${PriceFormatter(jobDetail?.[FormJob.HourlyRateTo])}/Giờ`
                        : `${PriceFormatter(jobDetail?.[FormJob.CostEstimate])}`}
                    </span>
                    <div className="">{jobDetail?.[FormJob.BudgetTypeText]}</div>
                  </div>
                </div>
                <div className="flex w-full">
                  <FontAwesomeIcon icon={faUserTie} size="lg" />
                  <div>
                    <span className="font-medium ml-2 ">
                      {jobDetail?.[FormJob.LevelFreelancerIdText]}
                    </span>
                    <div className="">
                      Tôi đang tìm kiếm freelance chình độ kinh nghiệm{" "}
                      {jobDetail?.[FormJob.LevelFreelancerIdText]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-b">
              <div className="">
                <span className="font-medium">Loại công việc: </span>
                <span>{jobDetail?.[FormJob.TermTypeText]}</span>
              </div>
            </div>
            <div className="p-6 border-b">
              <div className="text-2xl mb-3">Kỹ năng và kinh nghiệm</div>
              <div className="flex flex-wrap w-2/4 gap-4">
                {jobDetail?.[FormJob.JobSkillsText]?.split(",")?.map((e) => (
                  <div className="tag-skill">{e}</div>
                ))}
              </div>
            </div>
            <div className="p-6 border-b">
              <div className="text-2xl mb-3">Trạng thái của công việc</div>
              <div className="text-sm text-label">
                <div>
                  <span>Đề xuất: </span>
                  <span>{countProposalText(jobDetail?.[FormJob.CountOfProposal])}</span>
                </div>
                <div>
                  <span>Phỏng vấn: </span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="p-6 border-b">
              <div className="display-on-sm">
                <div className="text-2xl mb-3">Về khách hàng</div>
                <div>
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  <span> Đã xác thực thanh toán</span>
                </div>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  <span> Đã xác thực định danh</span>
                </div>
                <div className="mt-2 font-medium">Hà Nội</div>
              </div>
            </div>
          </div>
          <div className="col-span-1 p-8 display-on-lg">
            <div className="content-lager">
              <div className="flex flex-col gap-3 ">
                <Button
                  className="w-full rounded-full justify-start"
                  type="text"
                  classNames="text-[#1677ff]"
                  icon={<FontAwesomeIcon icon={faPencil} />}
                  onClick={() => setDisabledEdit(false)}
                >
                  Chỉnh sửa công việc
                </Button>
                <Button
                  className="w-full rounded-full justify-start"
                  type="text"
                  classNames="text-[#1677ff]"
                  icon={<FontAwesomeIcon icon={faXmark} />}
                  onClick={() => setDisabledEdit(false)}
                >
                  Xóa
                </Button>
              </div>
              <div className="py-3">
                <div className="">
                  <span>Một lần gửi đề xuất: </span>
                  <span className="font-medium">6 Connects</span>
                </div>
                <div className="">
                  <span>Connects khả dụng: </span>
                  <span className="font-medium">140</span>
                </div>
              </div>
              <div>
                <div className="text-2xl mb-3">Về khách hàng</div>
                <div>
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  <span> Đã xác thực thanh toán</span>
                </div>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  <span> Đã xác thực định danh</span>
                </div>
                <div className="mt-2 font-medium">Hà Nội</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabJobInformation;
