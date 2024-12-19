import { useNavigate } from "react-router-dom";
import { FormProposal } from "../../../const/FormJob";
import moment from "moment";
import { Button } from "antd";
import { FormContract } from "../../../const/FormContract";

const ListContract = ({ datas, apiClient }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="">
        {datas.map((item) => (
          <div className="border-b flex items-center py-5">
            <div className="w-1/5">
              {moment(item?.[FormContract.CreateDate]).format("DD/MM/YYYY hh:mm")}
            </div>
            <div className="w-4/5 text-lg ">{item?.[FormContract.JobTitle]}</div>
            <div className="w-1/5">
              <Button
                onClick={() => {
                  navigate("/xac-nhan-hop-dong?contractId=" + item?.[FormContract.ContractId]);
                }}
                type="primary"
              >
                Xác nhận hợp đồng
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListContract;
