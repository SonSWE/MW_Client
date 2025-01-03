import { Form, List } from "antd";
import { dateTimeFomatDefault, DowloadFileFormStorage, isRender } from "../../../../utils/utils";
import { FormContract, FormContractResult } from "../../../../const/FormContract";
import { convertToArray, formatDate } from "../../../../utils/convertData";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormApprovalResult = ({ formInstance }) => {
  return (
    <div>
      <Form.Item name={FormContract.ContractResults} hidden />

      <div className="mb-5">
        Hãy xem xét kỹ kết quả nhận được từ freelancer trước khi xác nhận hoàn thành hợp đồng
      </div>
      <div>
        <Form.Item
          className="!p-0 !m-0"
          shouldUpdate={(prevValues, currentValues) =>
            isRender(prevValues, currentValues, [FormContract.ContractResults])
          }
        >
          {({ getFieldValue }) => {
            const lst = convertToArray(getFieldValue(FormContract.ContractResults));
            return lst.length > 0 ? (
              <>
                <div className="text-base font-bold">Danh sách kết quả</div>
                <List
                  className="mt-2"
                  bordered
                  dataSource={lst}
                  renderItem={(item) => {
                    const lstFile = convertToArray(
                      item?.[FormContractResult.FileAttach]?.split("|")
                    );

                    return (
                      <List.Item>
                        <div className="w-full flex items-start justify-between">
                          <div>
                            <div>{item?.[FormContractResult.Remark]}</div>
                            {lstFile.length > 0 &&
                              lstFile.map((e) => (
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

                          <div>
                            Ngày gửi:{" "}
                            {formatDate(
                              item?.[FormContractResult.CreateDate],
                              dateTimeFomatDefault
                            )}
                          </div>
                        </div>
                      </List.Item>
                    );
                  }}
                ></List>
              </>
            ) : (
              <></>
            );
          }}
        </Form.Item>
      </div>
    </div>
  );
};

export default FormApprovalResult;
