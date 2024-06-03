import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { error } from 'console';
import { State } from './enums/states.enum';

@Injectable()
export class TablesService {

  constructor(

    @InjectRepository(Table) private tableRepository: Repository<Table>,


  ) {}
  async create(createTableDto: CreateTableDto) {
    try {
      var table = await this.tableRepository.create(createTableDto);
      await this.tableRepository.save(table);
      console.log(createTableDto);

    } catch (error) {
      console.log(error);
      throw new BadRequestException('plato no creado');
    }

    return table;
  }

 async findAll() {

    try {
     var tables = await this.tableRepository.find();
    } catch (error) {
      
    }
    return tables;
  }

   async findOne(id: number) {

    try {
      var table = await this.tableRepository.findOneBy({id: id});
      console.log(table);
      if (!table) {
        throw error;
      }
    } catch (error) {
      throw new BadRequestException('plato no encontrado');
    }

    return table;
  }

  async update(id: number, updateTableDto: UpdateTableDto) {

    try {
      var table = await this.tableRepository.findOneBy({id: id});
      if (!table) {
        throw error;
      }

      await this.tableRepository.update(id, {
        ...updateTableDto,
        updatedAt: new Date()
       } );
    } catch (error) {
      throw new BadRequestException('plato no encontrado');
    }

    return `This action updates a #${id} table`;
  }

  async changeState(id: number, state: State) {
    try {

      var table = await this.tableRepository.findOneBy({id: id});
      if (!table) {
        throw error;
      }
      await this.tableRepository.update(id, {
        state: state
       } );

    } catch (error) {
      
    }
    return table;
  }


}
