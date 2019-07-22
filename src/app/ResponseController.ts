import {Controller, Delete, Get, Param, Post, Put, Query} from "../core/decorator";

export class ResponseController {
    constructor() {}

    @Query('select * from employees')
    @Get('/reponse')
    getAll(req, res, query): string {
        return res.json(query);
    }

    @Query('insertx into employees (`email`) values (":email")')
    @Post('/reponse')
    Save(/*@Param('owner') owner, */req, res, query): string {
        return res.json(query);
    }

    @Query('select * from employees where id = ":id"')
    @Get('/reponse/:id')
    findByOne(req, res, query): string {
        return res.json(query);
    }

    @Query('delete from employees where id = ":id"')
    @Delete('/reponse/:id')
    deletePosts(req, res, query): string {
        return res.json(query);
    }

}
