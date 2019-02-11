import { Request, Response } from 'express';
import Order from '../models/OrderModel';

export default class OrderController {
    public getOrders(req: Request, res: Response) {
        Order.find({}, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }
    public addNewOrder(req: Request, res: Response) {
        new Order(req.body).save((err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }
}
