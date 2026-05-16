import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

describe('OrderController', () => {
    let controller: OrderController;
    let orderService: OrderService;


    // создаем мок сервиса
    const mockOrderService = {
        createOrder: jest.fn(),
    };

    beforeEach(async () => {
        // собираем тестовый модуль
        const module = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [{ provide: OrderService, useValue: mockOrderService }],
        }).compile();

        // достаем контроллер
        controller = module.get<OrderController>(OrderController);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create order and return result from service', async () => {
        // моковые данные
        const order: OrderDto = {
            email: 'test@gmail.com',
            phone: "89999999999",
            tickets: [
                {
                    film: '1',
                    session: '2',
                    daytime: '12.05.2026',
                    row: 1,
                    seat: 2,
                    price: 333,
                }
            ]
        };

        // объект, который вернет сервис
        const expectedResult = {
            total: 1,
            items: [
                {
                    film: '1',
                    session: '2',
                    daytime: '12.05.2026',
                    row: 1,
                    seat: 2,
                    price: 333,
                    id: 'some-uuid',
                }
            ]
        };
        mockOrderService.createOrder.mockResolvedValue(expectedResult);

        // получаем результат
        const result = await controller.createOrder(order);

        expect(result).toEqual(expectedResult);
        expect(mockOrderService.createOrder).toHaveBeenCalledWith(order);
    });

})