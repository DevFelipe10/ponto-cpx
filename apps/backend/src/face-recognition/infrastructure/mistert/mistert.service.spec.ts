import { Test, TestingModule } from '@nestjs/testing';
import { MistertService } from './mistert.service';

describe('MistertService', () => {
  let service: MistertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MistertService],
    }).compile();

    service = module.get<MistertService>(MistertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
