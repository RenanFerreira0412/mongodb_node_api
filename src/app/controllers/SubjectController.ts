import { Request, Response } from 'express';
import Subject from '../models/Subject';

class SubjectController {

   async list(req: Request, res: Response) {
      const data = await Subject.find({});
      return res.json(data);
   }

   async create(req: Request, res: Response) {
      const data = await Subject.create(req.body);
      return res.json(data);
   }

   async update(req: Request, res: Response) {
      const { name, teacher, _id } = req.body;

      const data = await Subject.updateOne({ _id: _id }, { $set: { name: name, teacher: teacher } });

      return res.json(data);
   }

   async delete(req: Request, res: Response) {
      const { _id } = req.body;

      const data = await Subject.deleteOne({ _id: _id });

      return res.json(data);
   }

}

export default new SubjectController()