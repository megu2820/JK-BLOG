import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1743243066303 implements MigrationInterface {
    name = 'InitialSchema1743243066303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_7989eba4dafdd5322761765f2b8" UNIQUE ("facebookId")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_7989eba4dafdd5322761765f2b8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookId"`);
    }

}
