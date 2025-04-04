import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    try {

      const { id, emails, displayName, photos } = profile;
      const user = {
        id,
        email: emails?.[0]?.value || null,
        name: displayName,
        profilePicture: photos?.[0]?.value || null,
      };
      const jwt = await this.authService.validateUser(user, 'google');

      done(null, jwt);
    } catch (error) {
      console.error('Google Auth Error:', error);
      done(error, false);
    }
  }
}
