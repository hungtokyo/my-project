import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

// const router = Router();
// //Login route
// router.post("/login", AuthController.login);

// //Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);
const auth = [
    {
        method: 'post',
        route: '/login',
        middleware:[],
        action: AuthController.login
    },
    {
        method: 'post',
        route: 'chage-password',
        middleware: [],
        action: AuthController.changePassword
    }

];
export default auth;