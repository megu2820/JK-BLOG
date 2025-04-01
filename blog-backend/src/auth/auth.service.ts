import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService
  ) {}
  
  async validateUser(profile: any, provider: 'google' | 'facebook'): Promise<{ access_token: string }> {
    let user;
  
    if (profile.email) {
      user = await this.userService.userRepository.findOne({ where: { email: profile.email } });
    }
  
    if (!user && provider === 'facebook') {
      user = await this.userService.userRepository.findOne({ where: { facebookId: profile.id } });
    } else if (!user && provider === 'google') {
      user = await this.userService.userRepository.findOne({ where: { googleId: profile.id } });
    }
    if (!user) {
      user = this.userService.userRepository.create({
        email: profile.email || null, 
        googleId: provider === 'google' ? profile.id : null,
        facebookId: provider === 'facebook' ? profile.id : null,
        name: profile.name,
        profilePicture: profile.profilePicture || null,
      });
  
      await this.userService.userRepository.save(user);
    }
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET')
    });
  
    return { access_token: token };
  }
  
  
}
