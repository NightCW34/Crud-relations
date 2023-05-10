import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductSizeDto } from './productSize.dto';
import { ProductSize } from './productSize.entity';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
  ) {}

  async create(
    createProductSizeDto: CreateProductSizeDto,
  ): Promise<ProductSize> {
    const productSize = this.productSizeRepository.create(createProductSizeDto);
    return this.productSizeRepository.save(productSize);
  }

  async findAll(): Promise<ProductSize[]> {
    return this.productSizeRepository.find();
  }

  async findOne(id: string): Promise<ProductSize> {
    const productSize = await this.productSizeRepository.findOne({
      where: { id },
    });
    if (!productSize) {
      throw new NotFoundException(
        `El tamaño de producto con ID ${id} no existe`,
      );
    }
    return productSize;
  }

  async update(
    id: string,
    updateProductSizeDto: CreateProductSizeDto,
  ): Promise<ProductSize> {
    const productSize = await this.findOne(id);
    const updatedProductSize = Object.assign(productSize, updateProductSizeDto);
    return this.productSizeRepository.save(updatedProductSize);
  }

  async remove(id: string): Promise<void> {
    const productSize = await this.findOne(id);
    await this.productSizeRepository.remove(productSize);
  }
}
