import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SubjectController from "./app/controllers/SubjectController";
import ActivityController from "./app/controllers/ActivityController";
import AuthController from "./app/controllers/AuthController";

const router = Router();

//Criando rotas para /auth
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

//Criando rotas para /user
router.get("/user", UserController.list);
//router.post("/user", UserController.create);
router.put("/user", UserController.update);
router.delete("/user", UserController.delete);

//Criando rotas para /subject
router.get("/subject", SubjectController.list);
router.post("/subject", SubjectController.create);
router.put("/subject", SubjectController.update);
router.delete("/subject", SubjectController.delete);

//Criando rotas para /activity
router.get("/activity", ActivityController.list);
router.post("/activity", ActivityController.create);
router.put("/activity", ActivityController.update);
router.delete("/activity", ActivityController.delete);

export default router;