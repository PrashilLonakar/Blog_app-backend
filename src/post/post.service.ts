import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const slug = createPostDto.title.split(' ').join('_').toLowerCase();
    return await this.repo.insert({ ...createPostDto, slug });
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const post = await this.repo.findOneBy({ id });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.repo.update({ id }, updatePostDto);
  }

  async remove(id: number) {
    return await this.repo.delete({ id });
  }
}
