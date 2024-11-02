import type { Request } from "express";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toRoleResponse,
  toRoleResponseArray,
  toRoleWithUserResponse,
  type RoleRequest,
  type RoleResponse,
  type RoleWithUserRoles,
} from "../model/role-model";
import { Validation } from "../validation/validation";
import { RoleValidation } from "../validation/role-validation";

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

  static async getRoleByRoleId(
    roleId: number,
    query: Request["query"]
  ): Promise<RoleResponse> {
    const role: RoleWithUserRoles | null = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      include: {
        user_role: {
          include: {
            user: true,
          },
          where: {
            user: {
              name: {
                contains: query.name as string,
              },
              email: {
                contains: query.email as string,
              },
            },
          },
        },
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    return toRoleWithUserResponse(role);
  }

  static async destroyRoleByRoleId(roleId: number): Promise<RoleResponse> {
    const isRoleExist = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!isRoleExist) {
      throw new ErrorResponse(404, "role not found");
    }

    const [deletedRole] = await prisma.$transaction([
      prisma.role.delete({
        where: {
          id: roleId,
        },
      }),
    ]);

    return toRoleResponse(deletedRole);
  }

  static async storeRole(request: RoleRequest): Promise<RoleResponse> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.roleRequest,
      request
    );

    const [role] = await prisma.$transaction([
      prisma.role.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toRoleResponse(role);
  }

  static async findRoleByRoleId(roleId: number): Promise<RoleResponse> {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    return toRoleResponse(role);
  }

  static async updateRoleByRoleId(
    roleId: number,
    request: RoleRequest
  ): Promise<RoleResponse> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.roleRequest,
      request
    );

    const isRoleExist = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!isRoleExist) {
      throw new ErrorResponse(404, "role not found");
    }

    const [updatedRole] = await prisma.$transaction([
      prisma.role.update({
        where: {
          id: roleId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toRoleResponse(updatedRole);
  }
}
