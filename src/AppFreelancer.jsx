import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login/Index.jsx";
import { LayoutEmpty } from "./components/layout/LayoutEmpty.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/main.css";
import "./index.css";
import { RoutesFreelancerConfig } from "./routes/RoutesFreelancerConfig.jsx";

function AppFreelancer() {
  const getlstRouter = () => {
    let _lstRouters = [];
    _lstRouters.push({
      path: "/login",
      element: <LayoutEmpty {...{ component: Login }} />,
    });

    _lstRouters.push({
      path: "/",
      element: <Navigate to="/tim-viec" replace />,
    });

    RoutesFreelancerConfig?.map((item) => {
      _lstRouters.push({
        path: item.url,
        element: item.ComponentConfig.pageLayout ? (
          <item.ComponentConfig.pageLayout pageConfig={item.ComponentConfig.pageConfig} />
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
  );
}

export default AppFreelancer;
