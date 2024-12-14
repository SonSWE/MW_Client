import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Login from "./pages/Login/Index.jsx";
import { LayoutEmpty } from "./components/layout/LayoutEmpty.jsx";
// import { connectWS } from "./websocket/socket.js";

import { } from "./utils/initAxiosClient.js";

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

function App() {
  const dispatch = useDispatch();

  // const [userLogin, setUserLogin] = useState({
  //   username: "Adminator",
  //   userType: CONST_USER_TYPE.User,
  //   loginType: CONST_LOGIN_TYPE.Freelancer,
  // });
  //tạm k check đăng nhập
  const userLogin = useSelector((state) => state.authReducer);
  const isLogin = userLogin && userLogin?.username;

  // const userLogin = {
  //   username: "Adminator",
  //   userType: "A",
  // };
  const Axios = useAxios();
  const _handleVisibilityChange = (e, forceUpdate = false) => {
    if (!forceUpdate && document.visibilityState === "hidden") {
      return;
    }

    if (!isNullOrEmpty(userLogin?.username)) {
      Axios.get("/api/auth/token/checkalive")
        .then((res) => {
          if (res.status !== 200) {
            removeUserFromStorage();
            dispatch({ type: "CLEAR_USER" });
          } 
          // else {
          //   // mở
          //   dispatch({ type: "UPDATE_USER_SETTING", payload: res.data });
          // }
        })
        .catch((err) => {
          removeUserFromStorage();
          dispatch({ type: "CLEAR_USER" });
        });
    }
  };

  const fetchSystemCodes = async () => {
    try {
      const { data } = await Axios.collections.SAShare.GetSystemCodes();
      dispatch({
        type: "SET_SYSTEMCODES",
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

  // useEffect(() => {
  //   connectWS();
  // }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", _handleVisibilityChange, false);

    // window.addEventListener("message", _handlePostMessage, false);

    if (userLogin) {
      console.log(userLogin);
      
      _handleVisibilityChange();

      fetchSystemCodes();
    }

    return () => {
      document.removeEventListener("visibilitychange", _handleVisibilityChange, false);

      // window.removeEventListener("message", _handlePostMessage, false);
    };
  }, [userLogin]);

  const routersLogin = createBrowserRouter([
    {
      path: "/login",
      element: <LayoutEmpty {...{ component: Login }} />,
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
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
        <AppAdmin />
      ) : userLogin?.userType === CONST_USER_TYPE.User ? (
        <RenderByLoginType loginType={userLogin.loginType} />
      ) : (
        <RouterProvider router={routersLogin} />
      )}
    </>
  );
}

export default App;
