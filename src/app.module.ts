import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connection } from './config/database';
import { Allocation } from './entity/allocation.entity';
import { Driver } from './entity/driver.entity';
import { Vehicle } from './entity/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(connection),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
