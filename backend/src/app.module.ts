import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as path from "node:path";

import { configProvider } from "./app.config.provider";
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL')
      })
    }),
    FilmsModule,
    OrderModule,
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    })
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule { }
