import { Avatar, Button, Form, Input } from "antd";
import { FormProposal } from "../../../const/FormJob";
import { PriceFormatter } from "../../../utils/convertData";
import { useNavigate } from "react-router-dom";
import { FormFreelancer } from "../../../const/FormFreelancer";

import { useForm } from "antd/es/form/Form";
import BaseModal from "../../../components/controls/BaseModal";
import { useState } from "react";
import { NameOfCollections } from "../../../const/NameOfCollections";
import { db } from "../../../utils/firebase";
import { arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const ListProposal = ({ datas, apiClient }) => {
  const currentUser = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [formInstance] = useForm();
  const [isShowModal, setIsShowModal] = useState(false);
  const showModal = (data) => {
    setIsShowModal(true);
    formInstance.setFieldsValue({
      [FormProposal.JobId]: data?.[FormProposal.JobId],
      [FormProposal.FreelancerId]: data?.[FormProposal.FreelancerId],
    });
  };

  const closeModal = () => {
    setIsShowModal(false);
    formInstance.resetFields();
  };
  const onSend = () => {
    formInstance.submit();
    formInstance.validateFields().then((values) => {
      //tạo tin nhắn gửi đến client kèm tiêu đề công việc
      handleSendNewMessage({
        ...values,
        firstMessage: values.firstMessage + "/n" + "Đường dẫn công viêc: " + "abc.com",
      });
    });
  };

  const handleSendNewMessage = async (data) => {
    const chatRef = collection(db, NameOfCollections.chats);
    const userChatsRef = collection(db, NameOfCollections.userchats);

    try {
      const receiverUserId = data.freelancer?.[FormFreelancer.Email];
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, receiverUserId), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.username,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.username), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: data.firstMessage,
          receiverId: receiverUserId,
          updatedAt: Date.now(),
        }),
      });

      navigate("/tin-nhan");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="list-job">
        {datas.map((item) => (
          <div className="job-card flex justify-between">
            <div className="w-1/5">
              <div className="flex">
                <Avatar size={60} src={item.freelancer?.[FormFreelancer.Avatar]} />
                <div className="ml-5">
                  <div className="text-base font-medium">
                    {item.freelancer?.[FormFreelancer.Name]}
                  </div>
                  <div className="text-label">{item.freelancer?.[FormFreelancer.Title]}</div>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-3">
                <Button
                  onClick={() => {
                    showModal(item);
                  }}
                >
                  Nhắn tin
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/gui-yeu-cau?proposalId=" + item?.[FormProposal.ProposalId]);
                  }}
                >
                  Gửi yêu cầu
                </Button>
              </div>
            </div>
            <div className="w-1/5">
              <div className="w-full flex flex-wrap items-center gap-3 mt-5">
                {item.freelancer?.[FormFreelancer.SkillsText]?.split(",")?.map((e) => (
                  <div className="tag-skill">{e}</div>
                ))}
              </div>
            </div>
            <div className="w-2/5">
              <div className="font-medium">{PriceFormatter(item?.[FormProposal.BidAmount])}</div>
              <div>{item?.[FormProposal.CoverLetter]}</div>
            </div>
          </div>
        ))}
      </div>
      {isShowModal && (
        <BaseModal
          title={"Bắt đầu cuộc trò chuyện"}
          onCancel={closeModal}
          centered
          open={isShowModal}
          width="90vw"
          footer={[
            <Button type="primary" key="save" onClick={onSend}>
              Gửi
            </Button>,
            <Button key="cancel" onClick={closeModal}>
              Thoát
            </Button>,
          ]}
        >
          <Form form={formInstance} className="py-5">
            <Form.Item name={FormProposal.FreelancerId} hidden />
            <Form.Item name={FormProposal.JobId} hidden />
            <div>
              <div>Hãy gửi một lời chào đến freelancer</div>
              <Form.Item name={"firstMessage"}>
                <Input.TextArea
                  style={{
                    height: 120,
                  }}
                  maxLength={500}
                />
              </Form.Item>
            </div>
          </Form>
        </BaseModal>
      )}
    </div>
  );
};

export default ListProposal;
