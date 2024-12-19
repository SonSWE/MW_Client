import moment from "moment";

export function makeid() {
  return parseInt(new Date().getTime());
}

export const isRender = (prevValues, currentValues, listUpdate) => {
  for (const element of listUpdate) {
    if (Array.isArray(element)) {
      if (
        prevValues?.[element[0]]?.[element[1]]?.[element[2]] !==
        currentValues?.[element[0]]?.[element[1]]?.[element[2]]
      )
        return true;
    } else {
      if (prevValues?.[element] !== currentValues?.[element]) return true;
    }
  }
};
export function formatCreatedDate(apiDate) {
  const now = moment(); // Current time
  const inputDate = moment(apiDate); // Convert API date to moment object

  if (!inputDate.isValid()) {
    return "Invalid date"; // Return an error message if the input date is invalid
  }

  const diffInMinutes = now.diff(inputDate, "minutes");
  const diffInHours = now.diff(inputDate, "hours");
  const diffInDays = now.diff(inputDate, "days");

  // Case 1: If the date is within the last 2 days
  if (diffInDays < 2) {
    if (diffInHours < 1) {
      return `${diffInMinutes} phút trước`;
    }
    return `${diffInHours} giờ trước`;
  }

  // Case 2: If the date is within the current year but more than 2 days ago
  if (inputDate.year() === now.year()) {
    return inputDate.format("HH:mm DD/MM");
  }

  // Case 3: If the date is in a different year
  return inputDate.format("HH:mm DD/MM/YYYY");
}

export const countProposalText = (count) => {
  switch (true) {
    case count < 5:
      return "Ít hơn 5";
    case count >= 5 && count <= 10:
      return "5 đến 10";
    case count >= 10 && count <= 20:
      return "10 đến 20";
    case count >= 20 && count <= 50:
      return "20 đến 50";
    case count >= 50 && count <= 100:
      return "50 đến 100";
    case count >= 100 && count <= 500:
      return "50 đến 500";
    case count >= 500:
      return "Hơn 500";
  }
};
export const triggerEvent = (event) => {
  document.dispatchEvent(new CustomEvent(event.name, { detail: event.data }));
};
export const convertToArray = (arr) => {
  return Array.isArray(arr) ? arr : [];
};

export const CONST_FORM_MODE = Object.freeze({
  SEARCH: "SEARCH",
  CREATE: "CREATE",
  EDIT: "EDIT",
  COPY: "COPY",
});

export const dateFomatCompany = "DD/MM/YYYY";

export const getSystemCodeValues = (systemCodes, systemCodeId) => {
  try {
    return convertToArray(
      convertToArray(systemCodes).find((e) => e.systemCodeId === systemCodeId)?.systemCodeValues
    );
  } catch (error) {
    return [];
  }
};

export function isNullOrEmpty(value) {
  return value === null || value === undefined || value === "";
}
