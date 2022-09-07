import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { QuestionEntity } from 'src/pkg/dal/question/question.entity';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { User } from 'src/pkg/decorator/user.decorator';
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard';
import { CreateQuestionDto } from './dto/create-Question.dto';
import { QuestionService } from './question.service';

@Controller('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Post()
  createQuestion(
    @User() user: UserEntity,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionService.createQuestion(createQuestionDto, user);
  }

  @Get()
  getQuestions(@User() user: UserEntity): Promise<QuestionEntity[]> {
    // console.log(user);
    return this.questionService.getQuestions(user);
  }
}
