import "dotenv/config";

export const PORT = process.env.PORT as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const MONGO_URI = process.env.MONGO_URI as string;