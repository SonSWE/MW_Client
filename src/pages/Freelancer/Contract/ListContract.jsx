import { useNavigate } from "react-router-dom";
import { FormProposal } from "../../../const/FormJob";
import moment from "moment";
import { Button } from "antd";
import { FormContract } from "../../../const/FormContract";
import { CONST_CONTRACT_STATUS } from "../../../utils/constData";
import { formatDate, PriceFormatter } from "../../../utils/convertData";

const ListContract = ({ datas, apiClient, submitContract }) => {
  const navigate = useNavigate();
  const classByStatus = (status) => {
    if (
      status === CONST_CONTRACT_STATUS.Active ||
      status === CONST_CONTRACT_STATUS.PendingApprovalSubmit
    ) {
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
      {datas?.length > 0 ? (
        <div className="">
          {datas.map((item) => (
            <div className="border-b flex items-center py-5">
              <div className="w-2/5">
                <div className="text-lg font-bold">{item?.[FormContract.JobTitle]}</div>
                {moment(item?.[FormContract.CreateDate]).format("DD/MM/YYYY hh:mm")}
              </div>
              <div className="w-2/5">
                <div className="mb-2">
                  <span className="font-bold">Giá trị hợp đồng:</span>{" "}
                  <span>{PriceFormatter(item?.[FormContract.ContractAmount])}</span>
                </div>
                <div className="mb-2">
                  <span className="font-bold">Thực nhận:</span>{" "}
                  <span>{PriceFormatter(item?.[FormContract.RealReceive])}</span>
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
              </div>
              <div className="w-1/5">
                {item?.[FormContract.Status] === CONST_CONTRACT_STATUS.Active ||
                item?.[FormContract.Status] === CONST_CONTRACT_STATUS.PendingApprovalSubmit ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        submitContract(item);
                      }}
                      type="primary"
                    >
                      Gửi kết quả
                    </Button>
                  </div>
                ) : item?.[FormContract.Status] === CONST_CONTRACT_STATUS.Offer ? (
                  <Button
                    onClick={() => {
                      navigate("/xac-nhan-hop-dong?contractId=" + item?.[FormContract.ContractId]);
                    }}
                    type="primary"
                  >
                    Xác nhận hợp đồng
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      navigate("/xac-nhan-hop-dong?contractId=" + item?.[FormContract.ContractId]);
                    }}
                    type="primary"
                  >
                    Xem hợp đồng
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full text-lg text-center">Bạn chưa có hợp đồng</div>
      )}
    </div>
  );
};

export default ListContract;
