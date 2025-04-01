import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('🟢 Facebook Profile:', profile);
  
    const { id, name } = profile;

    if (!name) {
      throw new Error('Name is required');
    }
  
    const user = {
      id,
      email: profile.emails?.[0]?.value || null, 
      name: name?.givenName || name?.familyName ? `${name.givenName} ${name.familyName}`.trim() : null,
      profilePicture: profile.profileUrl || null,
    };
  
    return user; 
  }
  
}
