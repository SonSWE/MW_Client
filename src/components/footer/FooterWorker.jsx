import {
  faCalendar,
  faCircle,
  faDotCircle,
  faServer,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState } from "react";

const FooterWorker = () => {
  return (
    <div className="bg-[#181818] pt-16 pb-12 mx-12 rounded-xl">
      <div className="px-20 flex">
        <div className="grid grid-cols-4">
          <ul className="btn-footer-list">
            <li>
              <a className="">Về chúng tôi</a>
            </li>

            <li>
              <a className="">Đánh giá</a>
            </li>

            <li>
              <a className="">Cộng đồng</a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-4">
          <ul className="btn-footer-list">
            <li>
              <a className="">Về chúng tôi</a>
            </li>

            <li>
              <a className="">Đánh giá</a>
            </li>

            <li>
              <a className="">Cộng đồng</a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-4">
          <ul className="btn-footer-list">
            <li>
              <a className="">Về chúng tôi</a>
            </li>

            <li>
              <a className="">Đánh giá</a>
            </li>

            <li>
              <a className="">Cộng đồng</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterWorker;
