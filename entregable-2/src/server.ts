import "reflect-metadata";
import { AppDataSource } from "../ormconfig";
import app from "./app";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error("Database connection error", err));