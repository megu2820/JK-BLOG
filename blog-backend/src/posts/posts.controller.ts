import { Body, Controller, Post, UseGuards, Request, Get, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/users/user.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() body: { title: string; body: string }, @Request() req): Promise<any> {
    return this.postService.createPost(body.title, body.body, req.user as User);
  }

  @UseGuards(JwtAuthGuard) 
  @Get()
  async getAllPosts(@Request() req): Promise<any> {
      return this.postService.getAllPosts(req.user.id); 
  }


  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<any> {
    return this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() body: { title: string; body: string }): Promise<any> {
    return this.postService.updatePost(id, body.title, body.body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<any> {
    return this.postService.deletePost(id);
  }

}
