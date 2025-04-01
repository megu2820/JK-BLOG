import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from 'src/users/user.entity';

describe('PostsService', () => {
  let postsService: PostsService;
  let postRepository: Repository<Post>;

  const mockUser: User = {
    id: 1,
    username: 'testUser',
    email: 'test@example.com',
    name: 'Test User',
    profilePicture: 'https://example.com/profile.jpg',
    facebookId: '',
    googleId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    posts: []
  } as User;

  const mockPost: Post = { id: 1, title: 'Test Title', body: 'Test Body', user: mockUser } as Post;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            create: jest.fn().mockReturnValue(mockPost),
            save: jest.fn().mockResolvedValue(mockPost),
            findOne: jest.fn().mockResolvedValue(mockPost),
            createQueryBuilder: jest.fn(() => ({
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue([mockPost]),
            })),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should create a post', async () => {
    const result = await postsService.createPost('Test Title', 'Test Body', mockUser);

    expect(postRepository.create).toHaveBeenCalledWith({
      title: 'Test Title',
      body: 'Test Body',
      user: mockUser,
    });

    expect(postRepository.save).toHaveBeenCalledWith(mockPost);
    expect(result).toEqual(mockPost);
  });

  it('should return all posts for a user', async () => {
    const result = await postsService.getAllPosts(1);

    expect(postRepository.createQueryBuilder).toHaveBeenCalledWith('post');
    expect(result).toEqual([mockPost]);
  });

  it('should return a post by ID', async () => {
    const result = await postsService.getPostById(1);

    expect(postRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['user'],
    });

    expect(result).toEqual(mockPost);
  });

  it('should throw an error if post not found', async () => {
    jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(postsService.getPostById(2)).rejects.toThrow('Post with ID 2 not found');
  });

  it('should update a post', async () => {
    const updatedPost = { ...mockPost, title: 'Updated Title', body: 'Updated Body' };

    jest.spyOn(postRepository, 'save').mockResolvedValue(updatedPost);

    const result = await postsService.updatePost(1, 'Updated Title', 'Updated Body');

    expect(postRepository.save).toHaveBeenCalledWith(updatedPost);
    expect(result).toEqual(updatedPost);
  });

  it('should delete a post', async () => {
    const result = await postsService.deletePost(1);

    expect(postRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toBeUndefined();
  });
});
