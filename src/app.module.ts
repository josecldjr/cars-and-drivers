import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connection } from './config/database';
import { DriverModule } from './module/driver/driver.module';
import { CarModule } from './module/car/car.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connection),
    DriverModule,
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
