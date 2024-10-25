export interface UserResponse {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  email_verified_at: Date | null;
}

export function toUserResponseArray(user: UserResponse[]): UserResponse[] {
  return user.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    email_verified_at: user.email_verified_at ?? null,
  }));
}
