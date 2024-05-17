import { Test, TestingModule } from '@nestjs/testing';
import { RepresentantesController } from './representantes.controller';
import { RepresentantesService } from './representantes.service';

describe('RepresentantesController', () => {
  let controller: RepresentantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepresentantesController],
      providers: [RepresentantesService],
    }).compile();

    controller = module.get<RepresentantesController>(RepresentantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
