import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { PostController } from "../controller/post-controller";
import { PostCommentController } from "../controller/post-comment-controller";
import { RoleController } from "../controller/role-controller";
import { UserRoleController } from "../controller/user-role-controller";
import { AuthController } from "../controller/auth-controller";
import { adminMiddleware } from "../middleware/admin-middleware";
import { NotificationTypeController } from "../controller/notification-type-controller";

const apiRouter = express();

apiRouter.use(authMiddleware);
apiRouter.use(adminMiddleware);

//route auth
apiRouter.get("/api/me", AuthController.currentUser);

//route user
apiRouter.get("/api/user", UserController.getAllUser);
apiRouter.post("/api/user", UserController.storeUser);
apiRouter.get(
  "/api/user/without_user_role",
  UserController.getUserWithoutUserRole
);
apiRouter.delete("/api/user/:userId", UserController.destroyUserByUserId);
apiRouter.get("/api/user/:userId", UserController.findUserByUserId);
apiRouter.put("/api/user/:userId", UserController.updateUserByUserId);
apiRouter.get("/api/user/:userId/detail", UserController.getDetailUserByUserId);
apiRouter.patch("/api/user/:userId/active", UserController.updateIsActiveUser);
apiRouter.patch(
  "/api/user/:userId/verif_email",
  UserController.updateEmailVerifiedAtByUserId
);
apiRouter.get("/api/user/:userId/post", PostController.getPostByUserId);
apiRouter.get(
  "/api/user/:userId/activity_post",
  PostController.getActivityPostByUserId
);

//route post
apiRouter.delete("/api/post/:postId", PostController.destroyPostByPostId);
apiRouter.post(
  "/api/post/:postId/comment",
  PostCommentController.storeCommentByPostId
);
apiRouter.get(
  "/api/post/:postId/comment",
  PostCommentController.getPostCommentByPostId
);

//route role
apiRouter.get("/api/role", RoleController.getAllRole);
apiRouter.post("/api/role", RoleController.storeRole);
apiRouter.get("/api/role/:roleId", RoleController.findRoleByRoleId);
apiRouter.delete("/api/role/:roleId", RoleController.destroyRoleByRoleId);
apiRouter.put("/api/role/:roleId", RoleController.updateRoleByRoleId);
apiRouter.get("/api/role/:roleId/user", RoleController.getRoleByRoleId);

//route user_role
apiRouter.post("/api/user_role", UserRoleController.storeUserRole);
apiRouter.delete(
  "/api/user_role/:roleId/:userId",
  UserRoleController.destroyUserRoleByRoleIdUserId
);

//route notification type
apiRouter.get(
  "/api/notification_type",
  NotificationTypeController.getAllNotificationType
);
apiRouter.post(
  "/api/notification_type",
  NotificationTypeController.storeNotificationType
);
apiRouter.delete(
  "/api/notification_type/:notificationTypeId",
  NotificationTypeController.destroyNotificationTypeByNotificationTypeId
);

export { apiRouter };
