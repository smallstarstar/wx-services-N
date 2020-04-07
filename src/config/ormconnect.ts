export let config = {
  mysql: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'store',
    charset: 'utf8mb4',
    entities: "[resolve(`./**/*.entity.ts`)]",
    migrations: "['migration/*.ts']",
    timezone: "UTC",
    multipleStatements: true,
    dropSchema: false,
    synchronize: true,
    logging: true
  },
};
