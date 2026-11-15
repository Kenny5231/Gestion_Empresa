import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Dev3Module } from './dev3/dev3.module.js';

@Module({
  imports: [Dev3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
