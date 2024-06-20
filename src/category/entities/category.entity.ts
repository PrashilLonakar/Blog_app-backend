import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('catergories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
}
