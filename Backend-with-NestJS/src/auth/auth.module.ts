import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from 'src/pkg/config/jwt.config';
import { UserRepository } from 'src/pkg/dal/user/user.repository';
import { JwtStrategy } from 'src/pkg/strategy/jwt.strategy';
import { LocalStrategy } from 'src/pkg/strategy/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (jwtConfig: ConfigType<typeof JwtConfig>) => ({
        signOptions: {
          expiresIn: jwtConfig.life,
        },
        secret: jwtConfig.secret,
      }),
      inject: [JwtConfig.KEY],
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
