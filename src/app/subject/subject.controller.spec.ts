import { Test, TestingModule } from '@nestjs/testing';
import { ObjectController } from './subject.controller';
import { AppSubjectService } from './subject.service';

describe('ObjectController', () => {
  let controller: ObjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectController],
      providers: [AppSubjectService],
    }).compile();

    controller = module.get<ObjectController>(ObjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
