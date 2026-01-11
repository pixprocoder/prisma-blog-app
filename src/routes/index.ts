import express from "express";
import { postRouters } from "../modules/post/post.route";
import { commentRouters } from "../modules/comment/comment.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/posts",
    route: postRouters,
  },
  {
    path: "/comments",
    route: commentRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
