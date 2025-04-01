import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) public postRepository: Repository<Post>,
    ) {}

    async createPost(title: string, body: string, user: User): Promise<Post> {
        const post = this.postRepository.create({ title, body, user });
        return this.postRepository.save(post);
    }

    async getAllPosts(userId: number): Promise<Post[]> {
        console.log(userId, 'i m the userId')
        return this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user') 
        .where('post.userId = :userId', { userId })
        .getMany();
    }

    async getPostById(id: number): Promise<Post> {
        const post = await this.postRepository.findOne({
          where: { id },
          relations: ['user'],
        });
      
        if (!post) {
          throw new Error(`Post with ID ${id} not found`);
        }
      
        return post;
    }

    async updatePost(id: number, title: string, body: string): Promise<Post> {
        const post = await this.getPostById(id);
        if (!post) throw new Error('Post not found');

        post.title = title;
        post.body = body;
        return this.postRepository.save(post);
    }

    async deletePost(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}
