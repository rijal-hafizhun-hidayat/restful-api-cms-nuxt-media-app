import { prisma } from "../app/database";
import {
  toUserRoleResponseArray,
  type UserRoleRequest,
  type UserRoleResponse,
} from "../model/user-role-model";

export class UserRoleService {
  static async storeUserRole(
    request: UserRoleRequest
  ): Promise<UserRoleResponse[]> {
    const [createdUserRole] = await prisma.$transaction([
      prisma.user_role.createManyAndReturn({
        data: request.userRole,
      }),
    ]);

    return toUserRoleResponseArray(createdUserRole);
  }
}
