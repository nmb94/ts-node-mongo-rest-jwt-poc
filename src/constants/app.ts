const env = process.argv[process.argv.length - 1];
const devPort = `8080`;
const prodPort = `4000`;
const stagingPort = `3000`;

export const PORT =
        env == `staging`
            ? stagingPort
            : env == `production`
                ? prodPort
                : devPort;