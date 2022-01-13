import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { PostsModule } from "./posts/posts.module";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Post } from "./posts/entities/post.entity";
import { User } from "./users/entities/user.entity";

const config: SqliteConnectionOptions = {
  type: "sqlite",
  database: "database.db",
  entities: [Post, User],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
