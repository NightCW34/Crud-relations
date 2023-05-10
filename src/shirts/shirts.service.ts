import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShirtDto } from './dto/shirt.dto';
import { Shirt } from './entities/shirts.entity';
import { ProductSize } from './productSizes/productSize.entity';

@Injectable()
export class ShirtsService {
  constructor(
    @InjectRepository(Shirt)
    private shirtRepository: Repository<Shirt>,
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
  ) {}

  async create(createShirtDto: CreateShirtDto): Promise<Shirt> {
    const { size, ...shirtData } = createShirtDto;
    const shirt = this.shirtRepository.create(shirtData);
    const productSize = await this.productSizeRepository.findOne({
      where: { name: size },
    });

    if (!productSize) {
      throw new NotFoundException(`El tamaño de producto "${size}" no existe.`);
    }

    shirt.productSize = productSize;
    return this.shirtRepository.save(shirt);
  }

  async findAll(): Promise<Shirt[]> {
    return this.shirtRepository.find();
  }

  async findOne(id: string): Promise<Shirt> {
    const shirt = await this.shirtRepository.findOne({ where: { id } });
    if (!shirt) {
      throw new NotFoundException(`La camiseta con el ${id} no existe`);
    }
    return shirt;
  }

  async update(id: string, updateShirtDto: CreateShirtDto): Promise<Shirt> {
    const shirt = await this.findOne(id);
    const updatedShirt = Object.assign(shirt, updateShirtDto);
    return this.shirtRepository.save(updatedShirt);
  }

  async delete(id: string): Promise<void> {
    const shirt = await this.findOne(id);
    await this.shirtRepository.delete(shirt);
  }
}
