import { Button, Form, Modal, Popconfirm, Tooltip } from "antd";
import React, { useRef } from "react";
import { GroupBox } from "../../../components/element/GroupBox";
import { convertToArray, isNullOrEmpty, isRender, makeid } from "../../../utils/utils";
import EditTableCommunityAG from "../../../components/controls/EditTableCommunityAG";
import { useNotification } from "../../../utils/formHelper";
import delteteicon from "../../../assets/image/icon/ic_tip_delete.svg";
import addicon from "../../../assets/image/icon/ic_add_form.svg";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { useSelector } from "react-redux";
import { columnCertificate } from "./comom";
import { FormFreelancer } from "../../../const/FormFreelancer";

const CertificateTab = ({ formInstance, action, disabled }) => {
  const notification = useNotification();
  const systemCodes = useSelector((state) => state.systemCodeReducer.SYSTEMCODES);
  const gridRef = useRef(null);

  const rowDatacColumn = (props) => {
    return [
      ...columnCertificate({
        disabled,
        handleAddRowAsync,
        systemCodes,
        action,
      }),
    ];
  };

  const handleRemoveRows = (type) => {
    let datas = convertToArray(formInstance.getFieldValue(FormFreelancer.Certificates));
    let _rowSelected = gridRef?.current?.api.getSelectedRows();

    if (_rowSelected?.length > 0) {
      formInstance.setFieldValue(FormFreelancer.Certificates, [
        ...datas.filter((x) => !_rowSelected.some((r) => r.id === x.id)),
      ]);
    } else {
      notification.error({
        message: `Thất bại`,
        description: `Không có dữ liệu được chọn`,
      });
    }
  };

  const handleAddRowAsync = async () => {
    const value = await formInstance.getFieldValue(FormFreelancer.Certificates);
    let data = convertToArray(value);
    const newId = makeid();
    const newRow = {
      id: newId,
    };
    if (data.length === 0) {
      await formInstance.setFieldValue(FormFreelancer.Certificates, [newRow]);
    } else {
      await formInstance.setFieldValue(FormFreelancer.Certificates, [...data, newRow]);
    }

    return newId;
  };
  const validateEdit = (oldDatas, data, rowIndex) => {
    // if (oldDatas.length <= 1) return true;

    // let rowValue = oldDatas.filter(
    //   (e) =>
    //     e.id !== data.id &&
    //     e?.[FormProposal.ProposalId] === data?.[FormProposal.ProposalId] &&
    //     !isNullOrEmpty(data?.[FormProposal.ProposalId])
    // );

    // if (rowValue.length > 0) {
    //   Modal.error({
    //     message: "Thông báo",
    //     description: `Dữ liệu không hợp lệ`,
    //   });

    //   return false;
    // }
    return true;
  };

  const onCellEditingStopped = (params) => {
    //dữ liệu không thay đổi
    if (params.valueChanged === false) return;

    const { data } = params;
    const oldDatas = formInstance.getFieldValue(FormFreelancer.Certificates);

    if (!validateEdit(oldDatas, data, params.rowIndex)) {
      formInstance.setFieldValue(FormFreelancer.Certificates, [...oldDatas]);
    } else {
      //data onchange of current datagrid
      let rowData = [];
      params.api.forEachNode((node) => {
        if (node.rowIndex === params.node.rowIndex) {
          let newData = { ...data };
          rowData.push(newData);
        } else {
          rowData.push(node.data);
        }
      });

      formInstance.setFieldValue(FormFreelancer.Certificates, [...rowData]);
    }
  };

  const _rowProps = (type) => {
    let list = convertToArray(formInstance.getFieldValue(FormFreelancer.Certificates));

    return {
      rowDatacColumn,
      getData: [...list],
      gridRef: gridRef,
      onCellEditingStopped,
      containerStyle: {
        height: "300px",
      },
    };
  };

  return (
    <div className="row-item">
      <GroupBox title={"Danh sách chứng chỉ"} className="mt-4">
        <div className="w-full flex justify-end items-center gap-4">
          <Button onClick={(e) => handleAddRowAsync()} disabled={disabled}>
            <img src={addicon} alt="" />
            <span>{"Thêm"}</span>
          </Button>
          <Button disabled={disabled}>
            <Tooltip placement="right" title={"Xóa"}>
              <Popconfirm
                title={"Bạn có chắc chắn muốn xóa thông tin này"}
                onConfirm={() => {
                  handleRemoveRows();
                }}
                placement="bottom"
                className="w-full"
              >
                <div className="flex items-center gap-1">
                  <span>
                    <img className="imgbefore-hv" src={delteteicon} alt="img" />
                  </span>
                  <div className="name-function-fix">Xóa</div>
                </div>
              </Popconfirm>
            </Tooltip>
          </Button>
        </div>

        <Form.Item
          className="pt-3 w-100"
          shouldUpdate={(prevValues, currentValues) =>
            isRender(prevValues, currentValues, [FormFreelancer.Certificates])
          }
        >
          {() => <EditTableCommunityAG {..._rowProps()} />}
        </Form.Item>
      </GroupBox>
    </div>
  );
};

export default CertificateTab;
