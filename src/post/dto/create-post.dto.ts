import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  content: string;

  @IsNumber()
  @IsOptional()
  categoryId: number;

  @IsOptional()
  @IsString({ message: 'mainImageUrl must be a string' })
  mainImageUrl: string;

  @IsOptional()
  category: Category;
}
