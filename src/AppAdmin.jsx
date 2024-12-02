import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

//thêm phần này để khởi tạo axios
import {} from "./apiHelper/connection/axiosInterceptors.js";
import { useEffect } from "react";
import Login from "./pages/Login/Index.jsx";
import { LayoutEmpty } from "./components/layout/LayoutEmpty.jsx";
// import { connectWS } from "./websocket/socket.js";

import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/main.css";
import "./index.css";
import { RoutesAdminConfig } from "./routes/RoutesAdminConfig.jsx";
import { useAxios } from "./utils/apiHelper.js";
import { convertToArray } from "./utils/convertData.js";

function AppAdmin() {
  const axios = useAxios();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.authReducer);
  // const isLogin = userLogin && userLogin?.username;

  const isLogin = true;

  useEffect(() => {
    if (userLogin) {
      fetchSystemCodes();
    }
  }, [userLogin]);

  const fetchSystemCodes = async () => {
    try {
      const { data } = await axios.collections.SAShare.GetSystemCodes();
      dispatch({
        type: "SET_SYSTEMCODES",
        payload: convertToArray(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getlstRouter = () => {
    let _lstRouters = [];
    _lstRouters.push({
      path: "/login",
      element: <LayoutEmpty {...{ component: Login }} />,
    });
    RoutesAdminConfig?.map((item) => {
      _lstRouters.push({
        path: item.url,
        element: item.ComponentConfig.pageLayout ? (
          <item.ComponentConfig.pageLayout ComponentConfig={item.ComponentConfig} />
        ) : (
          <item.pageContent />
        ),
      });
    });

    return _lstRouters ?? [];
  };

  const router = createBrowserRouter(getlstRouter());

  return (
    <>
      {isLogin && (
        <>
          <RouterProvider router={router} />

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      )}
    </>
  );
}

export default AppAdmin;
