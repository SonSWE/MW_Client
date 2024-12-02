import { ConstInputNumber, ConstInputText } from "../const/ValidateType";
import { parserFormat } from "./Format";
/**
 * SSI DVMINH - Validate chuỗi số nhập vào
 * @param {*} input  - chuỗi đầu vào
 * @param {*} validType  - Loại số cần validate
 * @returns true = passed
 */
export function validateNumber({input, validType, formatType, integer, decimal = "."}) {
  let result = false;
  let regex = /^$/g;
  const valueInput = input;
  if (formatType) {
    input = parserFormat({input, type: formatType, integer: integer, decimal: decimal, validType});
  }
  switch (validType) {
    case ConstInputNumber.Integer: // Số nguyên dương
      // regex = /0*[0-9]/;
      //sondt fix k nhận số 0 ở đầu
      
      regex = /^[0-9]+$/;
      break;
    case ConstInputNumber.Decimal: // Số thập phân
      
      regex = /^\d*\.?\d*$/;

      const valueDecimal = getNumberBeforePercent(valueInput);
      if (countDecimalPlaces({ num: valueDecimal, decimal: decimal }) >= 7) {
        return false;
      }
      break;
    case ConstInputNumber.PositiveDecimal: // Số thập phân dương, không giới hạn phần thập phân
      regex = /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/;
      break;
    case ConstInputNumber.PositiveInteger: // Số nguyên dương, chấp nhận số không
      regex = /^[1-9]\d*$/;
      break;
    case ConstInputNumber.DynamicDecimal: // Số thập phân không giới hạn cả 2 phần thập phân
      // regex =
      //   /^(0*[1-9]\d{0,12}(\.\d{0,12})?0*|0*\.([1-9]|\d[1-9]|[1-9]\d)0*)$/;
      //sondt fix k nhận số 0 ở đầu
      regex = /^(0*([1-9]\d{0,12}|\d)(\.\d{0,12})?|0*\.([1-9]|\d[1-9]|[1-9]\d))$/;
      break;
    case ConstInputNumber.DynamicDecimalMaxTwoNumberRight: // Số thập phân giới hạn phần thập phân 2 ký tự số
      regex = /^(0*[0-9]\d{0,12}(\.\d{0,2})?0*|0*\.([1-9]|\d[1-9]|[1-9]\d)0*)$/;
      break;
    case ConstInputNumber.Percent: // Phần trăm
      regex = /(^100(\.0{1,2})?$)|(^(0*([1-9]\d{0,1}|\d)(\.\d{0,12})?|0*\.([1-9]|\d[1-9]|[1-9]\d)0*)?$)/;
      break;
      // bổ sung số nguyên âm
    case ConstInputNumber.Negative:
      regex = /^-?[0-9]+$/;
      break;
    default:
      return false;
  }

  if (regex.test(input)) {
    result = true;
  }
  //hieuvq passed khi nhập - đầu (chấp nhận số nguyên âm)
  if(validType === ConstInputNumber.Negative && ["-"].includes(input)){
    result = true;
  }
  return result;
}
/**
 * SSI DVMINH - Hàm validate input string, bổ sung kiểu input vào const ValidateType, thêm case
 * @param {*} input chuỗi text đầ vào
 * @param {*} validType loại validate
 * @returns
 */
export function validateText(input, validType) {
  let result = false;
  let regex = /^$/g;

  switch (validType) {
    case ConstInputText.Email:
    case ConstInputText.Phone:
      break;
    case ConstInputText.ID:
      regex = /^[^&#]*$/;
      break;
    default:
      return false;
  }

  if (regex.test(input)) {
    result = true;
  }
  return result;
}

function countDecimalPlaces({num, decimal = "."}) {
  // Chuyển số thành chuỗi
  const numStr = num.toString();

  // Tìm vị trí của dấu phẩy
  const decimalIndex = numStr.indexOf(decimal);

  // Nếu không có dấu phẩy, trả về 0
  if (decimalIndex === -1) {
    return 0;
  }

  // Tính số lượng chữ số sau dấu phẩy
  return numStr.length - decimalIndex - 1;
}

function getNumberBeforePercent(input) {
  input = input ? input : 0;
  const percentIndex = input.indexOf('%');
  if (percentIndex !== -1) {
    return input.substring(0, percentIndex);
  }
  return input;
}
