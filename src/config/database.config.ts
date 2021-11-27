import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from 'path';

function typeOrmModuleOptions(): TypeOrmModuleOptions{
    return  {
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: ["dist/**/**.entity{.ts,.js}"],
        autoLoadEntities: true,
        
        migrationsRun: true,
        migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
        migrationsTableName: 'migrations_typeorm',
        cli:{
            migrationsDir: 'src/migration',
        },

        synchronize: false,
        logging: true,
        logger: 'file',
    }
}

export default registerAs('database', () => ({
    config: typeOrmModuleOptions()
}));