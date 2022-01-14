import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { LocalAuthGuard } from "./auth/local-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("Nest API")
    .setDescription("NestJs API example")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}
bootstrap();
