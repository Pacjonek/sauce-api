import Router from 'express';
import UserController from '../controllers/UserController';

export default class UserRoutes {

    private userController = new UserController();
    private router = Router();
    public init() {

        this.router.route('/login')
        .post(this.userController.postLogin);

        this.router.route('/register')
        .post(this.userController.addNewUser);

        /* TODO:
        this.router.route('/users')
        .get(this.userController.getUsers)
        .post(this.userController.addNewUser);

        this.router.route('/users')
        .get(this.userController.getUserWithId)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser);
        */

        return this.router;
    }
}
