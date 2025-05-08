import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      isAdmin?: boolean;
    }
  }
}

export const authenticationMiddleware: RequestHandler = (req, res, next) => {
  const Token = req.headers.authorization;
  if (!Token) {
    res.status(404).json({ message: "Unauthenticated" });
    return;
  }

  try {
    const { userId, isAdmin } = jwt.verify(Token, process.env.JWT_SECRET) as {
      userId: string;
      isAdmin: boolean;
    };

    req.userId = userId;
    req.isAdmin = isAdmin;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
