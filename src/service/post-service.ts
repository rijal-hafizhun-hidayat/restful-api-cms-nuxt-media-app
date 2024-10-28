import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toActivityPostUser,
  toPostResponse,
  toPostResponseArray,
  type ActivityPostResponse,
  type PostCount,
  type PostResponse,
} from "../model/post-model";

export class PostService {
  static async getPostByUserId(userId: number): Promise<PostResponse[]> {
    const posts = await prisma.post.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: true,
        _count: {
          select: {
            post_like: true,
            post_comment: true,
          },
        },
      },
    });

    return toPostResponseArray(posts);
  }

  static async getActivityPostByUserId(
    userId: number
  ): Promise<ActivityPostResponse[]> {
    const activityPosts = await prisma.post.findMany({
      where: {
        user_id: userId,
      },
      include: {
        _count: {
          select: {
            post_like: true,
            post_comment: true,
          },
        },
      },
    });

    return toActivityPostUser(activityPosts);
  }

  static async destroyPostByPostId(postId: number): Promise<PostResponse> {
    const isPostExist = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!postId) {
      throw new ErrorResponse(404, "post not exist");
    }

    const [deletedPost] = await prisma.$transaction([
      prisma.post.delete({
        where: {
          id: postId,
        },
      }),
    ]);

    return toPostResponse(deletedPost);
  }
}
