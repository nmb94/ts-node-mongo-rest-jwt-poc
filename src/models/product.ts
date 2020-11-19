import { Document, Schema, Model, model } from "mongoose";

export interface IProduct extends Document {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export const productSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

export const Product: Model<IProduct> = model<IProduct>(`Product`, productSchema);