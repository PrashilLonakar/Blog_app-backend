import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
export declare class PostService {
    private readonly repo;
    constructor(repo: Repository<Post>);
    create(createPostDto: CreatePostDto, user: User): Promise<Post>;
    findAll(query?: string): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    findBySlug(slug: string): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<{
        success: boolean;
        post: Post;
    }>;
}
