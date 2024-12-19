import { Button, Input } from "antd";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { convertToArray, PriceFormatter } from "../../../utils/convertData";
import { countProposalText, formatCreatedDate } from "../../../utils/utils";
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
import ListFreelancer from "./ListFreelancer";
import { useEffect, useState } from "react";
import ListProposal from "./ListProposal";
import ListContract from "./ListContract";

const TabFreelancerHired = ({ apiClient, jobDetail, key }) => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    LoadProposal();
  }, [key]);

  const LoadProposal = () => {
    apiClient
      .GetContactByJobId(jobDetail?.[FormJob.JobId])
      .then((res) => {
        if (res.status === 200 && res.data) {
          setContracts([...convertToArray(res.data)]);
        }
      })
      .catch((e) => {
        setContracts([]);
      });
  };

  return (
    <div>
      {contracts?.length > 0 ? (
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

          <ListContract datas={contracts} />
        </div>
      ) : (
        <div>Chưa có để xuất công việc nào được gửi</div>
      )}
    </div>
  );
};

export default TabFreelancerHired;
