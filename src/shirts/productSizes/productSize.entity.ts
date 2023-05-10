import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Shirt } from '../entities/shirts.entity';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  description: string;

  @OneToMany(() => Shirt, (shirt) => shirt.productSize)
  shirt: Shirt[];
}
