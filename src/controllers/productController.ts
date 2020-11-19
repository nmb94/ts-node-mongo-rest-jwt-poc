
import { Request, Response } from "express";
import { IProduct, Product } from "../models/product";

export class ProductController {
    public getProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await Product.find();
            res.json({ products });
        } catch (error) {
            console.log(`Error occurred while getting products`);
            console.log(error);
            res.sendStatus(500);
        }
    }

    public getProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await Product.findOne({ productId: req.params.id });
            if (product === null) {
                res.sendStatus(404);
            } else {
                res.json(product);
            }
        } catch (error) {
            console.log(`Error occurred while getting a product`);
            console.log(error);
            res.sendStatus(500);
        }
    }

    public createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const newProduct: IProduct = new Product(req.body);
            const product = await Product.findOne({ productId: req.body.productId });
            if (product === null) {
                const result = await newProduct.save();
                if (result === null) {
                    res.sendStatus(500);
                } else {
                    res.status(201).json({ status: 201, data: result });
                }
    
            } else {
                res.sendStatus(422);
            }
        } catch (error) {
            console.log(`Error occurred while adding a product`);
            console.log(error);
            res.sendStatus(500);
        }
    }

    public updateProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await Product.findOneAndUpdate({ productId: req.params.id }, req.body);
            if (product === null) {
                res.sendStatus(404);
            } else {
                const updatedProduct = { productId: req.params.id, ...req.body };
                res.json({ status: res.status, data: updatedProduct });
            }
        } catch (error) {
            if (error.codeName == `DuplicateKey`) {
                res.sendStatus(422);
            }
            else {
                console.log(`Error occurred while updating a product`);
                res.sendStatus(500);
            }
        }
    }

    public deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await Product.findOneAndDelete({ productId: req.params.id });
            if (product === null) {
                res.sendStatus(404);
            } else {
                res.json({ response: `Product Deleted Successfully` });
            }
        } catch (error) {
            console.log(`Error occurred while deleting a product`);
            console.log(error);
            res.sendStatus(500);
        }
    }
}