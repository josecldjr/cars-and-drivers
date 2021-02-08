import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { Allocation } from "../entity/allocation.entity";
import { Car } from "../entity/car.entity";
import { Driver } from "../entity/driver.entity";
import { appEnviromentStage, databaseHost, databaseName, databasePassword, databasePort, databaseUser } from "./env-vars";

export const connection: MysqlConnectionOptions = {
    type: 'mysql',
    host: databaseHost,
    username: databaseUser,
    password: databasePassword,
    database: databaseName,
    port: databasePort,
    synchronize: true,
    entities: [Car, Driver, Allocation],
    logging: (appEnviromentStage === 'dev'),
    cache: true,
}
