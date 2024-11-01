import type { role, user_role } from "@prisma/client";
import type { RoleResponse } from "./role-model";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  email_verified_at: Date | null;
  bio: string | null;
  is_active: boolean | null;
  token: string;
  role: RoleResponse[];
}
export interface UserWithRole {
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  email_verified_at: Date | null;
  bio: string | null;
  is_active: boolean | null;
  user_role: Array<user_role & { role: role }>;
}
export function toLoginResponse(
  user: UserWithRole,
  token: string
): LoginResponse {
  return {
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    email_verified_at: user.email_verified_at ?? null,
    bio: user.bio ?? null,
    is_active: user.is_active ?? null,
    token: token,
    role: user.user_role.map((userRole) => userRole.role),
  };
}
