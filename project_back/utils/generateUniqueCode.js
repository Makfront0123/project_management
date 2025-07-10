import crypto from "crypto";
import Team from "../models/Team.js";

async function generateUniqueCode(length = 6) {
  let code;
  let exists = true;

  while (exists) {
    code = crypto.randomBytes(length).toString("hex").slice(0, length).toUpperCase();
    exists = await Team.findOne({ code });
  }

  return code;
}

export default generateUniqueCode;