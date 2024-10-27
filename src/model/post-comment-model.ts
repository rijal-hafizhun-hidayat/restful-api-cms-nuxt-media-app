import type { post_comment } from "@prisma/client";
import type { UserResponse } from "./user-model";

export interface PostCommentResponse {
  id: number;
  user_id: number;
  post_id: number;
  created_at: Date;
  updated_at: Date;
  comment: string;
  user?: UserResponse;
}

export interface PostCommentRequest {
  user_id?: number;
  post_id?: number;
  comment: string;
}

export function toPostCommentResponseArray(
  postComments: (PostCommentResponse & { user: UserResponse })[]
): PostCommentResponse[] {
  return postComments.map((postComment) => ({
    id: postComment.id,
    user_id: postComment.user_id,
    post_id: postComment.post_id,
    created_at: postComment.created_at,
    updated_at: postComment.updated_at,
    comment: postComment.comment,
    user: {
      id: postComment.user.id,
      name: postComment.user.name,
      avatar: postComment.user.avatar
        ? `${Bun.env.STORAGE_BASE_URL}/storage/profile/${postComment.user.avatar}`
        : null,
    },
  }));
}

export function toPostCommentResponse(
  postComment: post_comment
): PostCommentResponse {
  return {
    id: postComment.id,
    user_id: postComment.user_id,
    post_id: postComment.post_id,
    created_at: postComment.created_at,
    updated_at: postComment.updated_at,
    comment: postComment.comment,
  };
}
