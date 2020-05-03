import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// api文档插件
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许跨域
  app.enableCors();
  // 设置统一的头url
  app.setGlobalPrefix('/api/v1');
  // 验证管道
  const options = new DocumentBuilder()
    .setTitle('服务接口')
    .setDescription('使用nest书写的常用性接口')
    .setVersion('1.0.0')
    .addTag('服务接口')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 访问swagger地址是localhost:9000/swagger;
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(8666);
}
bootstrap();
