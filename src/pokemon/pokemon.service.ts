import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      return await this.pokemonModel.create(createPokemonDto);
    } catch (err: any) {
      if (err.code === 11000) {
        throw new BadRequestException(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Pokemon ${JSON.stringify(err.keyValue)} already exists`,
        );
      } else {
        throw new InternalServerErrorException('Cannot create pokemon');
      }
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(termino: string) {
    let pokemon: Pokemon | null = null;

    if (!isNaN(+termino)) {
      pokemon = (await this.pokemonModel.findOne({
        no: +termino,
      })) as Pokemon;
    }

    if (!pokemon && isValidObjectId(termino)) {
      pokemon = await this.pokemonModel.findById(termino);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: termino.toLocaleLowerCase(),
      });
    }

    if (!pokemon) throw new NotFoundException('Pokemon no exists');

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
