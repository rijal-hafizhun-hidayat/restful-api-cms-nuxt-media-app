export interface UserResponse {
  id: number;
  name: string;
  email?: string;
  is_active?: boolean | null;
  created_at?: Date;
  updated_at?: Date;
  email_verified_at?: Date | null;
  bio?: string | null;
  avatar?: string | null;
}

export interface UserRequest {
  is_active?: boolean;
}

export function toUserResponseArray(user: UserResponse[]): UserResponse[] {
  return user.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    bio: user.bio ?? null,
    is_active: user.is_active ?? null,
    created_at: user.created_at,
    updated_at: user.updated_at,
    email_verified_at: user.email_verified_at ?? null,
  }));
}

export function toUserResponse(user: UserResponse): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active ?? null,
    bio: user.bio ?? null,
    created_at: user.created_at,
    updated_at: user.updated_at,
    email_verified_at: user.email_verified_at ?? null,
    avatar: user.avatar
      ? `${Bun.env.STORAGE_BASE_URL}/storage/profile/${user.avatar}`
      : null,
  };
}
