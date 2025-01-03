import LayoutHeader from "../../../components/layout/LayoutHeader";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const FREELANCERINFORMATION = {
  pageLayout: LayoutHeader,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "FREELANCERINFORMATION",
  },
};

export const ACTION_INFO = {
  Avatar: "AVATAR",
  Title: "TITLE",
  HourlyRate: "HR",
  Bio: "BIO",
  Skill: "SKILL",
};
