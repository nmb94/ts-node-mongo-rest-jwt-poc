import { Router } from "express";
import { UserController } from "../controllers/userController";

export class UserRoutes {
    router: Router;
    public userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes(): void {
        this.router.post(`/register`, this.userController.registerUser);
        this.router.post(`/login`, this.userController.authenticateUser);
    }
}