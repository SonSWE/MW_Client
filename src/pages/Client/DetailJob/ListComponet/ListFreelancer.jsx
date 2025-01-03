import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormFreelancer } from "../../../../const/FormFreelancer";
import { FormJob, FormProposal } from "../../../../const/FormJob";

const ListFreelancer = ({ datas, apiClient }) => {
  const navigate = useNavigate();
  

  return (
    <div>
      <div className="list-job border rounded-xl">
        {datas.map((item) => (
          <div className="job-card flex justify-between">
            <div>{item?.[FormFreelancer.Name]}</div>
            <div className="">
              
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  navigate("/gui-yeu-cau?freelancerId=" + item?.[FormFreelancer.Name]);
                }}
              >
                Gửi yêu cầu
              </Button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ListFreelancer;
