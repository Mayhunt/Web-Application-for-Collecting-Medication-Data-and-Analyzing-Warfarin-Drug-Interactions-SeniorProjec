import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/pkg/dal/question/question.entity';
import { QuestionRepository } from 'src/pkg/dal/question/question.repository';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { CreateQuestionDto } from './dto/create-Question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private questionRepository: QuestionRepository,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
    user: UserEntity,
  ): Promise<QuestionEntity> {
    try {
      const { question, answer } = createQuestionDto;
      const ques = this.questionRepository.create({
        question,
        answer,
        user,
      });
      await this.questionRepository.save(ques);
      return ques;
    } catch (e) {
      throw new NotFoundException({
        message: ['Creating not success'],
      });
    }
  }
  async getQuestions(user: UserEntity): Promise<QuestionEntity[]> {
    try {
      const Questions = await this.questionRepository.find({ where: { user } });
      return Questions;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get data not success'],
      });
    }
  }
}
