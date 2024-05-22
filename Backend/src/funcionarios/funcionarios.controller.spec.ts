import { Test, TestingModule } from '@nestjs/testing';
import { FuncionariosController } from './funcionarios.controller';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { Funcionario } from './entities/funcionario.entity';

describe('FuncionariosController', () => {
  let controller: FuncionariosController;
  let service: FuncionariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionariosController],
      providers: [
        {
          provide: FuncionariosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            getEmpresaDoFuncionario: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FuncionariosController>(FuncionariosController);
    service = module.get<FuncionariosService>(FuncionariosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve chamar o create do service com os parâmetros corretos', async () => {
      const createFuncionarioDto: CreateFuncionarioDto = {
        funcionario_nome: 'Testinho',
        funcionario_cpf: 12,
        funcionario_email: 'funcioanrio@teste.com',
        funcionario_senha: 'criptica',
        funcionario_salario: 1000,
        representante_id: 1,
      };
      const resultado = new Funcionario();
      jest.spyOn(service, 'create').mockResolvedValue(resultado);

      expect(await controller.create(createFuncionarioDto)).toBe(resultado);
      expect(service.create).toHaveBeenCalledWith(createFuncionarioDto);
    });
  });

  describe('findAll', () => {
    it('deve chamar o findAll do service e retornar a lista de funcionarios', async () => {
      const resultado = [new Funcionario()];
      jest.spyOn(service, 'findAll').mockResolvedValue(resultado);

      expect(await controller.findAll()).toBe(resultado);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve chamar o findOne do service com o id correto e retornar o funcionario referente ao id passado', async () => {
      const resultado = new Funcionario();
      jest.spyOn(service, 'findOne').mockResolvedValue(resultado);

      expect(await controller.findOne('1')).toBe(resultado);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findEmpresa', () => {
    it('deve chamar o getEmpresaDoFuncionario com os id do funcionario e retornar o id do representante', async () => {
      const funcionario = new Funcionario();
      const representante_id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(funcionario);
      jest.spyOn(service, 'getEmpresaDoFuncionario').mockResolvedValue(representante_id);

      expect(await controller.findEmpresa('1')).toBe(representante_id);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(service.getEmpresaDoFuncionario).toHaveBeenCalledWith(funcionario);
    });
  });
});