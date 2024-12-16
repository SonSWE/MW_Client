import LayoutWorker from "../../../components/layout/LayoutWorker";
import { FormSystemCode } from "../../../const/FormSystemCode";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

const SearchConfig = [
  { key: FormSystemCode.SystemCodeId, operator: "=" },
  { key: FormSystemCode.Name, operator: "=" },
];

export const FINDWORKADVANCED = {
  pageLayout: LayoutWorker,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "FINDWORKADVANCED",
  },
};
