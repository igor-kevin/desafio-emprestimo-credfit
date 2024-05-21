import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimosService } from './emprestimos.service';
import { LogicaEmprestimoService } from './logicaemprestimo.service';
import { Repository } from 'typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { Representante } from 'src/representantes/entities/representante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';

describe('EmprestimosService', () => {
  let service: EmprestimosService;
  let emprestimoRepository: Repository<Emprestimo>;
  let funcionarioRepository: Repository<Funcionario>;
  let representanteRepository: Repository<Representante>;
  let logicaService: LogicaEmprestimoService;




  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmprestimosService, {
        provide: getRepositoryToken(Emprestimo),
        useClass: Repository,
      },
        {
          provide: getRepositoryToken(Funcionario),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Representante),
          useClass: Repository,
        },
        {
          provide: LogicaEmprestimoService,
          useValue: {
            isConveniado: jest.fn(),
            isDentroDoBolso: jest.fn(),
            checkaAprovado: jest.fn(),
            getStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    emprestimoRepository = module.get<Repository<Emprestimo>>(getRepositoryToken(Emprestimo));
    funcionarioRepository = module.get<Repository<Funcionario>>(getRepositoryToken(Funcionario));
    representanteRepository = module.get<Repository<Representante>>(getRepositoryToken(Representante));
    logicaService = module.get<LogicaEmprestimoService>(LogicaEmprestimoService);
    service = module.get<EmprestimosService>(EmprestimosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create:', () => {
    it('Não deve criar o emprestimo se ele não for de uma empresa conveniada', async () => {
      const createEmprestimoDto: CreateEmprestimoDto = {
        valor: 2000,
        parcelas: 4,
        funcionario_id: 1,
      };

      const funcionario: Funcionario = {
        funcionario_id: 1,
        funcionario_nome: 'Teste Funcionario',
        funcionario_cpf: 12,
        funcionario_email: 'func1@teste.com',
        funcionario_senha: 'criptica123',
        funcionario_salario: 5000,
        emprestimo: [],
        empresa: null,
      }

      const emprestimo: Emprestimo = {
        valor: 2000,
        parcelas: 4,
        primeiroPagamento: new Date(),
        emprestimoStatus: 1,
        isEmprestimoEntregue: true,
        funcionario: funcionario,
      } as Emprestimo

      jest.spyOn(funcionarioRepository, 'findOne').mockResolvedValue(funcionario);
      jest.spyOn(logicaService, 'isConveniado').mockReturnValue(true);
      jest.spyOn(logicaService, 'isDentroDoBolso').mockReturnValue(true);
      jest.spyOn(logicaService, 'checkaAprovado').mockResolvedValue(true);
      jest.spyOn(logicaService, 'getStatus').mockResolvedValue(true);
      jest.spyOn(emprestimoRepository, 'create').mockReturnValue(emprestimo as Emprestimo);
      jest.spyOn(emprestimoRepository, 'save').mockResolvedValue(emprestimo as Emprestimo);

      const resultado = await service.create(createEmprestimoDto);

      expect(resultado).toEqual(emprestimo);
      expect(funcionarioRepository.findOne).toHaveBeenCalledWith({ where: { funcionario_id: 1 }, relations: ['empresa'] });
      expect(logicaService.isConveniado).toHaveBeenCalledWith(funcionario);
      expect(logicaService.isDentroDoBolso).toHaveBeenCalledWith(funcionario, 2000 / 100, 4);
      expect(logicaService.checkaAprovado).toHaveBeenCalledWith(funcionario);
      expect(emprestimoRepository.create).toHaveBeenCalledWith(expect.any(Object));
      expect(emprestimoRepository.save).toHaveBeenCalledWith(expect.any(Object));
    })

    it('deve criar um empréstimo com sucesso, dentro dos parâmetros', async () => {
      const createEmprestimoDto: CreateEmprestimoDto = {
        valor: 2000,
        parcelas: 4,
        funcionario_id: 1,
      };

      const funcionario: Funcionario = {
        funcionario_id: 1,
        funcionario_nome: 'Teste Funcionario',
        funcionario_cpf: 12,
        funcionario_email: 'func1@teste.com',
        funcionario_senha: 'criptica123',
        funcionario_salario: 5000,
        emprestimo: [],
        empresa: new Representante(),
      }

      jest.spyOn(funcionarioRepository, 'findOne').mockResolvedValue(funcionario);
      jest.spyOn(logicaService, 'isConveniado').mockReturnValue(true);
      jest.spyOn(logicaService, 'isDentroDoBolso').mockReturnValue(true);
      jest.spyOn(logicaService, 'checkaAprovado').mockResolvedValue(true);
      jest.spyOn(logicaService, 'getStatus').mockResolvedValue(true);
      jest.spyOn(emprestimoRepository, 'create').mockReturnValue({
        createEmprestimoDto,
        funcionario,
        emprestimoStatus: 0,
        isEmprestimoEntregue: true,
        primeiroPagamento: expect.any(Date),
        emprestimo_id: 1,
      } as any);
      jest.spyOn(emprestimoRepository, 'save').mockResolvedValue({
        createEmprestimoDto,
        funcionario: funcionario,
        emprestimoStatus: 0,
        isEmprestimoEntregue: true,
        primeiroPagamento: new Date(),
        emprestimo_id: 1,
      } as any);

      const resultado = await service.create(createEmprestimoDto);

      expect(resultado).toEqual({
        createEmprestimoDto,
        funcionario: funcionario,
        emprestimoStatus: 0,
        isEmprestimoEntregue: true,
        primeiroPagamento: expect.any(Date),
        emprestimo_id: 1
      });

      expect(funcionarioRepository.findOne).toHaveBeenCalledWith({ where: { funcionario_id: 1 }, relations: ['empresa'] });
      expect(logicaService.isConveniado).toHaveBeenCalledWith(funcionario);
      expect(logicaService.isDentroDoBolso).toHaveBeenCalledWith(funcionario, 2000 / 100, 4);
      expect(logicaService.checkaAprovado).toHaveBeenCalledWith(funcionario);
      expect(logicaService.getStatus).toHaveBeenCalled();
      expect(emprestimoRepository.create).toHaveBeenCalledWith(expect.any(Object));
      expect(emprestimoRepository.save).toHaveBeenCalledWith(expect.any(Object));
    })

    it('cria um emprestimo negado por parcela ser muito alta. (+35% do salário)', async () => {
      const createEmprestimoDto: CreateEmprestimoDto = {
        valor: 2000,
        parcelas: 4,
        funcionario_id: 1,
      };

      const funcionario: Funcionario = {
        funcionario_id: 1,
        funcionario_nome: 'Teste Funcionario',
        funcionario_cpf: 12,
        funcionario_email: 'func1@teste.com',
        funcionario_senha: 'criptica123',
        funcionario_salario: 100,
        emprestimo: [],
        empresa: new Representante(),
      }

      jest.spyOn(funcionarioRepository, 'findOne').mockResolvedValue(funcionario);
      jest.spyOn(logicaService, 'isConveniado').mockReturnValue(true);
      jest.spyOn(logicaService, 'isDentroDoBolso').mockReturnValue(false);
      jest.spyOn(emprestimoRepository, 'create').mockReturnValue({
        createEmprestimoDto,
        funcionario,
        emprestimoStatus: 2,
        isEmprestimoEntregue: false,
        primeiroPagamento: expect.any(Date),
        emprestimo_id: 1,
      } as any);
      jest.spyOn(emprestimoRepository, 'save').mockResolvedValue({
        createEmprestimoDto,
        funcionario: funcionario,
        emprestimoStatus: 2,
        isEmprestimoEntregue: false,
        primeiroPagamento: new Date(),
        emprestimo_id: 1,
      } as any);

      const resultado = await service.create(createEmprestimoDto);
      expect(resultado).toEqual({
        createEmprestimoDto,
        funcionario: funcionario,
        emprestimoStatus: 2,
        isEmprestimoEntregue: false,
        primeiroPagamento: expect.any(Date),
        emprestimo_id: 1
      });

      expect(funcionarioRepository.findOne).toHaveBeenCalledWith({ where: { funcionario_id: 1 }, relations: ['empresa'] });
      expect(logicaService.isConveniado).toHaveBeenCalledWith(funcionario);
      expect(logicaService.isDentroDoBolso).toHaveBeenCalledWith(funcionario, 2000 / 100, 4);
      expect(emprestimoRepository.create).toHaveBeenCalledWith(expect.any(Object));
      expect(emprestimoRepository.save).toHaveBeenCalledWith(expect.any(Object));

    })
    it('cria um empréstimo negado por score', async () => {
      const createEmprestimoDto: CreateEmprestimoDto = {
        valor: 2000,
        parcelas: 4,
        funcionario_id: 1,
      };

      const funcionario: Funcionario = {
        funcionario_id: 1,
        funcionario_nome: 'Teste Funcionario',
        funcionario_cpf: 12,
        funcionario_email: 'func1@teste.com',
        funcionario_senha: 'criptica123',
        funcionario_salario: 12000,
        emprestimo: [],
        empresa: new Representante(),
      }

      jest.spyOn(funcionarioRepository, 'findOne').mockResolvedValue(funcionario);
      jest.spyOn(logicaService, 'isConveniado').mockReturnValue(true);
      jest.spyOn(logicaService, 'isDentroDoBolso').mockReturnValue(true);
      jest.spyOn(logicaService, 'checkaAprovado').mockResolvedValue(false);
      jest.spyOn(emprestimoRepository, 'create').mockReturnValue({
        createEmprestimoDto,
        funcionario,
        emprestimoStatus: 3,
        isEmprestimoEntregue: false,
        primeiroPagamento: expect.any(Date),
        emprestimo_id: 1,
      } as any);
      jest.spyOn(emprestimoRepository, 'save').mockResolvedValue({
        createEmprestimoDto,
        funcionario: funcionario,
        emprestimoStatus: 3,
        isEmprestimoEntregue: false,
        primeiroPagamento: new Date(),
        emprestimo_id: 1,
      } as any);

      const resultado = await service.create(createEmprestimoDto);
      expect(resultado).toEqual({
        createEmprestimoDto,
        funcionario: funcionario,
        emprestimoStatus: 3,
        isEmprestimoEntregue: false,
        primeiroPagamento: expect.any(Date),
        emprestimo_id: 1
      });

      expect(funcionarioRepository.findOne).toHaveBeenCalledWith({ where: { funcionario_id: 1 }, relations: ['empresa'] });
      expect(logicaService.isConveniado).toHaveBeenCalledWith(funcionario);
      expect(logicaService.isDentroDoBolso).toHaveBeenCalledWith(funcionario, 2000 / 100, 4);
      expect(logicaService.checkaAprovado).toHaveBeenCalledWith(funcionario)
      expect(emprestimoRepository.create).toHaveBeenCalledWith(expect.any(Object));
      expect(emprestimoRepository.save).toHaveBeenCalledWith(expect.any(Object));

    })
  })
  describe('findEmprestimosPorFuncionario', () => {
    it('deve retornar a lista dos emprestimos de um funcionário', async () => {
      let funcionarioDosEmprestimos: Funcionario = {
        funcionario_id: 1,
        funcionario_nome: '',
        funcionario_cpf: 0,
        funcionario_email: '',
        funcionario_senha: '',
        funcionario_salario: 0,
        emprestimo: [],
        empresa: new Representante
      }

      const emprestimo1: Emprestimo = {
        emprestimo_id: 1,
        valor: 2000,
        parcelas: 2,
        primeiroPagamento: undefined,
        emprestimoStatus: 0,
        isEmprestimoEntregue: true,
        funcionario: funcionarioDosEmprestimos
      }
      const emprestimo2: Emprestimo = {
        emprestimo_id: 1,
        valor: 2,
        parcelas: 2,
        primeiroPagamento: undefined,
        emprestimoStatus: 0,
        isEmprestimoEntregue: true,
        funcionario: funcionarioDosEmprestimos
      }

      let emprestimos = [emprestimo1, emprestimo2]

      jest.spyOn(emprestimoRepository, 'find').mockImplementation(async () => Promise.resolve(emprestimos));

      const resposta = await service.findEmprestimosPorFuncionario(1);

      expect(resposta).toEqual(emprestimos);
      expect(emprestimoRepository.find).toHaveBeenCalledWith({ where: { funcionario: { funcionario_id: funcionarioDosEmprestimos.funcionario_id } } });

    });
  });
})


