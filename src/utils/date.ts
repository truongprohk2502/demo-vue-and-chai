export const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  let dd: string | number = date.getDate();
  let mm: string | number = date.getMonth() + 1;
  let yyyy: string | number = date.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return mm + "/" + dd + "/" + yyyy;
};
