import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/image/logo.png";

import {
  faBars,
  faGear,
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Divider, Input, Popover } from "antd";
import { faBell, faComment } from "@fortawesome/free-regular-svg-icons";
import { useMemo, useState } from "react";
import { useAxios } from "../../utils/apiHelper";
import { removeUserFromStorage } from "../../store/actions/sharedActions";
import ListMenu from "./ListMenu";
import { useDispatch, useSelector } from "react-redux";
import { CONST_LOGIN_TYPE, CONST_USER_TYPE } from "../../const/LayoutConst";
import { useNavigate } from "react-router-dom";
import { FormFreelancer } from "../../const/FormFreelancer";
import BaseAvatar from "../element/BaseAvatar";

export const Header = () => {
  const Axios = useAxios();
  const [showMenu, setShowMenu] = useState(false);
  const userLogged = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleColased = () => {
    setShowMenu(!showMenu);
  };

  const Logout = (e) => {
    Axios.Logout(userLogged?.refresh_token)
      .then((res) => {
        removeUserFromStorage();
        dispatch({ type: "CLEAR_USER" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ListMenuAdmin = [
    {
      title: "Trang chủ",
      url: "/",
      children: [],
    },
    {
      title: "Tham số hệ thống",
      url: "/cong-viec",
      children: [
        {
          title: "System Code",
          url: "/system-code",
        },
        {
          title: "Cấu hình tham số",
          url: "/sys-param",
        },
      ],
    },
    {
      title: "Q.Lý khách hàng",
      url: "/cong-viec",
      children: [
        {
          title: "Tài khoản đăng nhập",
          url: "/tai-khoan",
        },
        {
          title: "Khách hàng",
          url: "/Khach-hang",
        },
        {
          title: "Freelance",
          url: "/freelance",
        },
      ],
    },
    {
      title: "Q.Lý công việc",
      url: "/cong-viec",
      children: [
        {
          title: "Công việc",
          url: "/cong-viec",
        },
        {
          title: "Hợp đồng chờ xử lý",
          url: "/hop-dong-cho-xu-ly",
        },
        {
          title: "Kỹ năng",
          url: "/ky-nang",
        },
        {
          title: "Chuyên môn",
          url: "/chuyen-mon",
        },
      ],
    },
  ];

  const ListMenuClient = [
    {
      title: "Trang chủ",
      url: "/",
      children: [],
    },
    // {
    //   title: "Công việc",
    //   url: "/cong-viec",
    //   children: [
    //     {
    //       title: "Công việc",
    //       url: "/cong-viec",
    //     },
    //   ],
    // },
    {
      title: "Ví tiền",
      url: "/vi-tien",
      children: [],
    },
    {
      title: "Tin nhắn",
      url: "/tin-nhan",
      children: [],
    },
  ];

  const ListMenuFreelancer = [
    {
      title: "Tìm việc",
      url: "/tim-viec",
      children: [
        {
          title: "Tìm việc",
          url: "/tim-viec",
        },
        {
          title: "Công việc đã lưu",
          url: "/cong-viec-da-luu",
        },
        {
          title: "Đề xuất công việc",
          url: "/de-xuat-cong-viec",
        },
      ],
    },
    {
      title: "Công việc",
      url: "/hop-hong",
      children: [
        {
          title: "Hợp đồng",
          url: "/hop-dong",
        },
      ],
    },
    {
      title: "Ví tiền",
      url: "/vi-tien",
      children: [],
    },
    {
      title: "Tin nhắn",
      url: "/tin-nhan",
      children: [],
    },
  ];

  const listMenu = useMemo(() => {
    if (userLogged?.userType === CONST_USER_TYPE.Admin) {
      return ListMenuAdmin;
    }

    if (userLogged?.loginType === CONST_LOGIN_TYPE.Client) {
      return ListMenuClient;
    } else if (userLogged?.loginType === CONST_LOGIN_TYPE.Freelancer) {
      return ListMenuFreelancer;
    }

    return [];
  }, [userLogged]);

  return (
    <nav
      id={"topNav"}
      className={`header-responesive relative z-50 ${showMenu ? " open_menu" : ""}`}
    >
      <div className="menu">
        <div className="logo-img">
          <img src={logo}></img>
        </div>
        <ListMenu menuData={listMenu} />
      </div>

      <div className="left-content">
        <div>
          <Input
            className="input-header"
            placeholder="Từ khóa tìm kiếm"
            prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            // onKeyDown={(event) => {
            //   if (event.code === "Enter") {
            //     //gọi lại hàm tìm kiếm
            //     Search();
            //   }
            // }}
          />
        </div>

        <Button
          shape="circle"
          type="text"
          icon={<FontAwesomeIcon icon={faComment} size="lg" />}
        ></Button>
        <Button
          shape="circle"
          type="text"
          icon={<FontAwesomeIcon icon={faBell} size="lg" />}
        ></Button>
        <Popover
          placement="topRight"
          trigger="click"
          className="inner-no-padding"
          content={
            <div className="account-infor">
              <div
                className="card-hover !gap-2"
                onClick={() => {
                  if (userLogged?.loginType === CONST_LOGIN_TYPE.Client) {
                    // return ListMenuClient;
                  } else if (userLogged?.loginType === CONST_LOGIN_TYPE.Freelancer) {
                    navigate("/thong-tin-ca-nhan");
                  }
                }}
              >
                <BaseAvatar size={64} src={userLogged?.avatar} />
                <div className="ml-3">
                  <div className="text-base font-bold">{userLogged?.fullName}</div>
                  <div className="jod-title">{userLogged?.freelancer?.[FormFreelancer.Title]}</div>
                </div>
              </div>
              <Divider className="my-2" />
              {/* <div className="card-hover">
                <FontAwesomeIcon icon={faHome} size="lg" />
                <div className="text-base font-bold">Đăng xuất</div>
              </div> */}
              <div className="card-hover">
                <FontAwesomeIcon icon={faGear} size="lg" />
                <div className="text-base font-bold">Cài đặt</div>
              </div>
              {/* <div className="card-hover">
                <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                <div className="text-base font-bold">Đăng xuất</div>
              </div> */}
              <Divider className="my-2" />
              <div className="card-hover" onClick={Logout}>
                <FontAwesomeIcon icon={faRightFromBracket} color="#f87171" size="lg" />
                <div className="text-base font-bold text-red-400">Đăng xuất</div>
              </div>
            </div>
          }
        >
          <div className="avt">
            <BaseAvatar src={userLogged?.avatar} />
          </div>
        </Popover>
      </div>

      <div className="button-colapsed" onClick={HandleColased}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>
    </nav>
  );
};
