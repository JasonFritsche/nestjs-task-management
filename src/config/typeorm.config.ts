import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number.parseFloat(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [__dirname + '../**/*.entity.ts'],
    synchronize: true
}