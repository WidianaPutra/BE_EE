import jwt from "jsonwebtoken";
const JWT_SECRATE = process.env.JWT_SECRATE;
export const JwtGenerator = (data) => {
    return jwt.sign(data, JWT_SECRATE, { expiresIn: "1h" });
};
export const DecodeToken = (data) => {
    return jwt.verify(data, JWT_SECRATE);
};
