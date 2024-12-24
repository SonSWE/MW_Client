import React, { useEffect, useRef, useState } from "react";
import { convertToArray } from "../../../utils/utils";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";

import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { useBusinessAction } from "./BusinessAction";
import ListProposal from "./ListProposal";
import { Tabs } from "antd";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const navigate = useNavigate();
  const apiClient = useBusinessAction();
  const popup = usePopupNotification();
  const notification = useNotification();
  const [proposals, setProposals] = useState([]);
  const userLogged = getUserFromStorage();

  const LoadProposal = () => {
    apiClient.GetProposalByFreelancerId(userLogged.freelancer?.freelancerId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setProposals([...convertToArray(res.data)]);
        }
      })
      .catch((e) => {
        setProposals([]);
      });
  };
  useEffect(() => {
    LoadProposal();
  }, []);

  return (
    <div className="">
      <div className="text-2xl font-bold py-2">Danh sách đề xuất công việc đã gửi</div>
      <div className="p-5 rounded-xl border">
      <Tabs
          defaultActiveKey="1"
          items={[
            // {
            //   label: `Chờ xác nhận hợp đồng (${proposals?.length})`,
            //   key: "1",
            //   children: <ListProposal datas={proposals} apiClient={apiClient} />,
            // },
            {
              label: `Đã gửi`,
              key: "3",
              children: <ListProposal datas={proposals} apiClient={apiClient} />,
            },
          ]}
        />
        
      </div>
    </div>
  );
});

export default InputItems;
