import assert from 'assert';
import { Request, Response } from 'express';
import User from "../entity/User";

class UserController {

    async list(req: Request, res: Response) {
        const data = await User.find({});
        return res.json(data);
    }

    async create(req: Request, res: Response) {
        const { email, password, confirmPassword } = req.body;

        const userCredencial = await User.find({ email: email }).count();

        console.log('user email: ' + userCredencial)

        if (userCredencial != 0) {
            return res.status(409).json({ message: "Esse email já esta sendo utilizado por outro usuário!" });//caso exista um registro, retorna 409 informando o conflito
        }

        if (confirmPassword != password) {
            return res.status(409).json({ message: "Informe a mesma senha!" });
        }

        const data = await User.create(req.body);
        return res.json(data);

    }

    async update(req: Request, res: Response) {
        const { name, email, city, state } = req.body;

        const userCredencial = await User.find({ email: email }).count();

        //Se não existe algum usuário com este email
        if (userCredencial == 0) {
            return res.sendStatus(404);
        }

        const data = await User.updateOne({ email: email }, { $set: { name: name, city: city, state: state } }); //persiste (update) os dados no banco.

        return res.json(data);

    }

    async delete(req: Request, res: Response) {
        const { email } = req.body;

        const userCredencial = await User.find({ email: email }).count();

        //Se não existe algum usuário com este email
        if (userCredencial == 0) {
            return res.sendStatus(404);
        } else {
            const data = await User.deleteOne({ email: email });
            return res.json(data);
        }
    }

}

export default new UserController();