import { DatePicker, Form, Input, Select } from "antd";
import React, { useImperativeHandle } from "react";
import { FormSysParam } from "../../../const/FormSysParam";
import { useSelector } from "react-redux";
import { DowloadFileFormStorage, getSystemCodeValues, isRender } from "../../../utils/utils";
import { useGlobalConst } from "../../../utils/constData";
import { FormContract } from "../../../const/FormContract";
import { convertToArray } from "../../../utils/convertData";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputItems = React.forwardRef(({ formInstance, action, disabled }, ref) => {
  const globalConst = useGlobalConst();

  useImperativeHandle(ref, () => ({
    triggerThayDoiBanGhi: (values) => {},
  }));

  return (
    <div className="form-two-col">
      <div className="group-items">
        <div className="">
          <Form.Item name={FormContract.ContractId} label="Mã hợp đồng">
            <Input disabled />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormContract.JobTitle} label="Tiêu đề công việc">
            <Input disabled />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormContract.EndReasonText} label="Lý do từ chối">
            <Input disabled />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item name={FormContract.EndReasonRemark} label="Mô tả">
            <Input.TextArea rows={4} disabled />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            className="w-full"
            name={FormContract.StartDate}
            label="Ngày bắt đầu"
            {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
          >
            <DatePicker
              className="w-full"
              placeholder="dd/MM/yyyy"
              format={globalConst.ANT.LOCALE.dateFormat}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            className="w-full"
            name={FormContract.EndDate}
            label="Ngày kết thúc"
            {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
          >
            <DatePicker
              className="w-full"
              placeholder="dd/MM/yyyy"
              format={globalConst.ANT.LOCALE.dateFormat}
            />
          </Form.Item>
        </div>
      </div>
      <div className="">
        <Form.Item
          className="!p-0 !m-0"
          shouldUpdate={(prevValues, currentValues) =>
            isRender(prevValues, currentValues, [FormContract.FileAttach])
          }
        >
          {({ getFieldValue }) => {
            const fileAttachs = convertToArray(getFieldValue(FormContract.FileAttach)?.split("|"));

            if (fileAttachs.length > 0) {
              return (
                <div className="">
                  <div>File đính kèm:</div>
                  {fileAttachs.map((e) => (
                    <div
                      className="text-[#1677ff] !underline"
                      onClick={() => {
                        DowloadFileFormStorage(e);
                      }}
                    >
                      <FontAwesomeIcon icon={faLink} /> <a>{e}</a>
                    </div>
                  ))}
                </div>
              );
            }
          }}
        </Form.Item>
      </div>
    </div>
  );
});

export default InputItems;
