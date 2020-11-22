
import { Request, Response } from "express";
import { IProduct, Product } from "../models/product";

export class ProductController {
    public getProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            res.json(await Product.find());
        } catch (error) {
            console.log(`Error occurred while getting products`);
            console.log(error);
            res.sendStatus(500);
        }
    }

    public getProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await Product.findOne({ productId: req.params.id });
            product ? res.json(product) : res.sendStatus(404);
        } catch (error) {
            console.log(`Error occurred while getting a product`);
            console.log(error);
            res.sendStatus(500);
        }
    }

    public createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            if (await Product.findOne({ productId: req.body.productId })) {
                res.sendStatus(422);
            } else {
                const newProduct: IProduct = new Product(req.body);
                const result = await newProduct.save();
                if (result) {
                    res.status(201).json({ status: 201, data: result });
                }
                else {
                    res.sendStatus(500);
                }
            }
        } catch (error) {
            if (error._message == `Product validation failed`) {
                res.sendStatus(422);
            }
            else {
                console.log(`Error occurred while adding a product`);
                console.log(error);
                res.sendStatus(500);
            }
        }
    }

    public updateProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            (await Product.findOneAndUpdate({ productId: req.body.productId }, req.body)) ?
                res.json(await Product.findOne({ productId: req.body.productId })) :
                res.sendStatus(404);
        } catch (error) {
            if (error.codeName == `DuplicateKey`) {
                res.sendStatus(422);
            }
            else {
                console.log(`Error occurred while updating a product`);
                console.log(error);
                res.sendStatus(500);
            }
        }
    }

    public deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            (await Product.findOneAndDelete({ productId: req.body.productId })) ?
                res.json({ response: `Product Deleted Successfully` }) :
                res.sendStatus(404);
        } catch (error) {
            console.log(`Error occurred while deleting a product`);
            console.log(error);
            res.sendStatus(500);
        }
    }
}