import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gestión Empresa API')
    .setDescription(
      'Documentación de la API del sistema de gestión empresarial.',
    )
    .setVersion('1.0')
    .addTag('Verification Events')
    .addTag('Ledger Transactions')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
