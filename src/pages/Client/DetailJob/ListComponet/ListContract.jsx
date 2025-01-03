import { Button } from "antd";
import { FormFreelancer } from "../../../../const/FormFreelancer";
import { FormContract } from "../../../../const/FormContract";
import { CONST_CONTRACT_STATUS } from "../../../../utils/constData";
import BaseAvatar from "../../../../components/element/BaseAvatar";
import { formatDate, PriceFormatter } from "../../../../utils/convertData";

const ListContract = ({
  datas,
  apiClient,
  detailContract,
  approvalContract,
  paymentContract,
  endContract,
}) => {
  const classByStatus = (status) => {
    if (status === CONST_CONTRACT_STATUS.Active) {
      return "contract-active";
    } else if (
      status === CONST_CONTRACT_STATUS.Offer ||
      status === CONST_CONTRACT_STATUS.PendingEnd
    ) {
      return "contract-pending-accept";
    } else if (status === CONST_CONTRACT_STATUS.PendingPayment) {
      return "contract-pending-payment";
    } else if (status === CONST_CONTRACT_STATUS.Done) {
      return "contract-done";
    } else if (status === CONST_CONTRACT_STATUS.Closed) {
      return "contract-closed";
    }
    return "";
  };
  return (
    <div>
      <div className="list-job border rounded-xl">
        {datas.map((item) => (
          <div className="job-card flex justify-between">
            <div className="w-2/5">
              <div className="flex">
                <div>
                  <BaseAvatar size={60} src={item.freelancer?.[FormFreelancer.Avatar]} />
                </div>
                <div className="ml-5">
                  <div className="text-base font-medium">
                    {item.freelancer?.[FormFreelancer.Name]}
                  </div>
                  <div className="text-label">{item.freelancer?.[FormFreelancer.Title]}</div>
                </div>
              </div>
            </div>
            <div className="w-2/5">
              <div className="mb-2">
                <span className="font-bold">Giá trị hợp đồng:</span>{" "}
                <span>{PriceFormatter(item?.[FormContract.ContractAmount])}</span>
              </div>
              <div>
                <span className="font-bold">Ngày hiệu lực:</span>{" "}
                <span>{formatDate(item?.[FormContract.StartDate])}</span>
              </div>
              <div>
                <span className="font-bold">Ngày hết hạn:</span>{" "}
                <span>{formatDate(item?.[FormContract.EndDate])}</span>
              </div>
              <div className="mt-2">
                <span className="font-bold">Trạng thái:</span>{" "}
                <span
                  className={`border rounded-xl px-3 py-1 ${classByStatus(
                    item?.[FormContract.Status]
                  )}`}
                >
                  {item?.[FormContract.StatusText]}
                </span>
              </div>
              {/* <div className="w-full flex flex-wrap items-center gap-3 mt-5">
                {item.freelancer?.[FormFreelancer.SkillsText]?.split(",")?.map((e) => (
                  <div className="tag-skill">{e}</div>
                ))}
              </div> */}
            </div>
            {/* <div className="border rounded-xl h-fit p-2">{item?.[FormContract.StatusText]}</div> */}

            <div className="flex gap-3 w-1/5">
              {item?.[FormContract.Status] === CONST_CONTRACT_STATUS.PendingPayment && (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    paymentContract(item);
                  }}
                >
                  Thanh toán
                </Button>
              )}
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
              {item?.[FormContract.Status] === CONST_CONTRACT_STATUS.Active ||
              item?.[FormContract.Status] === CONST_CONTRACT_STATUS.PendingApprovalSubmit ? (
                <Button
                  size="large"
                  onClick={() => {
                    endContract(item);
                  }}
                >
                  Kết thúc
                </Button>
              ) : (
                <></>
              )}
              {/* <Button
                size="large"
                onClick={() => {
                  detailContract(item);
                }}
              >
                Xem
              </Button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListContract;
