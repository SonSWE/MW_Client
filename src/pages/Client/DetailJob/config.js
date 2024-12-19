import LayoutClient from "../../../components/layout/LayoutClient";
import LayoutWorker from "../../../components/layout/LayoutWorker";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const DETAILJOB = {
  pageLayout: LayoutClient,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "DETAILJOB",
  },
};