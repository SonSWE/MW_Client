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
  faLink,
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

const ListJob = ({ datas, apiClient, saveJob }) => {
  const navigate = useNavigate();
  const [formProposal] = useForm();
  const userLogged = getUserFromStorage();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState();

  const ShowJobDetail = (id) => {
    setOpen(true);
    setLoading(true);

    apiClient
      .GetDetailById(id)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.status === 200 && res.data) {
          setSelectedJob(res.data);
        }
      })
      .catch((e) => {
        setLoading(false);
        setSelectedJob(undefined);
      });
  };

  return (
    <div>
      <div className="list-job">
        <div className="text-sm text-label mb-4 px-4">
          Chọn những công việc phù hợp với kinh nghiệm của bạn để có cơ hội ký hợp đồng cao hơn
        </div>
        {datas.map((item) => (
          <div className="job-card" onClick={() => ShowJobDetail(item?.[FormJob.JobId])}>
            {item?.[FormJob.Applied] === CONST_YN.Yes && (
              <div className="rounded-full border boder-[#1677ff] w-fit px-2 text-[#1677ff] mb-1">
                <FontAwesomeIcon icon={faClipboardCheck} /> Đã gửi đề xuất
              </div>
            )}

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
                {/* <Button
                  type="text"
                  shape="circle"
                  icon={<FontAwesomeIcon icFon={faThumbsDown} />}
                /> */}
                <Button
                  type="text"
                  shape="circle"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
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
                ? ` ${PriceFormatter(item?.[FormJob.HourlyRateFrom])}/Giờ-${PriceFormatter(
                    item?.[FormJob.HourlyRateTo]
                  )}/Giờ`
                : ` ${PriceFormatter(item?.[FormJob.CostEstimate])}`}
            </div>
            <div className="mt-5 text-base text-label mt-5">{item?.[FormJob.Description]}</div>
            <div className="flex flex-wrap items-center gap-3 mt-5">
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

      <Drawer
        closable
        destroyOnClose
        // title={<p>Loading Drawer</p>}
        closeIcon={<FontAwesomeIcon icon={faArrowLeft} />}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        rootStyle={{ width: "100%" }}
        getContainer={document.querySelector(".draw-lg")}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Form form={formProposal}>
          <div className="job-preview-responesive">
            <div className="preview-content grid grid-flow-col grid-cols-4">
              <div className="col-span-3 border-r ">
                <div className="p-6 border-b">
                  <div className="text-2xl font-medium">{selectedJob?.[FormJob.Title]}</div>
                  <div className="flex text-sm text-label mt-1">
                    <div className="">
                      Đã đăng {formatCreatedDate(selectedJob?.[FormJob.CreateDate])}
                    </div>
                    <div>
                      <div className="ml-3">
                        <FontAwesomeIcon icon={faLocationDot} /> {selectedJob?.[FormJob.Position]}
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
                <div className="p-6 border-b">{selectedJob?.[FormJob.Description]}</div>
                <div className="p-6 border-b">
                  <div className="grid grid-flow-col grid-cols-3 gap-12">
                    <div className="flex w-full">
                      <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
                      <div>
                        <span className="font-medium ml-2">
                          {selectedJob?.[FormJob.BudgetType] === CONST_BUDGET_TYPE.Hourly
                            ? `${PriceFormatter(
                                selectedJob?.[FormJob.HourlyRateFrom]
                              )}/Giờ-${PriceFormatter(selectedJob?.[FormJob.HourlyRateTo])}/Giờ`
                            : `${PriceFormatter(selectedJob?.[FormJob.CostEstimate])}`}
                        </span>
                        <div className="">{selectedJob?.[FormJob.BudgetTypeText]}</div>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <FontAwesomeIcon icon={faUserTie} size="lg" />
                      <div>
                        <span className="font-medium ml-2 ">
                          {selectedJob?.[FormJob.LevelFreelancerIdText]}
                        </span>
                        <div className="">
                          Tôi đang tìm kiếm freelance chình độ kinh nghiệm{" "}
                          {selectedJob?.[FormJob.LevelFreelancerIdText]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-b">
                  <div className="">
                    <span className="font-medium">Loại công việc: </span>
                    <span>{selectedJob?.[FormJob.TermTypeText]}</span>
                  </div>
                </div>
                <div className="p-6 border-b">
                  <div className="text-2xl mb-3">Kỹ năng và kinh nghiệm</div>
                  <div className="flex flex-wrap w-2/4 gap-4">
                    {selectedJob?.[FormJob.JobSkillsText]?.split(",")?.map((e) => (
                      <div className="tag-skill">{e}</div>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-b">
                  <div className="text-2xl mb-3">Tệp đính kèm</div>
                  <div className="flex flex-col flex-wrap w-2/4 gap-2">
                    {selectedJob?.[FormJob.FileAttach]?.split("|")?.map((e) => (
                      <div
                        className="text-[#1677ff] !underline"
                        onClick={() => {
                          DowloadFileFormStorage(e);
                        }}
                      >
                        <FontAwesomeIcon icon={faLink} /> <a>{e}</a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-b">
                  <div className="text-2xl mb-3">Trạng thái của công việc</div>
                  <div className="text-sm text-label">
                    <div>
                      <span>Đề xuất: </span>
                      <span>{countProposalText(selectedJob?.[FormJob.CountOfProposal])}</span>
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
                  <div>
                    <Button
                      className="w-full rounded-xl"
                      type="primary"
                      onClick={() => {
                        navigate(`/gui-de-xuat?jobId=${selectedJob?.[FormJob.JobId]}`);
                      }}
                    >
                      Ứng tuyển ngay
                    </Button>
                    <Button
                      className="w-full  rounded-xl mt-4"
                      onClick={() => {
                        saveJob({
                          [FormJob.JobId]: selectedJob?.[FormJob.JobId],
                          [FormJob.Saved]: selectedJob?.[FormJob.Saved],
                          freelancerId: userLogged?.freelancer?.freelancerId,
                        });

                        setSelectedJob({
                          ...selectedJob,
                          [FormJob.Saved]:
                            selectedJob?.[FormJob.Saved] === CONST_YN.Yes
                              ? CONST_YN.No
                              : CONST_YN.Yes,
                        });
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          selectedJob?.[FormJob.Saved] === CONST_YN.Yes
                            ? faHeartSolid
                            : faHeartRegular
                        }
                      />{" "}
                      {selectedJob?.[FormJob.Saved] === CONST_YN.Yes ? "Đã lưu" : "Lưu"}
                    </Button>
                    {/* <Button>
                    <FontAwesomeIcon icon={faHeartSolid} /> Đã lưu
                  </Button> */}
                  </div>
                  <div>
                    <div className="text-2xl mb-3 mt-2">Về khách hàng</div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} color="green" />
                      <span> Đã xác thực định danh</span>
                    </div>
                    <div className="mt-2">
                      <FontAwesomeIcon icon={faCheckCircle} color="green" />
                      <span> Đã xác thực thanh toán</span>
                    </div>
                    {/* <div className="mt-2 font-medium">Hà Nội</div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="display-on-sm preview-footer">
              <div className="flex flex-nowrap justify-between items-center gap-8 px-6 py-2">
                <Button
                  className="w-full rounded-xl"
                  type="primary"
                  onClick={() => {
                    navigate(`/gui-de-xuat?jobId=${selectedJob?.[FormJob.JobId]}`);
                  }}
                >
                  Ứng tuyển ngay
                </Button>
                <Button
                  className="w-full  rounded-xl"
                  onClick={() => {
                    saveJob({
                      [FormJob.JobId]: selectedJob?.[FormJob.JobId],
                      [FormJob.Saved]: selectedJob?.[FormJob.Saved],
                      freelancerId: userLogged?.freelancer?.freelancerId,
                    });

                    setSelectedJob({
                      ...selectedJob,
                      [FormJob.Saved]:
                        selectedJob?.[FormJob.Saved] === CONST_YN.Yes ? CONST_YN.No : CONST_YN.Yes,
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      selectedJob?.[FormJob.Saved] === CONST_YN.Yes ? faHeartSolid : faHeartRegular
                    }
                  />{" "}
                  {selectedJob?.[FormJob.Saved] === CONST_YN.Yes ? "Đã lưu" : "Lưu"}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default ListJob;
