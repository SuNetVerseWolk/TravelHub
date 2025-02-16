export const leaveNumbersOnly = (value) => value.replace(/\D/g, "");

export const formatPhoneNumber = Object.freeze({
  userFriendly: (number) => {
    if (!number) return number;
    const cleaned = leaveNumbersOnly(number).substring(0, 11);
    const match = cleaned.match(
      /^(7|8)?(\d{3}|\d{2}|\d)?(\d{3}|\d{2}|\d)?(\d{2}|\d)?(\d{2}|\d)?$/
    );

    if (match && !/^[a-zA-Z]/.test(number)) {
      return `${match[1] == 7 ? "+" : ""}${match[1] || ""}${
        match[2] ? " (" : ""
      }${match[2] || ""}${match[3] ? ") " : ""}${match[3] || ""}${
        match[4] ? "-" : ""
      }${match[4] || ""}${match[5] ? "-" : ""}${match[5] || ""}`;
		}

    return number;
  },
  dataFriendly: (number) => {
    if (!number) return "";
    number = leaveNumbersOnly(number).substring(0, 11);

    return number[0] == 7 || number[0] == 8 ? `+7${number.substring(1, 11)}` : number;
  },
});
