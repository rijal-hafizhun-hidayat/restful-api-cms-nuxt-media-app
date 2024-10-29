import type { Request } from "express";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toRoleResponse,
  toRoleResponseArray,
  type RoleResponse,
  type RoleWithUserRoles,
} from "../model/role-model";

export class RoleService {
  static async getAllRole(query: Request["query"]): Promise<RoleResponse[]> {
    const roles = await prisma.role.findMany({
      where: {
        name: {
          contains: query.name as string,
        },
      },
    });

    return toRoleResponseArray(roles);
  }

  static async getRoleByRoleId(roleId: number): Promise<RoleResponse> {
    const role: RoleWithUserRoles | null = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      include: {
        user_role: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    return toRoleResponse(role);
  }
}
