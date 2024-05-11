import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import configs from "../config/config";
import ProtectedUserRequest from "../types/types";

const verifyUserJWT = (
  req: ProtectedUserRequest,
  res: Response,
  next: NextFunction
) => {
  const jwt_secret = configs.jwt_secret;
  const auth_header = req.headers["authorization"];

  if (!auth_header) {
    res.status(401).send({
      type: "error",
      message: "Unauthorized. Check Bearer token in Header",
      data: null,
    });
  } else if (!jwt_secret) {
    console.error(
      "Error obtaining JWT Secret from config",
      `Got '${jwt_secret}'`
    );
    res.status(500).send({
      type: "error",
      message: "Unknown error",
      data: null,
    });
  } else {
    try {
      const auth_token = (<string>auth_header).split(" ")[1];
      const jwt_payload = <jwt.JwtPayload>jwt.verify(auth_token, jwt_secret);

      req.user = {
        email: jwt_payload.email,
      };
      next();
    } catch (error: any) {
      if (error.name == "TokenExpiredError") {
        console.error("JWT Expired!", "");
        res.status(401).send("Unauthorized. Token Expired");
      } else {
        console.error("JWT Verification Error", error);
        res.status(401).send("Token invalid");
      }
    }
  }
};

export default verifyUserJWT;
