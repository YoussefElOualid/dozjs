import {UserController} from "./app/UserController";
import {DataBase, Module} from "./core/decorator";
import {QuestionController} from "./app/QuestionController";
import {ThemeController} from "./app/ThemeController";
import {ResponseController} from "./app/ResponseController";

@DataBase({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mymessaging"
})
@Module({
    imports: [
        UserController,
        QuestionController,
        ThemeController,
        ResponseController
    ]
})
export class AppModule {}
