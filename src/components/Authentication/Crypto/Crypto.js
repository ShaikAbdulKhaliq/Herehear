import CryptoJS from "crypto-js";

export function generateSecretKey() {
  const randomBytes = CryptoJS.lib.WordArray.random(32);
  
  const secretKey = randomBytes.toString(CryptoJS.enc.Hex);
  
  return secretKey;
}


