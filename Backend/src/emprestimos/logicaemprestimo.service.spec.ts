import { Test, TestingModule } from '@nestjs/testing';
import { LogicaEmprestimoService } from './logicaemprestimo.service';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { Representante } from 'src/representantes/entities/representante.entity';
import axios from 'axios';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('LogicaEmprestimosService', () => {
    let service: LogicaEmprestimoService;




    let funcionario: Funcionario = {
        funcionario_cpf: 124356,
        funcionario_email: "a@email.com",
        funcionario_id: 1,
        funcionario_nome: "Nome teste",
        funcionario_salario: 10000,
        empresa: null,
        emprestimo: [],
        funcionario_senha: "Criptica"
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LogicaEmprestimoService],
        }).compile();

        service = module.get<LogicaEmprestimoService>(LogicaEmprestimoService);
    });


    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Testes do check aprovado', () => {

        describe('salário de R$2.000,00', () => {

            it('2000 aprovar com score suficiente:', async () => {
                funcionario.funcionario_salario = 2000
                mockedAxios.get.mockResolvedValueOnce({ data: { score: 450 } });

                const resultado = await service.checkaAprovado(funcionario);
                expect(resultado).toBe(true);
            });
            it('2000 reprovar com score insuficiente', async () => {
                funcionario.funcionario_salario = 2000
                mockedAxios.get.mockResolvedValueOnce({ data: { score: 200 } });

                const resultado = await service.checkaAprovado(funcionario);
                expect(resultado).toBe(false);
            });
        });
        describe('salário de R$4.000,00', () => {

            it('4000 aprovar com score suficiente:', async () => {
                funcionario.funcionario_salario = 4000
                mockedAxios.get.mockResolvedValueOnce({ data: { score: 550 } });

                const resultado = await service.checkaAprovado(funcionario);
                expect(resultado).toBe(true);
            });
            it('4000 reprovar com score insuficiente', async () => {
                funcionario.funcionario_salario = 4000
                mockedAxios.get.mockResolvedValueOnce({ data: { score: 400 } });

                const resultado = await service.checkaAprovado(funcionario);
                expect(resultado).toBe(false);
            });
        });

        describe('salário de R$8.000,00', () => {

            it('8000 aprovar com score suficiente:', async () => {
                funcionario.funcionario_salario = 8000
                mockedAxios.get.mockResolvedValueOnce({ data: { score: 600 } });

                const resultado = await service.checkaAprovado(funcionario);
                expect(resultado).toBe(true);
            });
            it('8000 reprovar com score insuficiente', async () => {
                funcionario.funcionario_salario = 8000
                mockedAxios.get.mockResolvedValueOnce({ data: { score: 500 } });

                const resultado = await service.checkaAprovado(funcionario);
                expect(resultado).toBe(false);
            });
        });
        describe('salário de R$12.000,00', () => {

            it('12000 aprovar com score suficiente:', async () => {
                funcionario.funcionario_salario = 12000
                mockedAxios.get.mockResolvedValueOnce({ data: { score: 700 } });
                // Por ser método privado ele não consegue acessar, mas os testes foram pensados no caso de cada score/salario
                // jest.spyOn(service, 'getMinScore').mockResolvedValue(800);
                const resultado = await service.checkaAprovado(funcionario);
                expect(resultado).toBe(true);
            });
            it('12000 reprovar com score insuficiente', async () => {
                funcionario.funcionario_salario = 12000
                mockedAxios.get.mockResolvedValueOnce({ data: { score: 699 } });

                const resultado = await service.checkaAprovado(funcionario);
                expect(resultado).toBe(false);
            });
        });

        it('Deve lançar um erro se o salário for acima de R$12.000,00', async () => {
            funcionario.funcionario_salario = 12001
            mockedAxios.get.mockResolvedValueOnce({ data: { score: 699 } })
            await expect(service.checkaAprovado(funcionario)).rejects.toThrow(new Error("Salário acima de R$12000,00. Inválido para score."));
        });

        it('Deve lançar uma exceção se o salário não estiver definido', async () => {
            funcionario.funcionario_salario = null
            mockedAxios.get.mockResolvedValueOnce({ data: { score: 699 } })
            await expect(service.checkaAprovado(funcionario)).rejects.toThrow(new Error('Funcionário não tem salário definido. Pode ser representante.'));
        });
    },)

    describe('isConveniado', () => {
        it('deve retornar true se o funcionário estiver associado a uma empresa', () => {
            funcionario.empresa = new Representante()
            const resultado = service.isConveniado(funcionario);
            expect(resultado).toBe(true);
        });
        it('deve retornar false para o funcionario que não tenha uma empresa', () => {
            funcionario.empresa = null;
            const resultado = service.isConveniado(funcionario);
            expect(resultado).toBe(false)
        });
    });

    describe('isDentroDoBolso', () => {
        it('deve retornar falso se o valor da parcela for menor do que 35% do seu salário', () => {
            funcionario.funcionario_salario = 3000
            const valor = 3000
            const parcelas = 2
            expect(service.isDentroDoBolso(funcionario, valor, parcelas)).toBe(false);
        })
        it('deve retornar true se o valor da parcela for maior do que 35% do seu salário', () => {
            funcionario.funcionario_salario = 3000
            const valor = 3000
            const parcelas = 3
            expect(service.isDentroDoBolso(funcionario, valor, parcelas)).toBe(true);
        })
    });
    describe('getStatus', () => {
        it('retorna o valor do mock', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: { ok: true } })
            const resposta = await service.getStatus();
            expect(resposta).toBe(true)
            expect(mockedAxios.get).toHaveBeenCalledWith('https://run.mocky.io/v3/ed999ce0-d115-4f73-b098-6277aabbd144');
        })
        it('retorna o falso caso o valor ok do mock seja falso', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: { ok: false } })
            const resposta = await service.getStatus();
            expect(resposta).toBe(false)
            expect(mockedAxios.get).toHaveBeenCalledWith('https://run.mocky.io/v3/ed999ce0-d115-4f73-b098-6277aabbd144');
        })
    })



});
