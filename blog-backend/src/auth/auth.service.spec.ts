import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  const mockJwtService = {
    sign: jest.fn(() => 'mocked-jwt-token'),
  };

  const mockUsersService = {
    findOrCreateUser: jest.fn((profile) => Promise.resolve({ id: 1, ...profile })),
  };

  beforeEach(async () => {
    const mockUserRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User), 
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mocked-secret-key'),
          },
        },
      ],
    }).compile();


    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  
  it('should validate a user and return a JWT token', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      googleId: 'google123',
      facebookId: '',
      name: 'Test User',
      profilePicture: 'profile.jpg',
      posts: []
    };

    jest.spyOn(usersService.userRepository, 'findOne').mockResolvedValue(mockUser);
    jest.spyOn(usersService.userRepository, 'save').mockResolvedValue(mockUser);
    jest.spyOn(jwtService, 'sign').mockReturnValue('mocked-jwt-token');

    const profile = {
      id: 'google123',
      email: 'test@example.com',
      name: 'Test User',
      profilePicture: 'profile.jpg',
    };

    const result = await authService.validateUser(profile, 'google');
    expect(result).toEqual({ access_token: 'mocked-jwt-token' });
  });
});
