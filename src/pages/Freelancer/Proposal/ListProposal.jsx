import { useNavigate } from "react-router-dom";
import { FormProposal } from "../../../const/FormJob";
import moment from "moment";

const ListProposal = ({ datas, apiClient }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="">
        {datas.map((item) => (
          <div className="border-b flex items-center py-5">
            <div className="w-1/5">
              {moment(item?.[FormProposal.CreateDate]).format("DD/MM/YYYY hh:mm")}
            </div>
            <div
              className="w-4/5 text-lg underline text-[#1677ff] cursor-pointer"
              onClick={() => {
                navigate("/chi-tiet-de-xuat?proposalId=" + item?.[FormProposal.ProposalId]);
              }}
            >
              {item?.[FormProposal.JobTitle]}
            </div>
            <div className="w-1/5">{item?.[FormProposal.StatusText]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProposal;
