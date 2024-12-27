
import LayoutHeader from "../../components/layout/LayoutHeader";
import LayoutMessenger from "../../components/layout/LayoutMessenger";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const MESSENGER = {
  pageLayout: LayoutMessenger,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "MESSENGER",
  },
};
