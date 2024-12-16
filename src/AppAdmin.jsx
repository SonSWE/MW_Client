import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import Login from "./pages/Login/Index.jsx";
import { LayoutEmpty } from "./components/layout/LayoutEmpty.jsx";
// import { connectWS } from "./websocket/socket.js";

import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/main.css";
import "./index.css";
import { RoutesAdminConfig } from "./routes/RoutesAdminConfig.jsx";

function AppAdmin({isLogin}) {
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
