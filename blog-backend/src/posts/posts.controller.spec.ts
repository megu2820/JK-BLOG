import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/user.entity';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const mockJwtAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            createPost: jest.fn().mockResolvedValue({ id: 1, title: 'Test Title', body: 'Test Body' }),
            getAllPosts: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Title', body: 'Test Body' }]),
            getPostById: jest.fn().mockResolvedValue({ id: 1, title: 'Test Title', body: 'Test Body' }),
            updatePost: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Title', body: 'Updated Body' }),
            deletePost: jest.fn().mockResolvedValue({ message: 'Post deleted successfully' }),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) 
      .useValue(mockJwtAuthGuard)
      .compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should create a post', async () => {
    const mockReq = { user: { id: 1 } };
    const postDto = { title: 'Test Title', body: 'Test Body' };

    const result = await postsController.createPost(postDto, mockReq);

    expect(postsService.createPost).toHaveBeenCalledWith(postDto.title, postDto.body, mockReq.user as User);
    expect(result).toEqual({ id: 1, title: 'Test Title', body: 'Test Body' });
  });

  it('should get all posts for the authenticated user', async () => {
    const mockReq = { user: { id: 1 } };

    const result = await postsController.getAllPosts(mockReq);

    expect(postsService.getAllPosts).toHaveBeenCalledWith(1);
    expect(result).toEqual([{ id: 1, title: 'Test Title', body: 'Test Body' }]);
  });

  it('should get a post by ID', async () => {
    const postId = 1;

    const result = await postsController.getPostById(postId);

    expect(postsService.getPostById).toHaveBeenCalledWith(postId);
    expect(result).toEqual({ id: 1, title: 'Test Title', body: 'Test Body' });
  });

  it('should update a post', async () => {
    const postId = 1;
    const updateDto = { title: 'Updated Title', body: 'Updated Body' };

    const result = await postsController.updatePost(postId, updateDto);

    expect(postsService.updatePost).toHaveBeenCalledWith(postId, updateDto.title, updateDto.body);
    expect(result).toEqual({ id: 1, title: 'Updated Title', body: 'Updated Body' });
  });

  it('should delete a post', async () => {
    const postId = 1;

    const result = await postsController.deletePost(postId);

    expect(postsService.deletePost).toHaveBeenCalledWith(postId);
    expect(result).toEqual({ message: 'Post deleted successfully' });
  });
});
