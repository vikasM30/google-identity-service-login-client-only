import jwt_decode from "jwt-decode";

const verifyToken = (token) => { return jwt_decode(token); };

export default { verifyToken };