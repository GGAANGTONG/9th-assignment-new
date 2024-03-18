import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ShowModule } from './show/show.module';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmModuleOptions } from './configs/database.config';
import { configModuleValidationSchema } from 'src/configs/env-validation.config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, validationSchema: configModuleValidationSchema}),
    AuthModule, UserModule, ShowModule, BookModule,
  TypeOrmModule.forRootAsync(typeOrmModuleOptions)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
