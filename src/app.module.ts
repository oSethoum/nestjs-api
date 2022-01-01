import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Post } from "./posts/entities/post.entity";
import { PostsModule } from "./posts/posts.module";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";

const config: SqliteConnectionOptions = {
  type: "sqlite",
  database: "database.db",
  entities: [Post, User],
  synchronize: true,
};

@Module({
  imports: [PostsModule, TypeOrmModule.forRoot(config), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
