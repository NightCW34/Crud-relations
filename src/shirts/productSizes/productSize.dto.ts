import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductSizeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
