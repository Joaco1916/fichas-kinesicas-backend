import {MigrationInterface, QueryRunner} from "typeorm";

export class initialState1638027604490 implements MigrationInterface {
    name = 'initialState1638027604490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(128) NOT NULL, \`roles\` text NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fichas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`diagnostico\` varchar(255) NOT NULL, \`medico_derivante\` varchar(255) NOT NULL, \`estudios_complementarios\` varchar(255) NULL, \`antecedentes\` varchar(255) NULL, \`mecanismo_de_lesion\` varchar(255) NOT NULL, \`antiguedad\` varchar(255) NOT NULL, \`localizacion\` varchar(255) NOT NULL, \`caracteristica\` varchar(255) NOT NULL, \`irradiacion\` varchar(255) NULL, \`atenuacion_agravacion\` varchar(255) NULL, \`observaciones\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`author\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`fichas\` ADD CONSTRAINT \`FK_e601d2bdce9750765e9090c65a5\` FOREIGN KEY (\`author\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fichas\` DROP FOREIGN KEY \`FK_e601d2bdce9750765e9090c65a5\``);
        await queryRunner.query(`DROP TABLE \`fichas\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
