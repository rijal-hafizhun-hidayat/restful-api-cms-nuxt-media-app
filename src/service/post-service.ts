import { prisma } from "../app/database";
import {
  toActivityPostUser,
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
}
