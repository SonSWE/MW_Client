import LayoutHeader from "../../../components/layout/LayoutHeader";
import { useBusinessAction } from "./BusinessAction";
import InputItems from "./InputItems";

export const FREELANCERINFORMATIONVIEW = {
  pageLayout: LayoutHeader,
  pageConfig: {
    businessAction: useBusinessAction,
    Component: InputItems,
    functionId: "FREELANCERINFORMATIONVIEW",
  },
};

export const ACTION_INFO = {
  Avatar: "AVATAR",
  Title: "TITLE",
  HourlyRate: "HR",
  Bio: "BIO",
  Skill: "SKILL",
  EDU_INSERT: "EDU_INSERT",
  EDU_UPDATE: "EDU_UPDATE",
  EDU_DELETE: "EDU_DELETE",

  WH_INSERT: "WH_INSERT",
  WH_UPDATE: "WH_UPDATE",
  WH_DELETE: "WH_DELETE",

  CERT_INSERT: "CERT_INSERT",
  CERT_UPDATE: "CERT_UPDATE",
  CERT_DELETE: "CERT_DELETE",

  PROJECT_INSERT: "PROJECT_INSERT",
  PROJECT_UPDATE: "PROJECT_UPDATE",
  PROJECT_DELETE: "PROJECT_DELETE",
};
