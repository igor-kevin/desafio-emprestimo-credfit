import { Test, TestingModule } from '@nestjs/testing';
import { RepresentantesController } from './representantes.controller';
import { RepresentantesService } from './representantes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Representante } from './entities/representante.entity';
import { Repository } from 'typeorm';
import { CreateRepresentanteDto } from './dto/create-representante.dto';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('RepresentantesController', () => {
  let controller: RepresentantesController;
  let service: RepresentantesService;
  const mockRepresentantesService = {
    create: jest.fn(dto => {
      return {
        ...dto,
        representante_id: 1,
        funcionario: new Funcionario()
      }
    }),
    findAll: jest.fn(() => {
      return [
        {
          representante_id: 1,
          representante_cnpj: 12,
          representante_razao_social: 'Empresa 1 Teste',
          funcionario: new Funcionario()
        },
        {
          representante_id: 2,
          representante_cnpj: 9,
          representante_razao_social: 'Empresa 2 Teste',
          funcionario: new Funcionario()
        }
      ]

    }),
    findOne: jest.fn(id => {
      if (id == 1) {
        return {
          representante_id: 1,
          representante_cnpj: 12,
          representante_razao_social: 'Empresa 1',
          funcionario: new Funcionario()
        };
      } else {
        throw new NotFoundException(`Não achou o representante de id #${id}`);
      }
    })


  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepresentantesController],
      providers: [
        {
          provide: RepresentantesService,
          useValue: mockRepresentantesService
        },
        {
          provide: getRepositoryToken(Representante),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<RepresentantesController>(RepresentantesController);
    service = module.get<RepresentantesService>(RepresentantesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('Testes do create', () => {
    it('Deve criar um representante', async () => {
      const createDto: CreateRepresentanteDto = {
        representante_cnpj: 1,
        representante_razao_social: 'Empresa muito teste'
      };
      const expectedResponse = {
        representante_id: expect.any(Number),
        representante_cnpj: 1,
        representante_razao_social: 'Empresa muito teste',
        funcionario: expect.any(Funcionario)
      };

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResponse);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });

    it('Deve lançar um erro de conflito se já existir um representante com o mesmo CNPJ', async () => {
      const createDto: CreateRepresentanteDto = {
        representante_cnpj: 12345678901234,
        representante_razao_social: 'Empresa teste',
      };

      mockRepresentantesService.create.mockRejectedValueOnce(new ConflictException('Já existe um representante com esses dados.'));
      await expect(controller.create(createDto)).rejects.toThrow(ConflictException);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });
  describe('Teste do FindAll', () => {
    it('Deve retornar todos os represntates', async () => {
      const respostaEsperada = [
        {
          representante_id: expect.any(Number),
          representante_cnpj: 12,
          representante_razao_social: 'Empresa 1 Teste',
          funcionario: expect.any(Funcionario)
        },
        {
          representante_id: 2,
          representante_cnpj: 9,
          representante_razao_social: 'Empresa 2 Teste',
          funcionario: expect.any(Funcionario)
        }
      ];
      const resultado = await controller.findAll();

      expect(resultado).toEqual(respostaEsperada);
      expect(service.findAll).toHaveBeenCalled();
    })
  }
  );
  describe('Teste do FindAll', () => {
    it('Tem que retornar um representante dado seu id', async () => {
      const respostaEsperada = {
        representante_id: 1,
        representante_cnpj: 12,
        representante_razao_social: 'Empresa 1',
        funcionario: expect.any(Funcionario)
      };
      const result = await controller.findOne('1');
      expect(result).toEqual(respostaEsperada);
      expect(service.findOne).toHaveBeenCalledWith(1);
    })
  });
});
