import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
  }

  async create(createPostDto: CreatePostDto) {
    const post = {
      title: createPostDto.title,
      description: createPostDto.description,
      user: await this.usersRepository.findOne(createPostDto.userId),
    };
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne(id);
    return this.postsRepository.save({ ...post, ...updatePostDto });
  }

  async remove(id: number) {
    const post = await this.postsRepository.findOne(id);
    return this.postsRepository.remove(post);
  }
}
