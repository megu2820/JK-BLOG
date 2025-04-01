import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) public userRepository: Repository<User>,
    ) {}

    async findOneById(id: number): Promise<User | null> {
      return this.userRepository.findOne({ where: { id } });
    }
}
