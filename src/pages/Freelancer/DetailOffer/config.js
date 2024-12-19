import LayoutWorker from "../../../components/layout/LayoutWorker";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const DETAILOFFER = {
  pageLayout: LayoutWorker,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "DETAILOFFER",
  },
};
