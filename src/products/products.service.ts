import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/product.dto';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly ImageRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
  ) {}

  // //Metodo para crear un producto
  // async create(productoDto: CreateProductDto) {
  //   const product = this.productRepository.create(productoDto);
  //   await this.productRepository.save(product);

  //   return product;
  // }

  async create(productDto: CreateProductDto) {
    const { images = [], ...detalleProducto } = productDto;
    const product = await this.productRepository.create({
      ...detalleProducto,
      images: images.map((image) =>
        this.ImageRepository.create({ url: image }),
      ),
    });
    await this.productRepository.save(product);
    return product;
  }

  //Metodo para visualizar todos los productos
  findAll() {
    return this.productRepository.find({
      relations: ['images'],
    });
  }

  //Metodo para visualizar un producto especifico
  findOne(id: string) {
    return this.productRepository.findOneBy({ id });
  }

  //Remover un producto especifico
  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return 'Producto eliminado satisfactoriamente';
  }

  //Actualizar un producto especifico
  //   async update(id: string, cambios: CreateProductDto) {
  //     const findProduct = await this.findOne(id);
  //     const updatedProducto = await this.productRepository.merge(
  //       findProduct,
  //       cambios,
  //     );

  //     return this.productRepository.save(updatedProducto);
  //   }
  // }

  async update(id: string, cambios: CreateProductDto) {
    const { images, ...updateAll } = cambios;
    const product = await this.productRepository.preload({
      id: id,
      ...updateAll,
    });

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (images) {
      await queryRunner.manager.delete(ProductImage, { product: { id } });

      product.images = images.map((image) =>
        this.ImageRepository.create({ url: image }),
      );
    } else {
      product.images = await this.ImageRepository.findBy({ product: { id } });
    }

    //Salvamo y cerramos la consulta
    await queryRunner.manager.save(product);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return product;
  }
}
