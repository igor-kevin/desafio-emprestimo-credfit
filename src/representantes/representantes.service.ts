import { Injectable } from '@nestjs/common';
import { CreateRepresentanteDto } from './dto/create-representante.dto';
import { UpdateRepresentanteDto } from './dto/update-representante.dto';

@Injectable()
export class RepresentantesService {
  create(createRepresentanteDto: CreateRepresentanteDto) {
    return 'This action adds a new representante';
  }

  findAll() {
    return `This action returns all representantes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} representante`;
  }

  update(id: number, updateRepresentanteDto: UpdateRepresentanteDto) {
    return `This action updates a #${id} representante`;
  }

  remove(id: number) {
    return `This action removes a #${id} representante`;
  }
}
