import { Avatar, Button, Drawer, Form, Input } from "antd";
import { FormProposal } from "../../../../const/FormJob";
import { PriceFormatter } from "../../../../utils/convertData";
import { useNavigate } from "react-router-dom";
import { FormFreelancer } from "../../../../const/FormFreelancer";

import { useForm } from "antd/es/form/Form";
import BaseModal from "../../../../components/controls/BaseModal";
import { useState } from "react";
import { NameOfCollections } from "../../../../const/NameOfCollections";
import { db } from "../../../../utils/firebase";
import { arrayUnion, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { faArrowLeft, faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { DowloadFileFormStorage, formatCreatedDate } from "../../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseAvatar from "../../../../components/element/BaseAvatar";
import { CONST_BUDGET_TYPE, CONST_PROPOSAL_STATUS } from "../../../../utils/constData";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const ListProposal = ({ datas, apiClient }) => {
  const [selectedProposal, setSelectedProposal] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [formInstance] = useForm();
  const [isShowModal, setIsShowModal] = useState(false);

  const ShowProposalDetail = (id) => {
    setOpen(true);
    setLoading(true);

    apiClient
      .GetDetailProposalById(id)
      .then(async (res) => {
        setLoading(false);
        if (res.status === 200 && res.data) {
          setSelectedProposal(res.data);
        }
      })
      .catch((e) => {
        setLoading(false);
        setSelectedProposal(undefined);
      });
  };

  const showModal = (data) => {
    setIsShowModal(true);
    formInstance.setFieldsValue({
      [FormProposal.JobId]: data?.[FormProposal.JobId],
      [FormProposal.FreelancerId]: data?.[FormProposal.FreelancerId],
      [FormFreelancer.Email]: data?.freelancer?.[FormFreelancer.Email],
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
      const receiverUserId = data?.[FormFreelancer.Email];
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await setDoc(doc(userChatsRef, receiverUserId), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.username,
          updatedAt: Date.now(),
        }),
      });

      await setDoc(doc(userChatsRef, currentUser.username), {
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
          <div
            className="job-card flex justify-between cursor-pointer"
            onClick={() => {
              ShowProposalDetail(item?.[FormProposal.ProposalId]);
            }}
          >
            <div className="w-1/5">
              <div className="flex">
                <div>
                  <BaseAvatar size={60} src={item.freelancer?.[FormFreelancer.Avatar]} />
                </div>

                <div className="ml-5">
                  <div className="text-base font-medium">
                    {item.freelancer?.[FormFreelancer.Name]}
                  </div>
                  <div className="text-label">{item.freelancer?.[FormFreelancer.Title]}</div>
                </div>
              </div>
              {item?.[FormProposal.Status] === CONST_PROPOSAL_STATUS.Offered ? (
                <div className="mt-3">
                  <FontAwesomeIcon icon={faCheckCircle} color="green" /> Đã gửi yêu cầu
                </div>
              ) : (
                <div className="mt-10 flex items-center gap-3">
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate("/gui-yeu-cau?proposalId=" + item?.[FormProposal.ProposalId]);
                    }}
                  >
                    Gửi yêu cầu
                  </Button>
                  <Button
                    onClick={(event) => {
                      showModal(item);

                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    Nhắn tin
                  </Button>
                </div>
              )}
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

      <Drawer
        closable
        destroyOnClose
        closeIcon={<FontAwesomeIcon icon={faArrowLeft} />}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        rootStyle={{ width: "100%" }}
        getContainer={document.querySelector(".draw-lg")}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div className="job-preview-responesive">
          <div className="preview-content">
            <div className="">
              <div className="p-6 border-b">
                <div className="flex justify-between">
                  <div>
                    <div className="flex gap-3">
                      <BaseAvatar
                        size={75}
                        src={selectedProposal?.freelancer?.[FormFreelancer.Avatar]}
                      />
                      <div>
                        <div className="text-2xl font-medium">
                          {selectedProposal?.freelancer?.[FormFreelancer.Name]}
                        </div>
                        <div className="text-label">
                          {selectedProposal?.freelancer?.[FormFreelancer.Title]}
                        </div>
                        <div className="text-label">
                          <span>
                            Đã gửi {formatCreatedDate(selectedProposal?.[FormProposal.CreateDate])}
                          </span>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <span className="ml-1">
                            {selectedProposal?.freelancer?.[FormFreelancer.StreetAddress]}
                          </span>
                        </div>
                        <div className="!text-[#1677ff] !underline mt-3">
                          <a
                            href="#"
                            onClick={() => {
                              window.open(
                                "/xem-thong-tin-ca-nhan?id=" +
                                  selectedProposal?.[FormFreelancer.FreelancerId],
                                "_blank"
                              );
                              // navigate(
                              //   "/xem-thong-tin-ca-nhan?id=" +
                              //     selectedProposal?.[FormFreelancer.FreelancerId]
                              // );
                            }}
                          >
                            Xem thông tin chi tiết
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      className="w-full rounded-xl"
                      type="primary"
                      onClick={() => {
                        navigate(
                          "/gui-yeu-cau?proposalId=" + selectedProposal?.[FormProposal.ProposalId]
                        );
                      }}
                    >
                      Gửi yêu cầu
                    </Button>
                    <Button
                      className="w-full rounded-xl"
                      onClick={() => {
                        showModal(selectedProposal);
                      }}
                    >
                      Nhắn tin
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6 border-b">{selectedProposal?.[FormProposal.CoverLetter]}</div>
              <div className="p-6 border-b">
                <div className="text-2xl mb-3">Tệp đính kèm</div>
                <div className="flex flex-col flex-wrap w-2/4 gap-2">
                  {selectedProposal?.[FormProposal.FileAttach]?.split("|")?.map((e) => (
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
              </div>
              <div className="p-6 border-b">
                <div className="text-2xl mb-3">Kỹ năng</div>
                <div className="flex flex-wrap w-2/4 gap-4">
                  {selectedProposal?.freelancer?.[FormFreelancer.SkillsText]
                    ?.split(",")
                    ?.map((e) => (
                      <div className="tag-skill">{e}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

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
            <Form.Item name={FormFreelancer.Email} hidden />
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
