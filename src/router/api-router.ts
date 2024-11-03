import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { PostController } from "../controller/post-controller";
import { PostCommentController } from "../controller/post-comment-controller";
import { RoleController } from "../controller/role-controller";
import { UserRoleController } from "../controller/user-role-controller";
import { AuthController } from "../controller/auth-controller";

const apiRouter = express();

apiRouter.use(authMiddleware);

apiRouter.get("/api/me", AuthController.currentUser);

apiRouter.get("/api/user", UserController.getAllUser);
apiRouter.delete("/api/user/:userId", UserController.destroyUserByUserId);
apiRouter.get("/api/user/:userId", UserController.findUserByUserId);
apiRouter.put("/api/user/:userId", UserController.updateUserByUserId);
apiRouter.get("/api/user/:userId/detail", UserController.getDetailUserByUserId);
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
apiRouter.post("/api/role", RoleController.storeRole);
apiRouter.get("/api/role/:roleId", RoleController.findRoleByRoleId);
apiRouter.delete("/api/role/:roleId", RoleController.destroyRoleByRoleId);
apiRouter.put("/api/role/:roleId", RoleController.updateRoleByRoleId);
apiRouter.get("/api/role/:roleId/user", RoleController.getRoleByRoleId);

apiRouter.post("/api/user_role", UserRoleController.storeUserRole);

export { apiRouter };
