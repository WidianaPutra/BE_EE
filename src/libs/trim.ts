export const trim = (data: string | Array<string>): boolean => {
  if (typeof data === "string") {
    return data.trim() === "" ? false : true;
  }

  if (Array.isArray(data)) {
    data.forEach((data) => {
      if (data.trim() === "") {
        return false;
      }
    });
    return true;
  }

  return false;
};
