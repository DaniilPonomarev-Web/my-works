module.exports = {
  host: process.env.PG_HOST || 'localhost',
  type: 'postgres',
  port: process.env.PG_PORT || 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  logging: process.env.PG_LOG === 'true',
  entities: ['./libs/entities/**/*.entity.ts'],
  migrations: ['db/migrations/*.ts'],
  cli: {
    migrationsDir: 'db/migrations',
  },
  synchronize: process.env.DB_SYNC === 'true',
};
