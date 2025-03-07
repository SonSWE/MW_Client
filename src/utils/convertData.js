import moment from "moment";
import { isNullOrEmpty } from "./utils";

export const PriceFormatter = (value) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value || 0);
};

export const valueToString = (value) => {
  if (isNaN(value) === true || value === undefined || value === null) {
    return "";
  }

  return value;
};
export const formatNumber = (numberValue) => {
  if (isNaN(numberValue) === true || numberValue === undefined || numberValue === null) {
    return "";
  }
  var num = numberValue.toString().replace(/[^0-9]/g, "");
  return (numberValue = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
};

export const formatNumberVND = (numberValue) => {
  if (isNaN(numberValue) === true || numberValue === undefined || numberValue === null) {
    return "";
  }
  var num = numberValue.toString().replace(/[^0-9]/g, "");
  return (numberValue = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + "đ";
};

export const formatNumberV2 = (number) => {
  if (isNaN(number) === true || number === undefined || number === null) {
    return "";
  }
  // Tách phần nguyên và phần thập phân
  const parts = number.toString().split(".");
  const integerPart = parts[0];
  let decimalPart = parts[1] || ""; // Nếu không có phần thập phân, mặc định là chuỗi rỗng

  // Định dạng phần nguyên
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Định dạng phần thập phân nếu có
  if (decimalPart.length > 0) {
    decimalPart = `.${decimalPart}`;
  }

  return `${formattedInteger}${decimalPart}`;
};

export const convertToArray = (arr) => {
  return Array.isArray(arr) ? arr : [];
};

export const dateToString = (date) => {
  var d = (date.getDate() < 10 ? "0" : "") + date.getDate();
  var m = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  var hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
  var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  return `${date.getFullYear()}-${m}-${d} ${hour}:${minutes}`;
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const formatDate = (value, format = "DD/MM/YYYY") => {
  if(isNullOrEmpty(value)){
    return ""
  }
  const inputDate = moment(value); // Convert API date to moment object

  if (!inputDate.isValid()) {
    return "Invalid date"; // Return an error message if the input date is invalid
  }

  return inputDate.format(format)
};
