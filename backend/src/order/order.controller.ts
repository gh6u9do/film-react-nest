import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderDto } from "./dto/order.dto";
import { ResponseOrderDto } from "./dto/response-order.dto";
 
@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}

    // запрос на создание заказа 
    @Post()
    async createOrder(@Body() order: OrderDto ): Promise<ResponseOrderDto> {
        return await this.orderService.createOrder(order);
    }
}