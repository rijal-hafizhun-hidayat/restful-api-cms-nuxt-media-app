import { prisma } from "../app/database";
import { toUserResponseArray, type UserResponse } from "../model/user-model";

export class UserService {
  static async getAllUser(): Promise<UserResponse[]> {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
        email_verified_at: true,
      },
    });

    return toUserResponseArray(user);
  }
}
