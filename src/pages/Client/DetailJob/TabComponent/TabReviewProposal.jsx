import { Button, Input } from "antd";
import { FormJob, FormProposal } from "../../../../const/FormJob";
import { CONST_BUDGET_TYPE } from "../../../../utils/constData";
import { convertToArray, PriceFormatter } from "../../../../utils/convertData";
import { countProposalText, formatCreatedDate } from "../../../../utils/utils";
import {
  faCheckCircle,
  faHandHoldingDollar,
  faLocationDot,
  faMagnifyingGlass,
  faPencil,
  faUserTie,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListFreelancer from "../ListComponet/ListFreelancer";
import { useEffect, useState } from "react";
import ListProposal from "../ListComponet/ListProposal";


const TabReviewProposal = ({ apiClient, jobDetail, key }) => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    LoadProposal();
  }, [key]);

  const LoadProposal = () => {
    apiClient
      .GetProposalByJobId(jobDetail?.[FormJob.JobId])
      .then((res) => {
        if (res.status === 200 && res.data) {
          setProposals([...convertToArray(res.data)]);
        }
      })
      .catch((e) => {
        setProposals([]);
      });
  };

  return (
    <div>
      {proposals?.length > 0 ? (
        <div className="">
          <div className="my-5">
            <Input
              className="rounded-xl"
              size="large"
              placeholder="Tìm kiếm"
              prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              onKeyDown={(event) => {
                // if (event.code === "Enter" && !isNullOrEmpty(event.target.value)) {
                //   goToSearch(event.target.value);
                // }
              }}
            />
          </div>

          <ListProposal datas={proposals} apiClient={apiClient}/>
        </div>
      ) : (
        <div>Chưa có để xuất công việc nào được gửi</div>
      )}
    </div>
  );
};

export default TabReviewProposal;
