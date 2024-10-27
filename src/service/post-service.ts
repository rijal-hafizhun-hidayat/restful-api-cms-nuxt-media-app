import { prisma } from "../app/database";
import { toPostResponseArray, type PostResponse } from "../model/post-model";

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
}
