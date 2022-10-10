"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const Const_1 = require("./utils/Const");
const bodyParser = require("body-parser");
const winston = require("winston");
winston.configure({
    transports: [new winston.transports.File({ filename: 'log/logger.log' })],
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    });
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Guihon job')
        .setDescription('')
        .setVersion('0.0.1')
        .addTag('guihon, job')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    await app.listen(Const_1.APP_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map