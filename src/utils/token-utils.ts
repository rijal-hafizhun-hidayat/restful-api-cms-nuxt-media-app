import type { user } from "@prisma/client";
import Jwt from "jsonwebtoken";

export class TokenUtils {
  static async generateToken(user: user): Promise<string> {
    const jwtKey = Bun.env.JWT_KEY as string;
    if (!jwtKey) {
      throw new Error("JWT_KEY is not defined in the environment variables.");
    }

    const token = Jwt.sign(
      {
        userId: user.id,
      },
      jwtKey,
      { expiresIn: "1h" }
    );

    return token;
  }
}
