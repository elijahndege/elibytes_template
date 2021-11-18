import { Test, TestingModule } from '@nestjs/testing';
import { AppSubjectService } from './subject.service';

describe('ObjectService', () => {
  let service: AppSubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppSubjectService],
    }).compile();

    service = module.get<AppSubjectService>(AppSubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
