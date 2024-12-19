import LayoutClient from "../../../components/layout/LayoutClient";
import LayoutWorker from "../../../components/layout/LayoutWorker";
import { FormSystemCode } from "../../../const/FormSystemCode";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const DASHBOARD = {
  pageLayout: LayoutClient,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "DASHBOARD",
  },
};
