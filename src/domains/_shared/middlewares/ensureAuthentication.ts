import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@infra/repositories/UsersRepository";
import { InvalidTokenException } from "../exceptions/InvalidTokenException";
import { NotFoundException } from "../exceptions/NotFoundException";

interface IPayload {
  sub: string;
}

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new InvalidTokenException();
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "a7b71b7b48466113992530a9900c2462") as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException("User does not exists");
    }

    request.user = {
      id: user_id
    };

    next();
  } catch {
    throw new InvalidTokenException();
  }
}
