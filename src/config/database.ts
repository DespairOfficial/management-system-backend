export const config = {
    dev: {
        driver: process.env.DB_DRIVER,
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    },
};
