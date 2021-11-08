import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1636372936988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "users" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "first_name" varchar NOT NULL,
            "last_name" varchar,
            "avatar" varchar,
            "email" varchar UNIQUE NOT NULL,
            "phone" varchar NOT NULL,
            "is_active" boolean NOT NULL DEFAULT false,
            "created_by" uuid,
            "changed_by" uuid,
            "created_at" timestamptz NOT NULL DEFAULT (now()),
            "updated_at" timestamptz NOT NULL DEFAULT (now())
        );
        `);

        await queryRunner.query(`
        CREATE TABLE "local_logins" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "user_id" uuid NOT NULL,
            "password" varchar NOT NULL,
            "email_verified" boolean NOT NULL DEFAULT false
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "social_logins" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "user_id" uuid NOT NULL,
            "provider" varchar NOT NULL,
            "provider_id" varchar NOT NULL,
            "created_at" timestamptz NOT NULL DEFAULT (now()),
            "updated_at" timestamptz NOT NULL DEFAULT (now())
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "roles" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "name" varchar NOT NULL,
            "description" varchar,
            "is_active" boolean NOT NULL DEFAULT true,
            "created_by" uuid,
            "changed_by" uuid,
            "created_at" timestamptz NOT NULL DEFAULT (now()),
            "updated_at" timestamptz NOT NULL DEFAULT (now())
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "objects" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "name" varchar NOT NULL,
            "is_active" boolean NOT NULL DEFAULT true,
            "created_by" uuid,
            "changed_by" uuid,
            "created_at" timestamptz NOT NULL DEFAULT (now()),
            "updated_at" timestamptz NOT NULL DEFAULT (now())
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "departments" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "name" varchar NOT NULL,
            "description" varchar,
            "is_active" boolean NOT NULL DEFAULT true,
            "created_by" uuid,
            "changed_by" uuid,
            "created_at" timestamptz NOT NULL DEFAULT (now()),
            "updated_at" timestamptz NOT NULL DEFAULT (now())
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "users_departments" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "user_id" uuid NOT NULL,
            "department_id" uuid NOT NULL
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "permissions" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "action" varchar NOT NULL,
            "object_id" uuid NOT NULL,
            "condition" json NOT NULL,
            "is_active" boolean NOT NULL DEFAULT true,
            "created_by" uuid,
            "changed_by" uuid,
            "created_at" timestamptz NOT NULL DEFAULT (now()),
            "updated_at" timestamptz NOT NULL DEFAULT (now())
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "roles_permissions" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "role_id" uuid NOT NULL,
            "permission_id" uuid NOT NULL
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "users_roles" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "user_id" uuid NOT NULL,
            "role_id" uuid NOT NULL
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "addresses" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "user_id" uuid NOT NULL,
            "street" text NOT NULL,
            "city" varchar NOT NULL,
            "county" varchar NOT NULL,
            "country" varchar NOT NULL
        );
        `);

        await queryRunner.query(`
        CREATE TABLE "companies" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "name" varchar NOT NULL
          );
        `);

        await queryRunner.query(`
        CREATE TABLE "users_companies" (
            "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
            "user_id" uuid NOT NULL,
            "company_id" uuid NOT NULL
          );
        `);

        await queryRunner.query(`ALTER TABLE "users_departments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "users_departments" ADD FOREIGN KEY ("department_id") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "addresses" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "local_logins" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "social_logins" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "permissions" ADD FOREIGN KEY ("object_id") REFERENCES "objects" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "users_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "users_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "users_companies" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "users_companies" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users CASCADE`);
        await queryRunner.query(`DROP TABLE local_logins CASCADE`);
        await queryRunner.query(`DROP TABLE social_logins CASCADE`);
        await queryRunner.query(`DROP TABLE roles CASCADE`);
        await queryRunner.query(`DROP TABLE objects CASCADE`);
        await queryRunner.query(`DROP TABLE departments CASCADE`);
        await queryRunner.query(`DROP TABLE users_departments CASCADE`);
        await queryRunner.query(`DROP TABLE permissions CASCADE`);
        await queryRunner.query(`DROP TABLE roles_permissions CASCADE`);
        await queryRunner.query(`DROP TABLE users_roles CASCADE`);
        await queryRunner.query(`DROP TABLE addresses CASCADE`);
        await queryRunner.query(`DROP TABLE companies CASCADE`);
        await queryRunner.query(`DROP TABLE users_companies CASCADE`);




    }

}
