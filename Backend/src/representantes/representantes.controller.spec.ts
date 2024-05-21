import { Test, TestingModule } from '@nestjs/testing';
import { RepresentantesController } from './representantes.controller';
import { RepresentantesService } from './representantes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Representante } from './entities/representante.entity';
import { Repository } from 'typeorm';
import { CreateRepresentanteDto } from './dto/create-representante.dto';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateRepresentanteDto } from './dto/update-representante.dto';

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
    }),
    update: jest.fn((id, dto) => {
      return {
        ...dto,
        representante_id: id,
        funcionario: new Funcionario()
      };
    }),
    remove: jest.fn((id: number) => {
      if (id === 1) {
        return;
      } else {
        throw new NotFoundException(`Não achou o representante de id #${id}`);
      }
    }),
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
  describe('Teste do FindOne', () => {
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

    it('Tem que retornar um erro por não encontrar', async () => {
      (mockRepresentantesService.findOne as jest.Mock).mockRejectedValueOnce(
        new NotFoundException(`Não achou o representante de id #${1}`),
      );

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);

      expect(service.findOne).toHaveBeenCalledWith(1);
    })
  })

  describe('Testes do update', () => {
    it('Deve atualizar um representante', async () => {
      const updateDto: UpdateRepresentanteDto = {
        representante_cnpj: 2,
        representante_razao_social: 'Empresa atualizada'
      };
      const respostaEsperada = {
        representante_id: 1,
        representante_cnpj: 2,
        representante_razao_social: 'Empresa atualizada',
        funcionario: expect.any(Funcionario)
      };

      const result = await controller.update('1', updateDto);

      expect(result).toEqual(respostaEsperada);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('Deve lançar um NotFoundException se o representante não for encontrado', async () => {
      const updateDto: UpdateRepresentanteDto = {
        representante_cnpj: 2,
        representante_razao_social: 'Empresa atualizada'
      };

      mockRepresentantesService.update.mockRejectedValueOnce(new NotFoundException(`Não achou o representante de id #${1}`));

      await expect(controller.update('1', updateDto)).rejects.toThrow(NotFoundException);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('Deve lançar um ConflictException se houver um conflito de dados únicos', async () => {
      const updateDto: UpdateRepresentanteDto = {
        representante_cnpj: 2,
        representante_razao_social: 'Empresa atualizada'
      };

      mockRepresentantesService.update.mockRejectedValueOnce(new ConflictException('Já existe um representante com algum desses dados que eram para ser unique.'));

      await expect(controller.update('1', updateDto)).rejects.toThrow(ConflictException);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('Testes do delete', () => {
    it('Deve deletar um representante dado seu id', () => {
      controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('Deve lançar um NotFoundException se o representante não for encontrado', () => {
      (mockRepresentantesService.remove as jest.Mock).mockRejectedValueOnce(
        new NotFoundException(`Não achou o representante de id #${2}`),
      );

      expect(controller.remove('2')).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(2);
    });
  });

});

