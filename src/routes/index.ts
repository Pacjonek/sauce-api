import Router from 'express';
import ProductRoutes from './ProductRoutes';
import OrderRoutes from './OrderRoutes';
import UserRoutes from './UserRoutes';

export default class Routes {

    public router = Router();
    private productRoutes = new ProductRoutes();
    private orderRoutes = new OrderRoutes();
    private userRoutes = new UserRoutes();

    public init() {
        this.router.route('/products').all(this.productRoutes.init());
        this.router.route('/orders').all(this.orderRoutes.init());
        this.router.route('*').all(this.userRoutes.init());
        return this.router;
    }
}
