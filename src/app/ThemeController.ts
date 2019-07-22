import {Controller, Delete, Get, Post, Put, Query} from "../core/decorator";
import {QueryVO} from "../core/model/QueryVO";

export class ThemeController {
    constructor() {}

    /*@RequestApi("http://google.fr/file.x")*/
    /*@Migarte("theme.json")*/
    @Query('select * from themes')
    @Get('/theme')
    getAll(req, res, query): string {
        return res.json(query);
    }

    @Query('INSERT INTO `themes` (`owner`, `libelle`, `project_id`) VALUES (":owner", ":libelle", :project_id);')
    @Post('/theme')
    Save(req, res, query: QueryVO): string {
        return res.json({healty: (query.err.length == 0)});
    }

    @Query('select * from themes where id in (:id)')
    @Get('/theme/:id')
    findByOne(req, res, query): string {
        return res.json(query);
    }

    @Query('select * from themes where project_id = ":id"')
    @Get('/theme/project/:id')
    findByProjectId(req, res, query: QueryVO): string {
        return res.json(query.results);
    }


    @Query('update themes set libelle=":libelle" where id = ":id"')
    @Put('/theme')
    updateTheme(req, res, query): string {
        return res.json(query);
    }

    @Query('delete from themes where id = ":id"')
    @Delete('/theme/:id')
    deletePosts(req, res, query): string {
        return res.json(query);
    }

}
