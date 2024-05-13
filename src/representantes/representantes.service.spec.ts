import { Test, TestingModule } from '@nestjs/testing';
import { RepresentantesService } from './representantes.service';

describe('RepresentantesService', () => {
  let service: RepresentantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepresentantesService],
    }).compile();

    service = module.get<RepresentantesService>(RepresentantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
