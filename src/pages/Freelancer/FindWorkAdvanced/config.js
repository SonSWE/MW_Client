import LayoutHeader from "../../../components/layout/LayoutHeader";
import { FormSystemCode } from "../../../const/FormSystemCode";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

const SearchConfig = [
  { key: FormSystemCode.SystemCodeId, operator: "=" },
  { key: FormSystemCode.Name, operator: "=" },
];

export const FINDWORKADVANCED = {
  pageLayout: LayoutHeader,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "FINDWORKADVANCED",
  },
};
