import { Navigate, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Login from "./pages/Login/Index.jsx";
import SignUp from "./pages/SignUp/Index.jsx";
import { LayoutEmpty } from "./components/layout/LayoutEmpty.jsx";

import {} from "./utils/initAxiosClient.js";

//import thư viện css
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import AppAdmin from "./AppAdmin.jsx";
import { CONST_LOGIN_TYPE, CONST_USER_TYPE } from "./const/LayoutConst.js";

import AppClient from "./AppClient.jsx";
import AppFreelancer from "./AppFreelancer.jsx";
import { useAxios } from "./utils/apiHelper.js";
import { convertToArray } from "./utils/convertData.js";
import { removeUserFromStorage } from "./store/actions/sharedActions.js";
import { isNullOrEmpty } from "./utils/utils.js";
import { connectWS } from "./utils/socket.js";

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.authReducer);
  const isLogin = userLogin && !isNullOrEmpty(userLogin?.username);
  const AxiosClient = useAxios();

  useEffect(() => {
    function a(e) {
      // if (e.detail.type === "SYSTEMINFO") {
      //   dispatch({ type: "SET_SYSTEMINFO", payload: JSON.parse(e.detail.content) });
      // } else if (e.detail.type === "SRVTIME") {
      //   dispatch({ type: "SET_SERVERTIME", payload: moment(e.detail.content) });
      // } else if (e.detail.type === "RELOAD_LOGGED_USER_SETTING") {
      //   _handleVisibilityChange(null, true);
      // } else if(e.detail.type === "RELOAD_COMPANY_SETTING"){
      //     //sondt reload company setting when edit
      //     loadCompany();
      // }
    }
    function b(e) {
      dispatch({ type: "SET_CONNECTSTATUS", payload: e.detail });
    }

    connectWS();
    document.addEventListener("socket-message", a);
    document.addEventListener("update-connect-status", b);

    return () => {
      document.removeEventListener("socket-message", a);
      document.removeEventListener("update-connect-status", b);
    };
  }, []);

  const _handleVisibilityChange = (e, forceUpdate = false) => {
    if (!forceUpdate && document.visibilityState === "hidden") {
      return;
    }

    if (!isNullOrEmpty(userLogin?.username)) {
      AxiosClient.Checkalive()
        .then((res) => {
          if (res.status !== 200) {
            removeUserFromStorage();
            dispatch({ type: "CLEAR_USER" });
          } else {
            dispatch({ type: "UPDATE_USER_SETTING", payload: res.data });
          }
        })
        .catch((err) => {
          removeUserFromStorage();
          dispatch({ type: "CLEAR_USER" });
        });
    }
  };

  const fetchSystemCodes = async () => {
    try {
      const { data } = await AxiosClient.collections.SAShare.GetSystemCodes();
      dispatch({
        type: "SET_SYSTEMCODES",
        payload: convertToArray(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSysParams = async () => {
    try {
      const { data } = await AxiosClient.collections.SAShare.GetSysParams();
      dispatch({
        type: "SET_SYSPARAMS",
        payload: convertToArray(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const _handlePostMessage = (e) => {
    if (e && e.data) {
      if (e.data.type == "RESET_TOKEN") {
        dispatch({ type: e.data.type, payload: e.data.payload });
      } else if (e.data.type == "CLEAR_USER") {
        dispatch({ type: e.data.type });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", _handleVisibilityChange, false);

    window.addEventListener("message", _handlePostMessage, false);

    fetchSystemCodes();

    if (isLogin) {
      _handleVisibilityChange();
      fetchSysParams();
    } else {
      if (window.location.pathname === "/dang-ky") {
        console.log("Trang hiện tại là trang đăng ký!");
      } else {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        //
        console.log("Trang hiện tại không phải là trang đăng ký.");
      }
    }

    return () => {
      document.removeEventListener("visibilitychange", _handleVisibilityChange, false);

      window.removeEventListener("message", _handlePostMessage, false);
    };
  }, [userLogin]);

  const routersLogin = createBrowserRouter([
    {
      path: "/login",
      element: <LayoutEmpty {...{ component: Login }} />,
    },
    { path: "/dang-ky", element: <LayoutEmpty {...{ component: SignUp }} /> },
    //   path: "*",
    //   element: <Navigate to="/login" replace />,
    // },
  ]);

  const RenderByLoginType = ({ loginType }) => {
    if (loginType === CONST_LOGIN_TYPE.Client) {
      return <AppClient />;
    } else if (loginType === CONST_LOGIN_TYPE.Freelancer) {
      return <AppFreelancer />;
    }

    return <></>;
  };

  return (
    <>
      {userLogin?.userType === CONST_USER_TYPE.Admin ? (
        <AppAdmin isLogin={isLogin} />
      ) : userLogin?.userType === CONST_USER_TYPE.User ? (
        <RenderByLoginType loginType={userLogin.loginType} />
      ) : (
        <RouterProvider router={routersLogin} />
      )}
    </>
  );
}

export default App;
