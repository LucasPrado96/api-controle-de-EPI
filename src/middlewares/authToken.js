import jwt from "jsonwebtoken";
import auth from "../config/auth";

function authMiddleware(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    response.status(401).json({ Message: "Usuario não autorizado!" });
  }

  const token = authToken.split(" ").at(1);

  try {
    jwt.verify(token, auth.secret, (err, decoded) => {
      if (err) {
        throw new Error();
      }

      request.userId = decoded.id

    });
  } catch (err) {
    return response.status(401).json({ message: "Token is invalid" });
  }

  return next();
}

export default authMiddleware;
