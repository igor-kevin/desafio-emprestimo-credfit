import { Test, TestingModule } from '@nestjs/testing';
import { RepresentantesService } from './representantes.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Representante } from './entities/representante.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateRepresentanteDto } from './dto/create-representante.dto';
import { UpdateRepresentanteDto } from './dto/update-representante.dto';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';

describe('RepresentantesService', () => {
  let service: RepresentantesService;
  let repository: Repository<Representante>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepresentantesService,
        {
          provide: getRepositoryToken(Representante),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RepresentantesService>(RepresentantesService);
    repository = module.get<Repository<Representante>>(getRepositoryToken(Representante));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve retornar ConflictException  ao criar representante com o mesmo CNPJ ou razao social que já exista', async () => {
      const createDto: CreateRepresentanteDto = {
        representante_cnpj: 12345678901234,
        representante_razao_social: 'Test Representante',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(new Representante());

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    });

    it('deve criar um novo representante', async () => {
      const createDto: CreateRepresentanteDto = {
        representante_cnpj: 12345678901234,
        representante_razao_social: 'Test Representante',
      };

      const representante = new Representante();
      representante.representante_cnpj = createDto.representante_cnpj;
      representante.representante_nome_social = createDto.representante_razao_social;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'create').mockReturnValue(representante);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(representante);

      const resultado = await service.create(createDto);

      expect(resultado).toEqual(representante);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(representante);
    });
  });

  describe('findAll', () => {
    it('Deve retornar uma lista de Representantes', async () => {
      const representantes = [new Representante(), new Representante()];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(representantes);

      const resultado = await service.findAll();

      expect(resultado).toEqual(representantes);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar um representante com o id', async () => {
      const representante = new Representante();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(representante);

      const reulstado = await service.findOne(1);

      expect(reulstado).toEqual(representante);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { representante_id: 1 } });
    });


    it('should throw a NotFoundException if no representante is found', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new NotFoundException(`Não achou o representante de id #${1}`));

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve lançar NotFoundException se não encontrar o representante', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new NotFoundException(`Não achou o representante de id #${1}`))

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });

    it('deve atualizar e retornar o representante com os novos valores', async () => {
      const representante = new Representante();
      const updateDto: UpdateRepresentanteDto = { representante_cnpj: 12345678901234 };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(representante);
      jest.spyOn(repository, 'create').mockReturnValue({ ...representante, ...updateDto });
      jest.spyOn(repository, 'save').mockResolvedValueOnce({ ...representante, ...updateDto });

      const resultado = await service.update(1, updateDto);

      expect(resultado).toEqual({ ...representante, ...updateDto });
      expect(repository.findOne).toHaveBeenCalledWith({ where: { representante_id: 1 } });
      expect(repository.create).toHaveBeenCalledWith({ ...representante, ...updateDto });
      expect(repository.save).toHaveBeenCalledWith({ ...representante, ...updateDto });
    });

    it('deve throw ConflictException se já tem cnpj durante o update', async () => {
      const funcionario: Funcionario = {
        funcionario_id: 0,
        funcionario_nome: 'Teste',
        funcionario_cpf: 0,
        funcionario_email: 'teste@teste',
        funcionario_senha: 'teste',
        funcionario_salario: 0,
        emprestimo: [],
        empresa: new Representante
      };
      const representante: Representante = {
        representante_cnpj: 12,
        representante_id: 1,
        representante_nome_social: 'Nome Teste',
        funcionario: funcionario
      } as Representante;
      const representanteTeste: Representante = {
        representante_cnpj: 13,
        representante_id: 1,
        representante_nome_social: 'Nome Teste',
        funcionario: funcionario
      } as Representante;

      const updateDto: UpdateRepresentanteDto = { representante_cnpj: 12 };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(representanteTeste);
      jest.spyOn(repository, 'create').mockReturnValue({ ...representanteTeste, ...updateDto });
      jest.spyOn(repository, 'save').mockRejectedValueOnce({ code: '23505' });

      await expect(service.update(1, updateDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('deve remover o representante caso encontre', async () => {
      const funcionario: Funcionario = {
        funcionario_id: 0,
        funcionario_nome: 'Teste',
        funcionario_cpf: 0,
        funcionario_email: 'teste@teste',
        funcionario_senha: 'teste',
        funcionario_salario: 0,
        emprestimo: [],
        empresa: new Representante
      };
      const representante: Representante = {
        representante_cnpj: 12,
        representante_id: 1,
        representante_nome_social: 'Nome Teste',
        funcionario: funcionario  // Atribuindo a instância de Funcionario
      } as Representante;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(representante)
      jest.spyOn(repository, 'remove').mockResolvedValueOnce(undefined);

      await service.remove(1);

      expect(repository.remove).toHaveBeenCalledWith(representante);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { representante_id: 1 } });
    }),
      it('should throw a NotFoundException if no representante is found', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

        await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      });
  });
});
