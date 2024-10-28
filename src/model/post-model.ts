import type { post } from "@prisma/client";
import type { UserResponse } from "./user-model";

export interface PostResponse {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  like_count?: number;
  user?: UserResponse;
  post_like_count?: number;
  post_comment_count?: number;
}

export interface ActivityPostResponse {
  id: number;
  post_like_count: number;
  post_comment_count: number;
}

export interface PostCount {
  post_like: number;
  post_comment: number;
}

export function toPostResponseArray(
  posts: (PostResponse & { user: UserResponse } & { _count: PostCount })[]
): PostResponse[] {
  return posts.map((post) => ({
    id: post.id,
    user_id: post.user_id,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    user: {
      id: post.user.id,
      name: post.user.name,
    },
    post_like_count: post._count.post_like ?? 0,
    post_comment_count: post._count.post_comment ?? 0,
  }));
}

export function toActivityPostUser(
  posts: (PostResponse & { _count: PostCount })[]
): ActivityPostResponse[] {
  return posts.map((post) => ({
    id: post.id,
    post_comment_count: post._count.post_comment ?? 0,
    post_like_count: post._count.post_like ?? 0,
  }));
}
