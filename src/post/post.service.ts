import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    // const slug = createPostDto.title.split(' ').join('_').toLowerCase();
    // return await this.repo.insert({ ...createPostDto });
    const post = new Post();
    post.userId = 1;
    Object.assign(post, createPostDto);
    this.repo.create(post);
    return await this.repo.save(post);
  }

  async findAll(query?: string) {
    const myQuery = this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.user', 'user');
    //check if query is present or not
    if (!(Object.keys(query).length === 0) && query.constructor === Object) {
      const queryKeys = Object.keys(query); //get all the key in query string
      //check if title key is present
      if (queryKeys.includes('title')) {
        myQuery.where('post.title LIKE :title', {
          title: `%${query['title']}%`,
        });
      }

      //check if sort key is present, we will sort title field only
      if (queryKeys.includes('sort')) {
        myQuery.orderBy('post.title', query['sort'].toUpperCase()); //Ascending or Descending
      }

      // check if category is present, select only selected category items
      if (queryKeys.includes('category')) {
        myQuery.andWhere('category.title = :cat', { cat: query['category'] });
        console.log('3', myQuery);
      }
      return await myQuery.getMany();
    } else {
      return await myQuery.getMany();
    }
  }

  async findOne(id: number) {
    const post = await this.repo.findOneBy({ id });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async findBySlug(slug: string) {
    try {
      const post = await this.repo.findOneByOrFail({ slug });
      return post;
    } catch (err) {
      throw new BadRequestException(`Post with slug ${slug} not found`);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.repo.findOneBy({ id });
    if (!post) {
      throw new BadRequestException(`Post not found`);
    }
    post.modifiedOn = new Date(Date.now());
    post.category = updatePostDto.category;

    Object.assign(post, updatePostDto);
    return await this.repo.save(post);
  }

  async remove(id: number) {
    const post = await this.repo.findOneBy({ id });
    if (!post) {
      throw new BadRequestException(`Post not found`);
    }
    await this.repo.remove(post);
    return { success: true, post };
  }
}
