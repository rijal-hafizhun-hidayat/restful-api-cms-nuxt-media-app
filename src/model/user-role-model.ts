export interface UserRoleRequest {
  userRole: UserRoleResponse[];
}

export interface UserRoleResponse {
  role_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export function toUserRoleResponseArray(
  userRoles: UserRoleResponse[]
): UserRoleResponse[] {
  return userRoles.map((userRole) => ({
    role_id: userRole.role_id,
    user_id: userRole.user_id,
    created_at: userRole.created_at,
    updated_at: userRole.updated_at,
  }));
}