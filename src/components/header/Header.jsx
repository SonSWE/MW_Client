import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/image/logo.png";
import avt from "../../assets/image/avtar.webp";
import {
  faAngleDown,
  faArrowDown,
  faArrowLeftLong,
  faBars,
  faGear,
  faHome,
  faMagnifyingGlass,
  faRightFromBracket,
  faRing,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Divider, Input, Popover } from "antd";
import { faBell, faComment } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useAxios } from "../../utils/apiHelper";
import { getUserFromStorage, removeUserFromStorage } from "../../store/actions/sharedActions";
export const Header = () => {
  const Axios = useAxios();
  const [showMenu, setShowMenu] = useState(false);

  const HandleColased = () => {
    setShowMenu(!showMenu);
  };

  const Logout = (e) => {
    const userLocal = getUserFromStorage();

    Axios.Logout(userLocal?.refresh_token)
      .then((res) => {
        removeUserFromStorage();
        dispatch({ type: "CLEAR_USER" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav id={"topNav"} className={`header-responesive relative z-50 ${showMenu ? " open_menu" : ""}`}>
      <div className="menu">
        <div className="logo-img">
          <img src={logo}></img>
        </div>
        <ul className="list-button-menu">
          <li className="button-menu active">
            <a href="/">Trang chủ</a>
          </li>
          <li className="button-menu">
            <a href="/cong-viec">Tham số hệ thống</a>
            <FontAwesomeIcon className="ml-1" icon={faAngleDown} />
            <ul className="list-button-menu-children">
              <div className="arrow"></div>
              <li className="button-menu">
                <a href="/system-code">System Code</a>
              </li>
              <li className="button-menu">
                <a href="/sys-param">Cấu hình tham số</a>
              </li>
            </ul>
          </li>
          <li className="button-menu">
            <a href="/cong-viec">Q.Lý khách hàng</a>
            <FontAwesomeIcon className="ml-1" icon={faAngleDown} />
            <ul className="list-button-menu-children">
              <div className="arrow"></div>
              <li className="button-menu">
                <a href="/tai-khoan">Tài khoản đăng nhập</a>
              </li>
              <li className="button-menu">
                <a href="/Khach-hang">Khách hàng</a>
              </li>
              <li className="button-menu">
                <a href="/freelance">Freelance</a>
              </li>
            </ul>
          </li>
          <li className="button-menu">
            <a href="/cong-viec">Q.Lý công việc</a>
            <FontAwesomeIcon className="ml-1" icon={faAngleDown} />
            <ul className="list-button-menu-children">
              <div className="arrow"></div>
              <li className="button-menu">
                <a href="/cong-viec">Công việc</a>
              </li>
              <li className="button-menu">
                <a href="/ky-nang">Kỹ năng</a>
              </li>
              <li className="button-menu">
                <a href="/chuyen-mon">Chuyên môn</a>
              </li>
            </ul>
          </li>
        </ul>
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
              <div className="card-hover !gap-2">
                <div className="avt-lg">
                  <img src={avt}></img>
                </div>
                <div className="ml-3">
                  <div className="text-base font-bold">Đặng Tiến Sơn</div>
                  <div className="jod-title">Nhiếp ảnh gia</div>
                </div>
              </div>
              <Divider className="my-2" />
              <div className="card-hover">
                <FontAwesomeIcon icon={faHome} size="lg" />
                <div className="text-base font-bold">Đăng xuất</div>
              </div>
              <div className="card-hover">
                <FontAwesomeIcon icon={faGear} size="lg" />
                <div className="text-base font-bold">Cài đặt</div>
              </div>
              <div className="card-hover">
                <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                <div className="text-base font-bold">Đăng xuất</div>
              </div>
              <Divider className="my-2" />
              <div className="card-hover" onClick={Logout}>
                <FontAwesomeIcon icon={faRightFromBracket} color="#f87171" size="lg"  />
                <div className="text-base font-bold text-red-400">Đăng xuất</div>
              </div>
            </div>
          }
        >
          <div className="avt">
            <img src={avt}></img>
          </div>
        </Popover>
      </div>

      <div className="button-colapsed" onClick={HandleColased}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>
    </nav>
  );
};
