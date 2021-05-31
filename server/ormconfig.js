// Either make a .env file with these names, or change it to your local db

module.exports = {
  type: "mysql",
  port: 3306,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["db/entity/**/*.ts"],
  migrations: ["db/migration/**/*.ts"],
  subscribers: ["db/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "db/entity",
    migrationsDir: "db/migration",
    subscribersDir: "db/subscriber",
  },
};
