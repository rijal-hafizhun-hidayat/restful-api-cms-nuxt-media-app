import type { role, user_role } from "@prisma/client";
import type { UserResponse } from "./user-model";

export interface RoleResponse {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  user?: UserResponse[];
}

export interface UserRole {
  user_id: number;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  user: UserResponse;
}

// export interface RoleWithUsersResponse extends RoleResponse {
//   user: UserResponse[];
// }

export function toRoleResponseArray(roles: RoleResponse[]): RoleResponse[] {
  return roles.map((role) => ({
    id: role.id,
    name: role.name,
    created_at: role.created_at,
    updated_at: role.updated_at,
  }));
}

export type RoleWithUserRoles = RoleResponse & {
  user_role: Array<user_role & { user: UserResponse }>;
};

export function toRoleWithUserResponse(role: RoleWithUserRoles): RoleResponse {
  return {
    id: role.id,
    name: role.name,
    created_at: role.created_at,
    updated_at: role.updated_at,
    user:
      role.user_role.map((user_role) => ({
        id: user_role.user.id,
        name: user_role.user.name,
        email: user_role.user.email,
        created_at: user_role.user.created_at,
        updated_at: user_role.user.updated_at,
        email_verified_at: user_role.user.email_verified_at,
      })) ?? [],
  };
}

export function toRoleResponse(role: role): RoleResponse {
  return {
    id: role.id,
    name: role.name,
    created_at: role.created_at,
    updated_at: role.updated_at,
  };
}
