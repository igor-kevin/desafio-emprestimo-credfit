import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuncionariosService } from './funcionarios.service';
import { Funcionario } from './entities/funcionario.entity';
import { Representante } from 'src/representantes/entities/representante.entity';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';

describe('FuncionariosService', () => {
  let service: FuncionariosService;
  let funcionarioRepository: Repository<Funcionario>;
  let representanteRepository: Repository<Representante>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FuncionariosService,
        {
          provide: getRepositoryToken(Funcionario),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Representante),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FuncionariosService>(FuncionariosService);
    funcionarioRepository = module.get<Repository<Funcionario>>(getRepositoryToken(Funcionario));
    representanteRepository = module.get<Repository<Representante>>(getRepositoryToken(Representante));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo funcionario', async () => {
      const createFuncionarioDto: CreateFuncionarioDto = {
        funcionario_nome: 'Teste',
        representante_id: 1,
        funcionario_cpf: 0,
        funcionario_email: 'email@teste.com',
        funcionario_senha: 'Senhateste',
        funcionario_salario: 0
      };

      const representante = new Representante();
      representante.representante_id = 1;

      const novoFuncionario = new Funcionario();
      novoFuncionario.funcionario_nome = 'Teste';
      novoFuncionario.empresa = representante;

      jest.spyOn(representanteRepository, 'findOne').mockResolvedValue(representante);
      jest.spyOn(funcionarioRepository, 'create').mockReturnValue(novoFuncionario);
      jest.spyOn(funcionarioRepository, 'save').mockResolvedValue(novoFuncionario);

      expect(await service.create(createFuncionarioDto)).toEqual(novoFuncionario);
      expect(representanteRepository.findOne).toHaveBeenCalledWith({ where: { representante_id: createFuncionarioDto.representante_id } });
      expect(funcionarioRepository.create).toHaveBeenCalledWith({
        funcionario_nome: 'Teste',
        funcionario_cpf: 0,
        funcionario_email: 'email@teste.com',
        funcionario_senha: 'Senhateste',
        funcionario_salario: 0,
        empresa: representante,
      });
      expect(funcionarioRepository.save).toHaveBeenCalledWith(novoFuncionario);
    });

    it('deve throw NotFoundException se não achar nenhum funcionario com o id', async () => {
      const createFuncionarioDto: CreateFuncionarioDto = {
        funcionario_nome: 'Teste',
        representante_id: 1,
        funcionario_cpf: 0,
        funcionario_email: 'email@teste.com',
        funcionario_senha: 'Senhateste',
        funcionario_salario: 0
      };

      jest.spyOn(representanteRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createFuncionarioDto)).rejects.toThrow(new NotFoundException(`Não encontrei o representante com id:${createFuncionarioDto.representante_id}`));
    });

    it('deve throw ConflictException se houver conflito no banco de dados', async () => {
      const createFuncionarioDto: CreateFuncionarioDto = {
        funcionario_nome: 'Teste',
        representante_id: 1,
        funcionario_cpf: 0,
        funcionario_email: 'email@teste.com',
        funcionario_senha: 'Senhateste',
        funcionario_salario: 0
      };
      const representante = new Representante();
      representante.representante_id = 1;

      jest.spyOn(representanteRepository, 'findOne').mockResolvedValue(representante);
      jest.spyOn(funcionarioRepository, 'create').mockReturnValue(new Funcionario());
      jest.spyOn(funcionarioRepository, 'save').mockRejectedValue({ code: '23505' });

      await expect(service.create(createFuncionarioDto)).rejects.toThrow(new ConflictException('Já existe um representante com algum esses dados que eram para ser unique.'));
    });
  });

  describe('getEmpresaDoFuncionario', () => {
    it('deve retornar o id da empresa do funcionario', async () => {
      const representante = new Representante();
      representante.representante_id = 1;
      const funcionario = new Funcionario();
      funcionario.empresa = representante;

      jest.spyOn(representanteRepository, 'findOne').mockResolvedValue(representante);

      expect(await service.getEmpresaDoFuncionario(funcionario)).toEqual(representante.representante_id);
      expect(representanteRepository.findOne).toHaveBeenCalledWith({ where: { representante_id: representante.representante_id } });
    });

    it('deve throw NotFoundException se não achar o representante', async () => {
      const funcionario = new Funcionario();
      funcionario.empresa = new Representante();
      funcionario.empresa.representante_id = 1;

      jest.spyOn(representanteRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getEmpresaDoFuncionario(funcionario)).rejects.toThrow(new NotFoundException(`Não encontrei o representante com id:${funcionario.empresa.representante_id}`));
    });
  });

});
