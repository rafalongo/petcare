import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mysecret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "mysecret_refresh";

export const Token = {
  // ACCESS TOKEN
  generate(payload: object) {
    return jwt.sign(payload, SECRET, { expiresIn: "15m" }); //expira em 15 minutos
  },
  verify(token: string) {
    try {
      return jwt.verify(token, SECRET);
    } catch {
      return null;
    }
  },

  // REFRESH TOKEN
  generateRefreshToken(payload: object) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" }); // expira em 7 dias
  },

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, REFRESH_SECRET);
    } catch {
      return null;
    }
  },
};
