import { Request, Response } from 'express';
import Activity from '../models/Activity';

class ActivityController {

   async list(req: Request, res: Response) {
      const data = await Activity.find({});
      return res.json(data);
   }

   async create(req: Request, res: Response) {
      const data = await Activity.create(req.body);
      return res.json(data);
   }

   async update(req: Request, res: Response) {
      const { _id, name, deadline, subject } = req.body

      const data = await Activity.updateOne({ _id: _id }, { $set: { name: name, deadline: deadline, subject: subject } });
      return res.json(data)
   }

   async delete(req: Request, res: Response) {
      const { _id } = req.body

      const data = await Activity.deleteOne({ _id: _id });
      return res.json(data)
   }
}

export default new ActivityController();