import { Request, Response } from 'express';
import User from '../models/User';

class AuthController {
    async login(req: Request, res: Response) {

        const { email, password } = req.body;

        //Verifica a existência do usuário
        const data = await User.find({ email: email, password: password })

        return res.json(data)
    }

    async register(req: Request, res: Response) {
        //Cria um usuário
        const data = await User.create(req.body)
        return res.json(data);
    }
}

export default new AuthController();