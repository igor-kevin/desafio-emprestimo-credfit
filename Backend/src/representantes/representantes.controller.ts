import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RepresentantesService } from './representantes.service';
import { CreateRepresentanteDto } from './dto/create-representante.dto';
import { UpdateRepresentanteDto } from './dto/update-representante.dto';

@Controller('representantes')
export class RepresentantesController {
  constructor(private readonly representantesService: RepresentantesService) { }

  @Post()
  create(@Body() createRepresentanteDto: CreateRepresentanteDto) {
    return this.representantesService.create(createRepresentanteDto);
  }

  @Get()
  findAll() {
    return this.representantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.representantesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRepresentanteDto: UpdateRepresentanteDto) {
    return this.representantesService.update(+id, updateRepresentanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.representantesService.remove(+id);
  }
}
