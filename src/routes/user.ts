import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";



const user = [
  {
    method: "get",
    route: "/user",
    middleware: [checkJwt, checkRole(["admin"])],
    action: UserController.listAll
  },
  {
    method: "delete",
    route: "/user/:id([0-9]+)",
    middleware: [checkJwt, checkRole(["admin"])],
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
    middleware: [checkJwt, checkRole(["admin"])],
    action: UserController.editUser
  },
  
];
export default user;