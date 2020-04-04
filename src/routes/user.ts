import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

// const router = Router();

//Get all users
// router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

// // Get one user
// router.get(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   UserController.getOneById
// );

// //Create a new user
// router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

// //Edit one user
// router.patch(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   UserController.editUser
// );

// //Delete one user
// router.delete(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   UserController.deleteUser
// );

const user = [
  {
    method: "get",
    route: "/user",
    middleware: [],
    action: UserController.listAll
  },
  {
    method: "delete",
    route: "/user/:id([0-9]+)",
    middleware: [],
    action: UserController.deleteUser
  },
  {
    method: "post",
    route: "/user/register",
    middleware: [],
    action: UserController.newUser
  },
  {
    method: "put",
    route: "/user/profile/:id",
    middleware: [],
    action: UserController.editUser
  },
  
];
export default user;