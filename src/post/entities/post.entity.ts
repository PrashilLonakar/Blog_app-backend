import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import slugify from 'slugify';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  slug: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdOn: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedOn: Date;
  @Column()
  mainImageUrl: string;

  @Column()
  userId: number;

  @Column({ default: 3 })
  categoryId: number;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.post, {
    eager: true,
  })
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id',
  })
  category: Category;

  @BeforeInsert()
  slugifyPost() {
    this.slug = slugify(this.title.substr(0, 20), {
      lower: true,
      replacement: '_',
    });
  }
}
