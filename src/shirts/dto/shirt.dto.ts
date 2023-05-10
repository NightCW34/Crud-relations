import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ProductSize } from '../productSizes/productSize.entity';

export class CreateShirtDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  // Agrega esta propiedad para incluir la información necesaria para la relación
  productSize: ProductSize;
}
