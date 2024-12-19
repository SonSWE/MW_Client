import { useNavigate } from "react-router-dom";
import { FormProposal } from "../../../const/FormJob";
import moment from "moment";
import { Button } from "antd";
import { FormContract } from "../../../const/FormContract";
import { CONST_CONTRACT_STATUS } from "../../../utils/constData";

const ListContract = ({ datas, apiClient, submitContract }) => {
  const navigate = useNavigate();

  return (
    <div>
      {datas?.length > 0 ? (
        <div className="">
          {datas.map((item) => (
            <div className="border-b flex items-center py-5">
              <div className="w-1/5">
                {moment(item?.[FormContract.CreateDate]).format("DD/MM/YYYY hh:mm")}
              </div>
              <div className="w-4/5 text-lg ">{item?.[FormContract.JobTitle]}</div>
              <div className="w-4/5 text-lg ">{item?.[FormContract.StatusText]}</div>
              <div className="w-1/5">
                {item?.[FormContract.Status] === CONST_CONTRACT_STATUS.Active ||
                item?.[FormContract.Status] === CONST_CONTRACT_STATUS.Reopen ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        submitContract(item);
                      }}
                      type="primary"
                    >
                      Gửi kết quả
                    </Button>
                    <Button onClick={() => {}}>Đóng</Button>
                  </div>
                ) : item?.[FormContract.Status] === CONST_CONTRACT_STATUS.Pending ? (
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
