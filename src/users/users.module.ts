import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PetsModule } from '../pets/pets.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PetsModule]
})
export class UsersModule { }
