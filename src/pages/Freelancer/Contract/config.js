import LayoutWorker from "../../../components/layout/LayoutWorker";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const CONTRACT = {
  pageLayout: LayoutWorker,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "CONTRACT",
  },
};
