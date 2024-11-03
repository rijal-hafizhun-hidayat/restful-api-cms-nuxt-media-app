import type { Request } from "express";
import { prisma } from "../app/database";
import {
  toUserResponse,
  toUserResponseArray,
  type UserIsActiveRequest,
  type UserRequest,
  type UserResponse,
} from "../model/user-model";
import { ErrorResponse } from "../error/error-response";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";

export class UserService {
  static async getAllUser(query: Request["query"]): Promise<UserResponse[]> {
    const { name, email } = query;
    const user = await prisma.user.findMany({
      where: {
        name: {
          contains: name as string,
        },
        email: {
          contains: email as string,
        },
      },
    });

    return toUserResponseArray(user);
  }

  static async getDetailUserById(userId: number): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    return toUserResponse(user);
  }

  static async updateIsActiveUser(
    userId: number,
    request: UserIsActiveRequest
  ): Promise<UserResponse> {
    const requestBody: UserIsActiveRequest = Validation.validate(
      UserValidation.updateIsActiveUserValidation,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    const [updateUser] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          is_active: requestBody.is_active,
        },
      }),
    ]);

    return toUserResponse(updateUser);
  }

  static async destroyUserByUserId(userId: number): Promise<UserResponse> {
    const isUserExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const [deletedUser] = await prisma.$transaction([
      prisma.user.delete({
        where: {
          id: userId,
        },
      }),
    ]);

    return toUserResponse(deletedUser);
  }

  static async updateEmailVerifiedAtByUserId(
    userId: number
  ): Promise<UserResponse> {
    const isUserExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email_verified_at: new Date(),
        },
      }),
    ]);

    return toUserResponse(updatedUser);
  }

  static async findUserByUserId(userId: number): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    return toUserResponse(user);
  }

  static async updateUserByUserId(
    userId: number,
    request: UserRequest
  ): Promise<UserResponse> {
    const requestBody: UserRequest = Validation.validate(
      UserValidation.updateUserValidation,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: requestBody.name,
          email: requestBody.email,
          bio: requestBody.bio ?? null,
        },
      }),
    ]);

    return toUserResponse(updatedUser);
  }
}
