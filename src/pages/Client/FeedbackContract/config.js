import LayoutHeader from "../../../components/layout/LayoutHeader";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const FEEDBACKCONTRACT = {
  pageLayout: LayoutHeader,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "FEEDBACKCONTRACT",
  },
};