import type { Request } from "express";
import { prisma } from "../app/database";
import { toUserResponseArray, type UserResponse } from "../model/user-model";

export class UserService {
  static async getAllUser(query: Request["query"]): Promise<UserResponse[]> {
    const { name, email } = query;
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
        email_verified_at: true,
      },
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
}
