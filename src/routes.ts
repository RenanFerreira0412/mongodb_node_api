import { Router } from "express";
import UserController from "./app/controllers/UserController";

const router = Router();

//Criando rotas para /user
router.get("/user", UserController.list);
router.post("/user", UserController.create);
router.put("/user", UserController.update);
router.delete("/user", UserController.delete);



export default router;