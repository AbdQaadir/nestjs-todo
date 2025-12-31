import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clerkMiddleware } from '@clerk/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(process.env.FRONTEND_URL);

  // Apply Clerk middleware globally
  app.use(clerkMiddleware());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
