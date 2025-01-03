
import LayoutHeader from "../../components/layout/LayoutHeader";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const VERIFYEKYC = {
  pageLayout: LayoutHeader,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "VERIFYEKYC",
  },
};
