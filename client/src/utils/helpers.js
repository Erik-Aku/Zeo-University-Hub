// import CryptoJS from "crypto-js";

// //const CryptoJS = require("crypto-js");

// export const generateHashId = (name, city, state) => {
//   return CryptoJS.SHA256(`${name}-${city}-${state}`).toString(CryptoJS.enc.Hex);
// };

// import { createHash } from "crypto";

// export const generateHashId = (name, city, state) => {
//   return createHash("sha256").update(`${name}-${city}-${state}`).digest("hex");
// };

export async function generateHashId(name, city, state) {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${name}-${city}-${state}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
