import CryptoJS from "crypto-js";

//const CryptoJS = require("crypto-js");

export const generateHashId = (name, city, state) => {
  return CryptoJS.SHA256(`${name}-${city}-${state}`).toString(CryptoJS.enc.Hex);
};
