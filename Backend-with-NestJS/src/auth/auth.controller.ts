import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { User } from 'src/pkg/decorator/user.decorator';
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard';
import { LocalAuthGuard } from '../pkg/guard/local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateMeDto } from './dto/update-me.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('/sign-in')
  @UseGuards(LocalAuthGuard)
  signIn(@User() user: UserEntity) {
    return this.authService.createSession(user);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  me(@User() user: UserEntity) {
    return user;
  }

  @Patch(':id/update')
  @UseGuards(JwtAuthGuard)
  updateMe(
    @Param('id') id: string,
    @Body() updateMeDto: UpdateMeDto,
  ): Promise<UserEntity> {
    return this.authService.updateMe(id, updateMeDto);
  }

  @Delete(':id/delete')
  @UseGuards(JwtAuthGuard)
  deleteMe(@Param('id') id: string): Promise<UserEntity> {
    return this.authService.deleteMe(id);
  }
}
