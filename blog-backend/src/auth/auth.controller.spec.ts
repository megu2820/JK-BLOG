import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue({ access_token: 'mock-jwt-token' }),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:3000'),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should redirect to frontend with JWT token after Google login', async () => {
    const frontendUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

    const mockReq = { user: { id: '123', email: 'test@example.com' } };
    const mockRes = { redirect: jest.fn() };

    await authController.googleAuthRedirect(mockReq, mockRes);

    expect(authService.validateUser).toHaveBeenCalledWith(mockReq.user, 'google');
    expect(mockRes.redirect).toHaveBeenCalledWith(`${frontendUrl}/dashboard?token=mock-jwt-token`);
  });

  it('should redirect to frontend with JWT token after Facebook login', async () => {
    const frontendUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    const mockReq = { user: { id: '456', email: 'user@facebook.com' } };
    const mockRes = { redirect: jest.fn() };
  
    await authController.facebookAuthRedirect(mockReq, mockRes);
  
    expect(authService.validateUser).toHaveBeenCalledWith(mockReq.user, 'facebook');
    expect(mockRes.redirect).toHaveBeenCalledWith(`${frontendUrl}/dashboard?token=mock-jwt-token`);
  });
});
