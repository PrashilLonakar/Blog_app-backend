import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    slug: string;
    createdOn: Date;
    modifiedOn: Date;
    mainImageUrl: string;
    userId: number;
    categoryId: number;
    user: User;
    category: Category;
}
