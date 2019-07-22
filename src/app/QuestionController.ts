import {Controller, Delete, Get, Post, Put, Query} from "../core/decorator";
import {QueryVO} from "../core/model/QueryVO";

export class QuestionController {
    constructor() {}

    @Query('select qr.*, t.libelle from questions_responses qr left join themes t on t.id = qr.themes_id where  t.project_id = :project_id')
    @Get('/question/project/:project_id')
    getAll(req, res, query: QueryVO): string {
        return res.json(query.results);
    }

    @Query('update questions_responses set prise_en_charge=current_timestamp(), prise_en_charge_by=":user"  where id = :id')
    @Get('/question/setPriseEnCharge/:id/:user')
    setPriseEncharge(req, res, query: QueryVO): string {
        return res.json(query);
    }

    @Query('insert into questions_responses (`email`) values (":email")')
    @Post('/question')
    Save(req, res, query: QueryVO): string {
        return res.json(query);
    }

    @Query('select * from questions_responses where id = ":id"')
    @Get('/question/:id')
    findByOne(req, res, query: QueryVO): string {
        return res.json(query);
    }

    @Query('update questions_responses set prise_en_charge = :date where id = ":id"')
    @Put('/question')
    PriseEnCharge(req, res, query: QueryVO): string {
        return res.json(query);
    }

    @Query('delete from questions_responses where id = ":id"')
    @Delete('/question/:id')
    deletePosts(req, res, query: QueryVO): string {
        return res.json(query);
    }

}
