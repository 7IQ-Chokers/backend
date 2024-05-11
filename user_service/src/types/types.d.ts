import { Request } from "express";

interface ProtectedUserRequest extends Request {
  user?: {
    name: string;
    email: string;
  };
}

export default ProtectedUserRequest;
