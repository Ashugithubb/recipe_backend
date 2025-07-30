import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1753860049694 implements MigrationInterface {
    name = 'Tables1753860049694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "recipeId" integer, "userId" integer, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "favorites"`);
        await queryRunner.query(`CREATE TYPE "public"."recipes_difficultylevel_enum" AS ENUM('Easy', 'Medium', 'Hard')`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "difficultyLevel" "public"."recipes_difficultylevel_enum" NOT NULL DEFAULT 'Easy'`);
        await queryRunner.query(`CREATE TYPE "public"."recipes_category_enum" AS ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Beverage')`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "category" "public"."recipes_category_enum" NOT NULL DEFAULT 'Dinner'`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "imageUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_13469711425f498cae5e6faa6a8" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_13469711425f498cae5e6faa6a8"`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "imageUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."recipes_category_enum"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "difficultyLevel"`);
        await queryRunner.query(`DROP TYPE "public"."recipes_difficultylevel_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "favorites" text`);
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
