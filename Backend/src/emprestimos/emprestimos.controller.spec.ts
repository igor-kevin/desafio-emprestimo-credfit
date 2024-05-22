import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimosController } from './emprestimos.controller';
import { EmprestimosService } from './emprestimos.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { Emprestimo } from './entities/emprestimo.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';

describe('EmprestimosController', () => {
  let controller: EmprestimosController;
  let service: EmprestimosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmprestimosController],
      providers: [
        {
          provide: EmprestimosService,
          useValue: {
            create: jest.fn(),
            findEmprestimosPorFuncionario: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmprestimosController>(EmprestimosController);
    service = module.get<EmprestimosService>(EmprestimosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve criar o emprestimo com os parametros do createEmprestimoDTO', async () => {
      const createEmprestimoDto: CreateEmprestimoDto = {
        valor: 1,
        parcelas: 1,
        funcionario_id: 1
      };
      const resultado: Emprestimo = {
        emprestimo_id: 1,
        valor: 1,
        parcelas: 1,
        primeiroPagamento: undefined,
        emprestimoStatus: 0,
        isEmprestimoEntregue: true,
        funcionario: new Funcionario()
      }

      jest.spyOn(service, 'create').mockResolvedValue(resultado);

      expect(await controller.create(createEmprestimoDto)).toBe(resultado);

      expect(service.create).toHaveBeenCalledWith(createEmprestimoDto);
    });
  });

  describe('findEmprestimosPorFuncionario', () => {
    it('Deve chamar o findEmprestimoPorFuncionario com o id como parametro', async () => {
      const id = 1;
      const result = [];

      jest.spyOn(service, 'findEmprestimosPorFuncionario').mockResolvedValue(result);

      expect(await controller.findEmprestimosPorFuncionario(id)).toBe(result);
      expect(service.findEmprestimosPorFuncionario).toHaveBeenCalledWith(id);
    });
  });
});