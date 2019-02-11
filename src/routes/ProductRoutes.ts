import Router from 'express';
import ProductController from '../controllers/ProductController';
import UserController from '../controllers/UserController';

export default class ProductRoutes {

    private productController = new ProductController();
    private userController = new UserController();
    private router = Router();
    public init() {

        this.router.route('/products')
        .get(this.userController.isAuthorized, this.productController.getProducts)
        .post(this.userController.isAuthorized, this.productController.addNewProduct);

        this.router.route('/products/:productId')
        .get(this.userController.isAuthorized, this.productController.getProductWithId)
        .put(this.userController.isAuthorized, this.productController.updateProduct)
        .delete(this.userController.isAuthorized, this.productController.deleteProduct);

        return this.router;
    }
}
