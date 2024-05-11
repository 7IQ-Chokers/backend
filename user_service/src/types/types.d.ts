import { Request } from "express";

interface ProtectedUserRequest extends Request {
  user?: {
    email: string;
  };
}

export default ProtectedUserRequest;
