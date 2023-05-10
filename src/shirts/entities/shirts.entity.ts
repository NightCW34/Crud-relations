import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';
import { ProductSize } from '../productSizes/productSize.entity';

@Entity()
export class Shirt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100000)
  price: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  color: string;

  @Column()
  productSizeId: string;

  @ManyToOne(() => ProductSize, (productSize) => productSize.shirt)
  @JoinColumn({ name: 'productSizeId' })
  productSize: ProductSize;
}
