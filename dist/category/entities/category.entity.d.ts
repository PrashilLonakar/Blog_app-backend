import { Post } from 'src/post/entities/post.entity';
export declare class Category {
    id: number;
    title: string;
    description: string;
    post: Post[];
}
