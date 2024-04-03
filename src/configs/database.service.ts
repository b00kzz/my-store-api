
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm"
import { ConfigService } from '@nestjs/config';

export const databaseProvider = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: process.env.POSTGRES_TYPE as any,
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            })

            return dataSource.initialize()
        }
    }
]





