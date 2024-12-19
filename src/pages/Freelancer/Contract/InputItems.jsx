import React, { useEffect, useRef, useState } from "react";
import { convertToArray } from "../../../utils/utils";
import { useNotification, usePopupNotification } from "../../../utils/formHelper";

import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { useBusinessAction } from "./BusinessAction";
import ListContract from "./ListContract";
import { Tabs } from "antd";
import { FormContract } from "../../../const/FormContract";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const navigate = useNavigate();
  const apiClient = useBusinessAction();
  const popup = usePopupNotification();
  const notification = useNotification();
  const [contracts, setContracts] = useState([]);
  const userLogged = getUserFromStorage();

  const LoadProposal = () => {
    apiClient
      .GetContactsByFreelancer(userLogged.freelancer?.freelancerId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setContracts([...convertToArray(res.data)]);
        }
      })
      .catch((e) => {
        setContracts([]);
      });
  };
  useEffect(() => {
    LoadProposal();
  }, []);

  return (
    <div className="">
      <div className="text-2xl font-bold py-2">Danh sách hợp đồng</div>
      <div className="p-5 rounded-xl border">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: `Hợp đồng của bạn`,
              key: "1",
              children: (
                <ListContract
                  datas={contracts.filter((x) => x?.[FormContract.Status] !== "P")}
                  apiClient={apiClient}
                />
              ),
            },
            {
              label: `Chờ xác nhận (${contracts?.length})`,
              key: "2",
              children: (
                <ListContract
                  datas={contracts.filter((x) => x?.[FormContract.Status] === "P")}
                  apiClient={apiClient}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
});

export default InputItems;
