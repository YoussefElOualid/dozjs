import {DozFactory} from "./core/DozFactory";
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = new DozFactory().load(AppModule);
    app.enableCros();
    app.useSwagger('api')
    app.listen(2020)
}

bootstrap();
