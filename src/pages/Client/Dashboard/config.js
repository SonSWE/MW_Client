import LayoutHeader from "../../../components/layout/LayoutHeader";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const DASHBOARD = {
  pageLayout: LayoutHeader,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "DASHBOARD",
  },
};
