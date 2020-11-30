import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import compression from "compression";

import { MONGO_URI, PORT } from "./constants";
import { ProductRoutes } from "./routes/productRoutes";
import { UserRoutes } from "./routes/userRoutes";

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.setConfig();
        this.mongo();
        this.routes();
    }

    private setConfig() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(cors());
    }

    private mongo() {
        const connection = mongoose.connection;
        connection.on(`connected`, () =>
            console.log(`MongoDB Connection Established`),
        );
        connection.on(`disconnected`, () =>
            console.log(`MongoDB Connection Disconnected`),
        );
        connection.on(`close`, () => console.log(`MongoDB Connection Closed`));
        connection.on(`error`, (error: Error) => {
            console.log(`MongoDB Connection Error:`);
            console.log(error);
        });
        mongoose
            .connect(MONGO_URI,
                {
                    useNewUrlParser: true,
                    keepAlive: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                },
            )
            .catch((error) => console.error(error));
    }

    private routes(): void {
        this.app.use(`/api/user`, new UserRoutes().router);
        this.app.use(`/api/products`, new ProductRoutes().router);
    }

    public start(): void {
        this.app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
    }
}

const server = new Server();

server.start();
