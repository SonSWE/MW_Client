import { Button, Input } from "antd";
import { FormJob, FormProposal } from "../../../const/FormJob";
import { CONST_BUDGET_TYPE } from "../../../utils/constData";
import { PriceFormatter } from "../../../utils/convertData";
import { countProposalText, formatCreatedDate } from "../../../utils/utils";
import {
  faCheckCircle,
  faHandHoldingDollar,
  faLocationDot,
  faMagnifyingGlass,
  faPencil,
  faUserTie,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListFreelancer from "./ListFreelancer";

const TabInviteFreelancer = ({ jobDetail }) => {
  const freelancersSuggest = [
    {
      freelancerId: "FR11",
      userName: null,
      name: "Đặng Tiến Sơn",
      email: "dangtiensonuh1@gmail.com",
      password: null,
      phoneNumber: "0867822410",
      avatarFileId: null,
      streetAddress: "Hà Nội",
      cityId: null,
      cityIdText: null,
      dateOfBirth: "0001-01-01T00:00:00",
      levelId: "2",
      levelIdText: null,
      title: "siêu cấp vip pro",
      bio: "Giới thiệu bản thân siêu cấp vip pro",
      status: null,
      statusText: null,
      isOpeningForJob: "Y",
      isOpeningForJobText: null,
      hourlyRate: 0,
      no: 0,
      createBy: null,
      createDate: "2024-12-09T16:25:58+07:00",
      lastChangeBy: null,
      lastChangeDate: "2024-12-16T22:12:40+07:00",
    },
  ];

  return (
    <div>
      <div className="col-span-3">
        <div className="my-5">
          <Input
            className="rounded-3xl"
            size="large"
            placeholder="Tìm kiếm freelancer"
            prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onKeyDown={(event) => {
              // if (event.code === "Enter" && !isNullOrEmpty(event.target.value)) {
              //   goToSearch(event.target.value);
              // }
            }}
          />
        </div>
        {/* <div className="text-xl">Công việc có thể bạn thích</div> */}
        <ListFreelancer datas={freelancersSuggest}  />
      </div>
    </div>
  );
};

export default TabInviteFreelancer;
