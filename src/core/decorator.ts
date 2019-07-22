import {
    db,
    Moduleimports,
    Queriesql,
    routerMapping,
    setConnectionDataBase,
    setControllerName,
    setRoutingName
} from "./UtilsMapper";
import {QueryLogger} from "./Logger"
import 'core-js/es7/reflect';


export function DataBase(arg: any) {
    return function (target) {
        setConnectionDataBase(arg)
    }
}
export function Controller(arg: any) {
    return function (target) {
        const className = target.constructor.name
        setRoutingName(['get', arg].join('_'), {type: 'get',Function: target.constructor, query: null, className: className})
    }
}

export function Module(arg: any) {
    const { imports } = arg
    imports.forEach((e) => {
        setControllerName(e.name, {controller: e, api: arg, routing: []})
        Moduleimports.push(e);
    });
    return function (target) {
    }
}

export function Get(v?: string) {
    v = (typeof v == "undefined" ? '/' : v)
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        const className = target.constructor.name
        const type = 'get'
        setRoutingName([className, type, v].join('_'), {type,Function: descriptor, query: null, className: className})
    }
}

export function Post(v?: string) {
    v = (typeof v == "undefined" ? '/' : v)
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        const className = target.constructor.name
        const type = 'post'
        setRoutingName([className, type, v].join('_'), {type, Function: descriptor, query: null, className: className})
    }
}

export function Put(v?: string) {
    v = (typeof v == "undefined" ? '/' : v)
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        const className = target.constructor.name
        const type = 'put'
        setRoutingName([className, type, v].join('_'), {type, Function: descriptor, query: null, className: className})
    }
}

export function Delete(v?: string) {
    v = (typeof v == "undefined" ? '/' : v)
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        const className = target.constructor.name
        const type = 'delete'
        setRoutingName([className, type, v].join('_'), {type, Function: descriptor, query: null, className: className})
    }
}


export function Query(p) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        const className = target.constructor.name
        Queriesql[[className, descriptor.value.name].join('_')] = p;
    }
}


export function Param(target: Object, propertyName: string, index: number) {

    // generate metadatakey for the respective method
    // to hold the position of the decorated parameters
    const metadataKey = `log_${propertyName}_parameters`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    }
    else {
        target[metadataKey] = [index];
    }
}
