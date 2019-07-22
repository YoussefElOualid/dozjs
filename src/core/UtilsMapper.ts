import {DBLogger} from "./Logger";
const util = require('util');

var mysql = require('mysql');
export const declaration = {};
export const routerMapping = [];
export let Moduleimports = [];
export let Queriesql = {};
export let db: any;
export let $query: any;

export function setConnectionDataBase(connection) {
    const {host, password, user, database} = connection;
    db = mysql.createConnection({host, password, user, database});
    db.connect((err) => {
        if(err) {
            DBLogger(err , 'red')
            process.exit();
        }
        else {
            DBLogger(connection)
            $query = util.promisify(db.query).bind(db);
        }
    })
}
export function setControllerName(className, obj, c?) {
    declaration[className] = (typeof declaration[className] == "undefined" ? {} : declaration[className]);
    declaration[className] = Object.assign(declaration[className], obj)
    if(typeof c != "undefined")
        c(declaration[className]);
}
export function setRoutingName(router, obj, c?) {
    routerMapping[router] = (typeof routerMapping[router] == "undefined" ? {} : routerMapping[router]);
    routerMapping[router] = Object.assign(routerMapping[router], obj)
    if(typeof c != "undefined")
        c(declaration[router]);
}
