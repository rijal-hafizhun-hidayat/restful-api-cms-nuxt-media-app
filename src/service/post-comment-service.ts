import { prisma } from "../app/database";
import {
  toPostCommentResponse,
  toPostCommentResponseArray,
  type PostCommentRequest,
  type PostCommentResponse,
} from "../model/post-comment-model";
import { PostCommentValidation } from "../validation/post-comment-validation";
import { Validation } from "../validation/validation";

export class PostCommentService {
  static async getPostCommentByPostId(
    postId: number
  ): Promise<PostCommentResponse[]> {
    const postComments = await prisma.post_comment.findMany({
      where: {
        post_id: postId,
      },
      include: {
        user: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return toPostCommentResponseArray(postComments);
  }

  static async storePostComment(
    userId: number,
    postId: number,
    request: PostCommentRequest
  ): Promise<PostCommentResponse> {
    const requestBody: PostCommentRequest = Validation.validate(
      PostCommentValidation.storePostCommentByPostIdValidation,
      request
    );

    const [postComment] = await prisma.$transaction([
      prisma.post_comment.create({
        data: {
          user_id: userId,
          post_id: postId,
          comment: requestBody.comment,
        },
      }),
    ]);

    return toPostCommentResponse(postComment);
  }
}
