import LayoutHeader from "../../../components/layout/LayoutHeader";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const DETAILJOB = {
  pageLayout: LayoutHeader,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "DETAILJOB",
  },
};

export const CONST_ACTION = {
  ApprovalResult: "A",
  EndContract: "E",
  DetailContract: "D",
};
