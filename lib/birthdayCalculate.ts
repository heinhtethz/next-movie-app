const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const isValidDate = (date?: string): date is string => {
  if (!date || date.length < 4) return false;
  const d = new Date(date);
  return !isNaN(d.getTime());
};

export const formatDate = (date: string): string => {
  if (!isValidDate(date)) return "-";
  const d = new Date(date);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const birthdayCalculate = (birthday?: string): string => {
  if (!isValidDate(birthday)) return "-";

  const today = new Date();
  const dob = new Date(birthday);

  let age = today.getFullYear() - dob.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return `${formatDate(birthday)} (${age} years old)`;
};

export default birthdayCalculate;
