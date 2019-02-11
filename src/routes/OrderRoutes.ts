import Router from 'express';
import OrderController from '../controllers/OrderController';
import UserController from '../controllers/UserController';

export default class OrderRoutes {

    private orderController = new OrderController();
    private userController = new UserController();
    private router = Router();
    public init() {

        this.router.route('/orders')
        .get(this.userController.isAuthorized, this.orderController.getOrders)
        .post(this.userController.isAuthorized, this.orderController.addNewOrder);

        this.router.route('/orders/:productId')
        .get(this.userController.isAuthorized, this.orderController.getOrders);

        /* TODO:
        .put(this.orderController.updateOrder)
        .delete(this.orderController.deleteOrder); 
        */

        return this.router;
    }
}
