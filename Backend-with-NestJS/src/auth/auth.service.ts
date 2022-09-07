import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { GenericConfig } from 'src/pkg/config/generic.config';
import { JwtConfig } from 'src/pkg/config/jwt.config';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { UserRepository } from 'src/pkg/dal/user/user.repository';
import { JwtPayload } from 'src/pkg/interface/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @Inject(GenericConfig.KEY)
    private genericConfig: ConfigType<typeof GenericConfig>,
    @Inject(JwtConfig.KEY)
    private jwtConfig: ConfigType<typeof JwtConfig>,
    private jwtService: JwtService,
  ) {}

  public async register(dto: RegisterDto) {
    const hashedPassword = await bcryptjs.hash(
      dto.password,
      this.genericConfig.salt,
    );
    const newUser = this.userRepository.create();
    newUser.username = dto.username;
    newUser.password = hashedPassword;
    // mocking please rewrite this code
    newUser.birthDate = dto.birthDate;
    newUser.bloodGroup = dto.bloodGroup;
    newUser.bmi = dto.bmi;
    newUser.emergencyContact = dto.emergencyContact;
    newUser.emergencyPhoneNum = dto.emergencyPhoneNum;
    newUser.firstName = dto.firstName;
    newUser.lastName = dto.lastName;
    newUser.height = dto.height;
    newUser.idCardNumber = dto.idCardNumber;
    newUser.medicationCondition = dto.medicationCondition;
    newUser.phoneNum = dto.phoneNum;
    newUser.pic = dto.pic;
    newUser.weight = dto.weight;
    const createUserResult = await this.userRepository
      .save(newUser)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
    return createUserResult;
  }

  public async createSession(user: UserEntity) {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: this.jwtConfig.life,
    });

    return {
      accessToken,
    };
  }

  public async validateUser(dto: SignInDto) {
    const user = await this.userRepository.findOne({ username: dto.username });
    if (!user) throw new UnauthorizedException('user_not_found');
    const isMatch = await bcryptjs.compare(dto.password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('username_or_password_invalid');
    return user;
  }

  public async me(id: string) {
    try {
      const user = await this.userRepository.findOne({ id });
      return user;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get Your Data not success'],
      });
    }
  }

  async updateMe(id: string, updateMeDto: UpdateMeDto) {
    try {
      const Me = await this.me(id);
      const {
        firstName,
        lastName,
        idCardNumber,
        birthDate,
        bloodGroup,
        medicationCondition,
        weight,
        height,
        bmi,
        phoneNum,
        emergencyContact,
        emergencyPhoneNum,
        pic,
      } = updateMeDto;
      if (firstName) {
        Me.firstName = firstName;
      }

      if (lastName) {
        Me.lastName = lastName;
      }

      if (idCardNumber) {
        Me.idCardNumber = idCardNumber;
      }

      if (birthDate) {
        Me.birthDate = birthDate;
      }

      if (bloodGroup) {
        Me.bloodGroup = bloodGroup;
      }

      if (medicationCondition) {
        Me.medicationCondition = medicationCondition;
      }

      if (weight) {
        Me.weight = weight;
      }

      if (height) {
        Me.height = height;
      }

      if (bmi) {
        Me.bmi = bmi;
      }

      if (phoneNum) {
        Me.phoneNum = phoneNum;
      }

      if (emergencyContact) {
        Me.emergencyContact = emergencyContact;
      }

      if (emergencyPhoneNum) {
        Me.emergencyPhoneNum = emergencyPhoneNum;
      }

      if (pic) {
        Me.pic = pic;
      }

      await this.userRepository.save(Me);
      return Me;
    } catch (e) {
      throw new NotFoundException({
        message: ['Updating not success'],
      });
    }
  }
  async deleteMe(id: string) {
    try {
      const Me = await this.me(id);
      await this.userRepository.delete(id);
      return Me;
    } catch (e) {
      throw new NotFoundException({
        message: ['Deleting not success'],
      });
    }
  }
}
