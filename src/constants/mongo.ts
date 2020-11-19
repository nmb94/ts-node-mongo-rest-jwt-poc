const dev = {
    DOMAIN: `localhost`,
    PORT: `27017`,
    DB: `poc`
};
const staging = {
    DOMAIN: `192.168.1.2`,
    PORT: `123`,
    DB: `poc`
};
const prod = {
    DOMAIN: `192.168.1.2`,
    PORT: `123`,
    DB: `poc`
};

const env = process.argv[process.argv.length - 1];

export const MONGO_DB =
    env == `staging` ? staging.DB : env == `production` ? prod.DB : dev.DB;
export const MONGO_DOMAIN =
        env == `staging`
            ? staging.DOMAIN
            : env == `production`
                ? prod.DOMAIN
                : dev.DOMAIN;
export const MONGO_PORT =
        env == `staging`
            ? staging.PORT
            : env == `production`
                ? prod.PORT
                : dev.PORT;