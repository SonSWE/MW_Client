import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { convertToArray } from "../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../../store/actions/sharedActions";
import { useBusinessAction } from "./BusinessAction";
import ListJob from "./ListJob";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const apiClient = useBusinessAction();
  const [jobs, setJobs] = useState([]);
  const userLogged = getUserFromStorage();

  const LoadJobs = () => {
    apiClient
      .GetByClientId(userLogged.client?.clientId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setJobs(convertToArray(res.data));
        }
      })
      .catch((e) => {
        setJobs([]);
      });
  };

  useEffect(() => {
    LoadJobs();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="text-lg font-medium">Xin chào {userLogged?.client?.name}</div>
        <div>
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => {
              navigate("/tao-cong-viec");
            }}
          >
            Tạo công việc mới
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-xl">Danh sách công việc</div>
        <ListJob datas={jobs} apiClient={apiClient} />
      </div>
    </div>
  );
});

export default InputItems;
