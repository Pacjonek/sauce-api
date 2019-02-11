import { Request, Response } from 'express';
import Product from '../models/ProductModel';

export default class ProductController {
    public addNewProduct(req: Request, res: Response) {
        new Product(req.body).save((err, product) => {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
    public getProducts(req: Request, res: Response) {
        Product.find({}, (err, product) => {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
    public getProductWithId(req: Request, res: Response) {
        Product.findById(req.params.productId, (err, product) => {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
    public updateProduct(req: Request, res: Response) {
        Product.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true }, (err, product) => {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
    public deleteProduct(req: Request, res: Response) {
        Product.remove({ _id: req.params.productId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.status(204);
        });
    }
}
