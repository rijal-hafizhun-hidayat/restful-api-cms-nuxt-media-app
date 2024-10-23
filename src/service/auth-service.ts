import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import type { LoginRequest } from "../model/auth-model";
import { TokenUtils } from "../utils/token-utils";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async login(request: LoginRequest): Promise<string> {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.loginValidation,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "email or password is wrong");
    }

    const isPasswordMatch = await Bun.password.verify(
      requestBody.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new ErrorResponse(404, "email or password is wrong");
    }

    const token = await TokenUtils.generateToken(user);

    return token;
  }
}
