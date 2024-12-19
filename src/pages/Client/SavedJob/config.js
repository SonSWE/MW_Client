import LayoutWorker from "../../../components/layout/LayoutWorker";
import { FormSystemCode } from "../../../const/FormSystemCode";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const SAVEDJOB = {
  pageLayout: LayoutWorker,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "SAVEDJOB",
  },
};
