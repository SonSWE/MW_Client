import { Checkbox, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

import { usePopupNotification } from "../../../utils/formHelper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListJob from "../Dashboard/ListJob";
import { useSelector } from "react-redux";
import { FormSearchJob } from "../../../const/FormSearchJob";
import { convertToArray } from "../../../utils/convertData";
import { FormJob } from "../../../const/FormJob";
import { useBusinessAction } from "../Dashboard/BusinessAction";
import { useAxios } from "../../../utils/apiHelper";
import { getSystemCodeValues } from "../../../utils/utils";
import { CONST_YN } from "../../../const/FormConst";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const [lstSkill, setLstSkill] = useState([]);
  const [jobsSuggest, setJobSuggest] = useState([]);
  const [jobsSaved, setJobsSaved] = useState([]);

  const userLogged = useSelector((state) => state.authReducer);
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);

  const [formInstance] = Form.useForm();
  const navigate = useNavigate();
  const notification = usePopupNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const apiClient = useBusinessAction();
  const axios = useAxios();

  useEffect(() => {
    formInstance.setFieldValue(FormSearchJob.Title, searchParams.get("value"));
    LoadJobsSaved();
    onSearch();
  }, [searchParams]);

  useEffect(() => {
    axios.collections.SAShare.GetSkills().then((res) => {
      if (res?.data) {
        setLstSkill(convertToArray(res.data));
      } else {
        setLstSkill([]);
      }
    });
  }, []);

  const LoadJobsSaved = () => {
    apiClient
      .GetJobsSaved(userLogged.freelancer?.freelancerId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setJobsSaved([...convertToArray(res.data)]);
        }
      })
      .catch((e) => {
        setJobsSaved([]);
      });
  };

  const saveJob = (prop) => {
    if (prop?.[FormJob.Saved] === CONST_YN.Yes) {
      apiClient
        .RemoveSaveJob(prop)
        .then((res) => {
          if (res.status === 200 && res.data) {
            LoadJobsSaved();
            onSearch();
          }
        })
        .catch((e) => {});
    } else {
      apiClient
        .InsertSaveJob(prop)
        .then((res) => {
          if (res.status === 200 && res.data) {
            LoadJobsSaved();
          }
        })
        .catch((e) => {});
    }
  };

  const onSearch = () => {
    formInstance.submit();
    formInstance.validateFields().then((values) => {
      console.log(values);
      apiClient
        .Search({
          ...values,
          [FormSearchJob.FreelancerId]: userLogged.freelancer?.freelancerId,
          // [FormSearchJob.LevelIds]: values?.[FormSearchJob.LevelIds]?.join(","),
        })
        .then((res) => {
          if (res.status === 200 && res.data) {
            setJobSuggest([...convertToArray(res.data)]);
          }
        })
        .catch((e) => {
          setJobSuggest([]);
        });
    });
  };

  return (
    <div>
      <Form form={formInstance}>
        <div className="mb-8">
          <Form.Item name={FormSearchJob.Title}>
            <Input
              className="rounded-3xl"
              size="large"
              placeholder="Tìm kiếm công việc"
              prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  console.log(event.target.value);
                  //gọi lại hàm tìm kiếm
                  onSearch();
                }
              }}
              allowClear
            />
          </Form.Item>
        </div>
        <div className="grid grid-flow-col grid-cols-4 gap-8 p-y">
          <div className="col-span-1 flex flex-col gap-6">
            <div>
              <div className="text-base font-medium mb-1">Kỹ năng</div>
              <Form.Item name={FormSearchJob.Skills}>
                <Select
                  placeholder="-- Lựa chọn --"
                  className="max-w-lg w-full"
                  options={[
                    ...lstSkill?.map((e) => ({
                      value: e.skillId,
                      label: <span>{e.name}</span>,
                    })),
                  ]}
                  onChange={() => {
                    onSearch();
                  }}
                  allowClear
                  mode="multiple"
                />
              </Form.Item>
            </div>
            <div>
              <div className="text-base font-medium mb-1">Kinh nghiệm</div>
              <Form.Item name={FormSearchJob.LevelIds}>
                <Select
                  placeholder="-- Lựa chọn --"
                  className="max-w-lg w-full"
                  options={[
                    ...getSystemCodeValues(systemCodes, "PROJECT_LEVEL")?.map((e) => ({
                      value: e.value,
                      label: <span>{e.description}</span>,
                    })),
                  ]}
                  onChange={() => {
                    onSearch();
                  }}
                  onClear={() => {
                    onSearch();
                  }}
                  allowClear
                  mode="multiple"
                />
              </Form.Item>
            </div>
            <div>
              <div className="text-base font-medium mb-1">Loại công việc</div>
              <Checkbox className="w-full">Dài hạn</Checkbox>
              <Checkbox className="w-full mt-2">Ngắn hạn</Checkbox>
            </div>
            <div>
              <div className="text-base font-medium mb-1">Số lượng đề xuất</div>
              <Checkbox className="w-full">Nhỏ hơn 5</Checkbox>
              <Checkbox className="w-full mt-2">Từ 5 đến 10</Checkbox>
              <Checkbox className="w-full mt-2">Từ 10 đến 15</Checkbox>
              <Checkbox className="w-full mt-2">Từ 15 đến 20</Checkbox>
              <Checkbox className="w-full mt-2">Từ 20 đến 50</Checkbox>
            </div>
            <div>
              <div className="text-base font-medium mb-1">Vị trí công việc</div>
              <Input className="max-w-lg w-full" placeholder="-- Nhập vị trí --" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex justify-between items-center pb-2">
              <div className="w-full"></div>

              <div className="flex items-center justify-end gap-3 w-full">
                <div
                  className="btn-text text-base text-nowrap"
                  onClick={() => {
                    navigate(`/cong-viec-da-luu`);
                  }}
                >
                  <FontAwesomeIcon icon={faHeartRegular} /> Đã lưu ({jobsSaved.length})
                </div>
              </div>
            </div>
            <ListJob datas={jobsSuggest} apiClient={apiClient} saveJob={saveJob} />
          </div>
        </div>
      </Form>
    </div>
  );
});

export default InputItems;
