import { Post } from 'src/post/entities/post.entity';
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    profilePic: string;
    posts: Post[];
}
