import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { CreateProductSizeDto } from './productSize.dto';
import { ProductSize } from './productSize.entity';
import { ProductSizeService } from './productSize.service';

@Controller('product-size')
export class ProductSizeController {
  constructor(private productSizeService: ProductSizeService) {}

  @Post()
  async create(
    @Body() createProductSizeDto: CreateProductSizeDto,
  ): Promise<ProductSize> {
    return this.productSizeService.create(createProductSizeDto);
  }

  @Get()
  async findAll(): Promise<ProductSize[]> {
    const productSizes = await this.productSizeService.findAll();
    if (!productSizes.length) {
      throw new NotFoundException('No hay tallas de producto registradas');
    }
    return productSizes;
  }
}
