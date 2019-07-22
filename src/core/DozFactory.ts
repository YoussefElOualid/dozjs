import {$query, db, Queriesql, routerMapping} from "./UtilsMapper";
import {DBLogger, QueryLogger, RouterLogger, ServerRunLogger} from "./Logger";
import {QueryVO} from "./model/QueryVO";
const bodyParser = require('body-parser');


const express = require('express')
const app = express()

export class DozFactory {
    constructor() {}
    private buildApp() {
        Object.keys(routerMapping).forEach((data, i) => {
            const { Function, type, className } = routerMapping[data];
            const apiUri = [className, '_', type, '_'].join('');
            const uri = data.replace(apiUri, '')
            /**
             * @Using BodyParser
             */
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({ extended: true }));
            /**
             * @SetType [GET, POST, PUT, DELETE, ....]
             * @Api [${uri}]
             * @Function [${Function.value}]
             */

            const routeQuery = [className, Function.value.name].join('_');
            app[type](uri, (req, res) => {
                this.buildQuery(req, Queriesql[routeQuery]).then((queries) => {
                    Function.value.apply(Function.value.name, [req, res, queries])
                })
            })
            /**
             * Router & Query Logger
             * */
            RouterLogger(type.toUpperCase(), uri);
            QueryLogger(Function.value.name, Queriesql[routeQuery]);

        })
    }
    private async buildQuery(req, query) {
        if(query) {
            const params: QueryVO = {query: query, results: [], err: [], params: {}}
            const vars   = query.match(/[:|$|?]{1,1}[a-zA-z0-9-_]*\b/g);
            if(vars) {
                vars.forEach(e => {
                    const id = e.replace(/[:|$|?]{1,1}/g, '');
                    params.params[e] = (req.params[id] || req.body[id]) || req.query[id];
                    params['query'] = params['query'].replace(e, params.params[e]);
                });
            }
            try {
                params['results'] = await $query(params['query']);
            }
            catch (e) {
                params['err'] = e;
                DBLogger(e.sqlMessage, 'red')
            }
          return params;
        }
    }
    load(module) {
        return this;
    }
    useSwagger(uri) {
        app.get(['/', uri].join(''), (req, res) => {
            res.json({
                swagger: 'Coming Soon ...'
            })
        })
    }
    enableCros() {
        app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            );
            res.header('DozJS', '1.0.0');

            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                const e = {};
                e[req.method] = '<= Methode not allowed'
                return res.status(200).json(e);
            }
            next();
        });
    }
    listen(port) {
        this.buildApp();
        app.listen(port)
        ServerRunLogger('locahost', port)
    }
}
