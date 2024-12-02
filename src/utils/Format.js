
import Big from "big.js";

import { FormatType } from "../const/FornatType";
import { ConstInputNumber } from "../const/ValidateType";

/**
 * SSI DVMINH - Hảm format chung cho input, định nghĩa format tại const
 * @param {*} input
 * @param {*} type
 */
// fomat number theo setting company
const formatNumber = ({ value, decimalSeparator }) => {
  if (!value) return value;
  const thousandSeparator = decimalSeparator === "," ? "." : ",";
  const [integerPart, decimalPart] = value.toString().split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator
  );
  return decimalPart
    ? `${formattedIntegerPart}${decimalSeparator}${decimalPart}`
    : formattedIntegerPart;
};

/**
 * SSI MINHDV - format text input
 * @param {*} input
 */
const formatText = (input) => {
  if (!input) return input;
  return input.replace(/[&#]/g, '');
};
/**
 * SSI MINHDV - parse lại text khi nhập vào ô
 * @param {*} input 
 * @returns 
 */
const parseText = (input) => {
  if (!input) return input;
  return input.replace(/[&#]/g, '');
};


// parse number theo setting company theo định dạng 123.45
const parseNumber = ({ value, decimalSeparator, validType }) => {
  const thousandSeparator = decimalSeparator === "," ? "." : ",";
  // hieuvq: có thể sử dụng số nguyên âm
  const negative = validType === ConstInputNumber.Negative ? "-" : "";
  
  const regex = new RegExp(`[^0-9${decimalSeparator}${negative}]`, "g");
  const parsedValue = value
    .replace(regex, "")
    .replace(thousandSeparator, "")
    .replace(decimalSeparator, ".");
  return parsedValue;
};

/**
 * SONDT - format số thập phân, lấy số sau phần thập phân không làm tròn
 * @param {*} value số đầu vào
 * @param {*} fixedNumber số cần lấy sau phần thập phân mặc đinh = 2
 * @returns 
 */
export function formatDecimal(value, fixedNumber = 2)  {
  const strValue = value.toString();
  const decimalIndex = strValue.indexOf('.');

  // Nếu có dấu thập phân và ít nhất 6 chữ số sau dấu
  if (decimalIndex !== -1) {
    const decimalPart = strValue.slice(decimalIndex + 1, decimalIndex + 7);
    return strValue.slice(0, decimalIndex) + '.' + decimalPart;
  }
  
  // Nếu không có phần thập phân, trả về số gốc
  return strValue;
}

export function format({input, type, integer = ",", decimal}) {
  if(!input || isNaN(input)) {
    return input;
  }

  try {
    switch (type) {
      case FormatType.Percent:
        // input = `${new Big(input).times(100).round(6).toNumber()}%`;
        input = `${formatDecimal(new Big(input).times(100).toString())}%`;
        break;
      case FormatType.PercentWithValue:      
        input = `${new Big(input).times(100).round(6).toNumber()}%`;
        break;
      case FormatType.PercentNon:      
        input = `${new Big(input).times(100).round(6).toNumber()}`;
        break;
      case FormatType.Number:
        // TODO sắp tới dấu . sẽ được thay bằng dấu trong Company setting
        // Nhận biết dấu , hoặc . hàng nghìn
  
        input = formatNumber({value: input, decimalSeparator: decimal})
        break;
      case FormatType.VND:
      case FormatType.USD:
            break;
        case FormatType.ID:
            input = formatText(input);
            break;
      case FormatType.Interger:
        // NVS-longdh thêm case số nguyên dương không phần thập phân
        input = formatNumber({value: parseFloat(input).toFixed(0), decimalSeparator: decimal} );
        break;
      case FormatType.Negative:
          // NVS-longdh thêm case số nguyên âm không phần thập phân
          input = formatNumber({value: parseFloat(input).toFixed(0), decimalSeparator: decimal} );
          break;
      default:
        return input;
    }
  } catch (error) {
    console.error(error);
  }
  
  return input;
}

/**
 * SSI  DVMINH Hàm chuyển lại giá trị sau khi parse
 * @param {*} input chuỗi đầu vào
 * @param {*} type loại chuyển đổi
 * @param {*} isParseAll  có chuyển hết ký tự hay không, mặc định - không
 * @returns
 */
export function parserFormat({input, type, isParseAll = false, integer = ",", decimal, validType}) {
  try {
    switch (type) {
      case FormatType.Percent:
        input = isParseAll ? input.replaceAll("%", "") : input.replace("%", "");
        if(!isNaN(input) && input !== "") {
          input = new Big(input).div(100).toNumber();
        }
        
        break;
      case FormatType.PercentWithValue:
        input = isParseAll ? input.replaceAll("%", "") : input.replace("%", "");
        const parse = parseFloat(input);
        if(!isNaN(input) && input !== "") {
          input = new Big(input).div(100).toNumber();
        }
        break;
      case FormatType.PercentNon:
        input = isParseAll ? input.replaceAll("", "") : input.replace("", "");
        const nonParse = parseFloat(input);
        if(!isNaN(input) && input !== "") {
          input = new Big(input).div(100).toNumber();
        }
        break;
      case FormatType.Number:
        
        //Nhận biết dấu , hoặc . hàng nghìn (Chỉnh sửa mặc định dạng thập phân 123.45)
        input = parseNumber({value: input, decimalSeparator: decimal, validType});

            break;

        case FormatType.ID:
            input = parseText(input);
            break;
      
        case FormatType.USD:
      case FormatType.VND:
        break;
      default:
        return input;
    }
  } catch (error) {
    console.error(error);
  }
  
  return input;
}
