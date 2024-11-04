import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toUserRoleResponse,
  toUserRoleResponseArray,
  type UserRoleRequestArr,
  type UserRoleResponse,
} from "../model/user-role-model";

export class UserRoleService {
  static async storeUserRole(
    request: UserRoleRequestArr
  ): Promise<UserRoleResponse[]> {
    const [createdUserRole] = await prisma.$transaction([
      prisma.user_role.createManyAndReturn({
        data: request.userRole,
      }),
    ]);

    return toUserRoleResponseArray(createdUserRole);
  }

  static async destroyUserRoleByRoleIdUserId(
    roleId: number,
    userId: number
  ): Promise<UserRoleResponse> {
    const userRole = await prisma.user_role.findFirst({
      where: {
        role_id: roleId,
        user_id: userId,
      },
    });

    if (!userRole) {
      throw new ErrorResponse(404, "user role not found");
    }

    await prisma.$transaction([
      prisma.user_role.deleteMany({
        where: {
          role_id: roleId,
          user_id: userId,
        },
      }),
    ]);

    return toUserRoleResponse(userRole);
  }
}
