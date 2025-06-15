import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToasterController } from './toaster/toaster.controller';

@Module({
  imports: [],
  controllers: [AppController, ToasterController],
  providers: [AppService],
})
export class AppModule {}
