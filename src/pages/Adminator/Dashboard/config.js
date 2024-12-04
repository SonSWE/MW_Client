import LayoutDashboardAdmin from "../../../components/layout/LayoutDashboardAdmin";
import { useBusinessAction } from "./BusinessAction";
import PageContent from "./PageContent";




export const DASHBOARD = {
  pageLayout: LayoutDashboardAdmin,
  pageConfig: {
    businessAction: useBusinessAction,
    config: {
      PageContent,
    },
    functionId: "DASHBOARD",
  },
};
