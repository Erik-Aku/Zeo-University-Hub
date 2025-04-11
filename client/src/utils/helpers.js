// import CryptoJS from "crypto-js";

// //const CryptoJS = require("crypto-js");

// export const generateHashId = (name, city, state) => {
//   return CryptoJS.SHA256(`${name}-${city}-${state}`).toString(CryptoJS.enc.Hex);
// };

import { createHash } from "crypto";

export const generateHashId = (name, city, state) => {
  return createHash("sha256").update(`${name}-${city}-${state}`).digest("hex");
};
