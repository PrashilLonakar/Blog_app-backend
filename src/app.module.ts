import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from 'src/user/user-roles';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'blogappdevdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
    UserModule,
    AccessControlModule.forRoles(roles),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
