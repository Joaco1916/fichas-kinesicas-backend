import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Fichas kinesicas API')
        .addBearerAuth()
        .setDescription(
            'Esta API se creo con NestJS para mi proyecto final de IAW - Joaquín Rodriguez (LU:108641)'
        )
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/', app, document);
};