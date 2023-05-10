import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shirt } from './entities/shirts.entity';
import { ShirtsController } from './shirts.controller';
import { ShirtsService } from './shirts.service';
import { ProductSize } from './productSizes/productSize.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shirt, ProductSize])],
  controllers: [ShirtsController],
  providers: [ShirtsService],
})
export class ShirtsModule {}
