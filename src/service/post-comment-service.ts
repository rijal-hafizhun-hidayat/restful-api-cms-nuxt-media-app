import { prisma } from "../app/database";
import {
  toPostCommentResponseArray,
  type PostCommentResponse,
} from "../model/post-comment-model";

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
    });

    return toPostCommentResponseArray(postComments);
  }
}
