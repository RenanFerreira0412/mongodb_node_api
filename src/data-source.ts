import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./app/models/User"

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    username: "mongo",
    password: "mongo",
    database: "db_cs_ts_orm_api_2022_renan_igor",
    port: 27017,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
