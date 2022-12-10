import { Request, Response } from 'express';
import User from "../models/User";

class UserController {

    async list(req: Request, res: Response) {
        const data = await User.find({});
        return res.json(data);
    }

    // async create(req: Request, res: Response) {
    //     const { email, password, confirmPassword } = req.body;

    //     const userCredencial = await User.find({ email: email }).count();

    //     console.log('user email: ' + userCredencial)

    //     if (userCredencial != 0) {
    //         return res.status(409).json({ message: "Esse email já esta sendo utilizado por outro usuário!" });//caso exista um registro, retorna 409 informando o conflito
    //     }

    //     if (confirmPassword != password) {
    //         return res.status(409).json({ message: "Informe a mesma senha!" });
    //     }

    //     const data = await User.create(req.body);
    //     return res.json(data);

    // }

    async update(req: Request, res: Response) {
        const { name, city, state, _id } = req.body;

        const data = await User.updateOne({ _id: _id }, { $set: { name: name, city: city, state: state } }); //persiste (update) os dados no banco.

        return res.json(data);
    }

    async delete(req: Request, res: Response) {
        const { _id } = req.body;

        const data = await User.deleteOne({ _id: _id });

        return res.json(data);
    }

}

export default new UserController();