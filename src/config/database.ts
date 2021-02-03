import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { Allocation } from "../entity/allocation.entity";
import { Driver } from "../entity/driver.entity";
import { Vehicle } from "../entity/vehicle.entity";
import { databaseHost, databaseUser, databasePassword, databaseName, databasePort, appEnviromentStage } from "./env-vars";

export const connection: MysqlConnectionOptions = {
    type: 'mysql',
    host: databaseHost,
    username: databaseUser,
    password: databasePassword,
    database: databaseName,
    port: databasePort,
    synchronize: true,
    entities: [Vehicle, Driver, Allocation],
    logging: (appEnviromentStage === 'dev'),
    cache: true,
}
