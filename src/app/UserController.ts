import {Controller, Delete, Get, Post, Put, Query} from "../core/decorator";
import {QueryVO} from "../core/model/QueryVO";

/*@ParamQuery() err , query, params*/
/*@WebSocket('/')*/
/*@*/
export class UserController {
    constructor() {}

    @Query('select * from employees')
    @Get('/user')
    getAll(req, res, query): string {
        return res.json(query);
    }

    @Query('select * from experts where project_id = :id')
    @Get('/user/project/:id')
    getExpert(req, res, query: QueryVO): string {
        return res.json(query.results);
    }

    @Query('INSERT INTO experts(idexperts, user, project_id) VALUES (:idexperts, ":user", :project_id) ON DUPLICATE KEY UPDATE is_active = !is_active')
    @Post('/user/expert')
    SetExpert(req, res, query): string {
        return res.json(query);
    }

    @Query('insert into employees (`email`) values (":email")')
    @Post('/user')
    Save(req, res, query): string {
        return res.json(query);
    }

    @Query('select * from employees where id = ":id"')
    @Get('/user/:id')
    findByOne(req, res, query): string {
        return res.json(query);
    }

    @Query('delete from employees where id = ":id"')
    @Delete('/user/:id')
    deletePosts(req, res, query): string {
        return res.json(query);
    }

}
