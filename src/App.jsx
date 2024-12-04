import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//thêm phần này để khởi tạo axios
import {} from "./apiHelper/connection/axiosInterceptors.js";

import { useEffect, useState } from "react";
import Login from "./pages/Login/Index.jsx";
import { useLoginApi } from "./apiHelper/api/login.js";
import { LayoutEmpty } from "./components/layout/LayoutEmpty.jsx";
// import { connectWS } from "./websocket/socket.js";

//import thư viện css
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import AppAdmin from "./AppAdmin.jsx";
import { CONST_USER_TYPE } from "./const/LayoutConst.js";
import AppWorker from "./AppWorker.jsx";

function App() {
  const loginApi = useLoginApi();
  const dispatch = useDispatch();

  const [userLogin, setUserLogin] = useState({
    username: "Adminator",
    userType: CONST_USER_TYPE.Admin,
  })
  //tạm k check đăng nhập
  // const userLogin = useSelector((state) => state.authReducer);
  const isLogin = userLogin && userLogin?.username;

  // const userLogin = {
  //   username: "Adminator",
  //   userType: "A",
  // };

  const _handleVisibilityChange = (e) => {
    if (isLogin && document.visibilityState !== "hidden") {
      loginApi
        .Checkalive()
        .then((res) => {
          if (res.status !== 200) {
            dispatch({ type: "CLEAR_USER" });
          }
        })
        .catch((err) => {
          dispatch({ type: "CLEAR_USER" });
        });
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

  //tạm k check đăng nhập
  // useEffect(() => {
  //   document.addEventListener("visibilitychange", _handleVisibilityChange, false);

  //   window.addEventListener("message", _handlePostMessage, false);

  //   if (userLogin) {
  //     _handleVisibilityChange();
  //     //gọi api lấy allcode
  //     // GetAllCode()
  //     //   .then((data) => {
  //     //     if (data && data.jsondata) {
  //     //       dispatch({
  //     //         type: "SET_ALLCODE",
  //     //         payload: JSON.parse(data.jsondata),
  //     //       });
  //     //     }
  //     //   })
  //     //   .catch(function (err) {
  //     //     console.log(err);
  //     //   });
  //   }

  //   return () => {
  //     document.removeEventListener("visibilitychange", _handleVisibilityChange, false);

  //     window.removeEventListener("message", _handlePostMessage, false);
  //   };
  // }, [userLogin]);

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
  console.log(userLogin?.userType);
  return (
    <>
      {userLogin?.userType === CONST_USER_TYPE.Admin ? (
        <AppAdmin />
      ) : userLogin?.userType === CONST_USER_TYPE.Worker ? (
        <AppWorker/>
      ) : userLogin?.userType === "T" ? (
        <></>
      ) : (
        <RouterProvider router={routersLogin} />
      )}
    </>
  );
}

export default App;
