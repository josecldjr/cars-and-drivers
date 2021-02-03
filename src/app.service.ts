import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entity/driver.entity';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
