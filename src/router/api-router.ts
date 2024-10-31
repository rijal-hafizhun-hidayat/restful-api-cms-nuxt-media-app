import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { MeController } from "../controller/me-controller";
import { UserController } from "../controller/user-controller";
import { PostController } from "../controller/post-controller";
import { PostCommentController } from "../controller/post-comment-controller";
import { RoleController } from "../controller/role-controller";
import { UserRoleController } from "../controller/user-role-controller";

const apiRouter = express();

apiRouter.use(authMiddleware);

apiRouter.get("/api/me", MeController.test);

apiRouter.get("/api/user", UserController.getAllUser);
apiRouter.delete("/api/user/:userId", UserController.destroyUserByUserId);
apiRouter.get("/api/user/:userId", UserController.getDetailUserByUserId);
apiRouter.patch(
  "/api/user/:userId/is_active",
  UserController.updateIsActiveUser
);
apiRouter.patch(
  "/api/user/:userId/verif",
  UserController.updateEmailVerifiedAtByUserId
);
apiRouter.get("/api/user/:userId/post", PostController.getPostByUserId);
apiRouter.get(
  "/api/user/:userId/activity_post",
  PostController.getActivityPostByUserId
);

apiRouter.delete("/api/post/:postId", PostController.destroyPostByPostId);
apiRouter.post(
  "/api/post/:postId/comment",
  PostCommentController.storeCommentByPostId
);
apiRouter.get(
  "/api/post/:postId/comment",
  PostCommentController.getPostCommentByPostId
);

apiRouter.get("/api/role", RoleController.getAllRole);
apiRouter.get("/api/role/:roleId", RoleController.getRoleByRoleId);
apiRouter.delete("/api/role/:roleId", RoleController.destroyRoleByRoleId);

apiRouter.post("/api/user_role", UserRoleController.storeUserRole);

export { apiRouter };
