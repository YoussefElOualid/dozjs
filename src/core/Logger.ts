import chalk from 'chalk';
export const logger = chalk;
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('.dozjs.json'));
const FrameworkName = 'DozJs';
const nameApp = (config.name + ':' + config.version || '0.0.1');

export const RouterLogger = (ClassModule, routeLink) => {
    console.log(logger.green(`[${FrameworkName}: ${nameApp}] [RouterMapper]: [${new Date().toJSON().slice(0,10)}]: ${ClassModule} : "${routeLink}"`));
}

export const DBLogger = (config, type='yellow') => {
    let msg = ''
    switch (type) {
        case 'red': msg = `[${FrameworkName}: ${nameApp}] [Database]: [${new Date().toJSON().slice(0,10)}]: Except Query : ${config}`; break;
        case 'yellow': msg = `[${FrameworkName}: ${nameApp}] [Database]: [${new Date().toJSON().slice(0,10)}]: ${config.database}`; break;
    }
    console.log(logger[type](msg));
}

export const QueryLogger = (ClassModule, routeLink) => {
    console.log(logger.blue(`[${FrameworkName}: ${nameApp}] [Query]: [${new Date().toJSON().slice(0,10)}]: ${JSON.stringify(ClassModule)} {"${routeLink}"}`));
}

export const ServerRunLogger = (host, port) => {
    console.log(logger.greenBright(`[${FrameworkName}: ${nameApp}] [Server]:\x00\x00\x00[${new Date().toJSON().slice(0,10)}]: App listening at http://${host}:${port}`));
}
