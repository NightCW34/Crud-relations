import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ShirtsService } from './shirts.service';
import { CreateShirtDto } from './dto/shirt.dto';

@Controller('shirts')
export class ShirtsController {
  constructor(private readonly shirtsService: ShirtsService) {}

  @Get()
  async findAll() {
    return this.shirtsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.shirtsService.findOne(id);
  }

  @Post()
  async create(@Body() createShirtDto: CreateShirtDto) {
    return this.shirtsService.create(createShirtDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createShirtDto: CreateShirtDto,
  ) {
    return this.shirtsService.update(id, createShirtDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.shirtsService.delete(id);
  }
}
