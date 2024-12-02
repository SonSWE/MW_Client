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
