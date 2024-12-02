import { Button, Form, Modal, Popconfirm, Tooltip } from "antd";
import React, { useRef } from "react";
import { GroupBox } from "../../../components/element/GroupBox";
import { convertToArray, isNullOrEmpty, isRender, makeid } from "../../../utils/utils";
import EditTableCommunityAG from "../../../components/controls/EditTableCommunityAG";
import { columnSkill } from "./comom";
import { useNotification } from "../../../utils/formHelper";
import delteteicon from "../../../assets/image/icon/ic_tip_delete.svg";
import addicon from "../../../assets/image/icon/ic_add_form.svg";
import { FormJob, FormJobSkill } from "../../../const/FormJob";

const SkillTab = ({ formInstance, action, disabled, lstSkill }) => {
  const notification = useNotification();
  const gridRef = useRef(null);

  const rowDatacColumn = (props) => {
    return [
      ...columnSkill({
        disabled,
        handleAddRowAsync,
        action,
        lstSkill,
      }),
    ];
  };

  const handleRemoveRows = (type) => {
    let datas = convertToArray(formInstance.getFieldValue(FormJob.JobSkills));
    let _rowSelected = gridRef?.current?.api.getSelectedRows();

    if (_rowSelected?.length > 0) {
      formInstance.setFieldValue(FormJob.JobSkills, [
        ...datas.filter((x) => !_rowSelected.some((r) => r.id === x.id)),
      ]);
    } else {
      notification.error({ message: `Không có dữ liệu được chọn` });
    }
  };

  const handleAddRowAsync = async () => {
    const value = await formInstance.getFieldValue(FormJob.JobSkills);
    let data = convertToArray(value);
    if(data.length > 10){
      notification.error({ message: `Chỉ có thể thêm tối đa 10 kỹ năng` });
    }

    const newId = makeid();
    const newRow = {
      id: newId,
    };
    if (data.length === 0) {
      await formInstance.setFieldValue(FormJob.JobSkills, [newRow]);
    } else {
      await formInstance.setFieldValue(FormJob.JobSkills, [...data, newRow]);
    }

    return newId;
  };
  const validateEdit = (oldDatas, data, rowIndex) => {
    if (oldDatas.length <= 1) return true;

    let rowValue = oldDatas.filter(
      (e) =>
        e.id !== data.id &&
        e?.[FormJobSkill.SkillId] === data?.[FormJobSkill.SkillId] &&
        !isNullOrEmpty(data?.[FormJobSkill.SkillId])
    );

    if (rowValue.length > 0) {
      notification.error({ message: `Kỹ năng đã tồn tại` });
      
      return false;
    }
    return true;
  };

  const onCellEditingStopped = (params) => {
    //dữ liệu không thay đổi
    if (params.valueChanged === false) return;

    const { data } = params;
    const oldDatas = formInstance.getFieldValue(FormJob.JobSkills);

    if (!validateEdit(oldDatas, data, params.rowIndex)) {
      formInstance.setFieldValue(FormJob.JobSkills, [...convertToArray(oldDatas)]);
    } else {
      //data onchange of current datagrid
      let rowData = [];
      let newData = { ...data };

      if (params.column.colId === FormJobSkill.SkillId) {
        const skill = lstSkill?.find(
          (x) => x?.[FormJobSkill.SkillId] === newData?.[FormJobSkill.SkillId]
        );
        newData[FormJobSkill.Name] = skill?.[FormJobSkill.Name];
        newData[FormJobSkill.Description] = skill?.[FormJobSkill.Description];
      }
      console.log(newData);
      params.api.forEachNode((node) => {
        if (node.rowIndex === params.node.rowIndex) {
          rowData.push(newData);
        } else {
          rowData.push(node.data);
        }
      });

      formInstance.setFieldValue(FormJob.JobSkills, [...rowData]);
    }
  };

  const _rowProps = (type) => {
    let list = convertToArray(formInstance.getFieldValue(FormJob.JobSkills));

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
      <GroupBox title={"Danh sách kỹ năng"} className="mt-4">
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
            isRender(prevValues, currentValues, [FormJob.JobSkills])
          }
        >
          {() => <EditTableCommunityAG {..._rowProps()} />}
        </Form.Item>
      </GroupBox>
    </div>
  );
};

export default SkillTab;
