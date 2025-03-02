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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private default_limit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.default_limit = this.configService.get<number>('default_limit')!;
  }
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      return await this.pokemonModel.create(createPokemonDto);
    } catch (err: any) {
      this._handleExecptions(err);
    }
  }

  findAll(queryParamaters: PaginationDto) {
    const { limit = this.default_limit, offset = 0 } = queryParamaters;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
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

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this._handleExecptions(error);
    }
  }

  private _handleExecptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === 11000) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Pokemon ${JSON.stringify(error.keyValue)} already exists whit this date`,
      );
    } else {
      throw new InternalServerErrorException('Cannot create pokemon');
    }
  }

  async remove(id: string) {
    // Eliminar por Id
    // const pokemon = await this.findOne(id);
    // if (!pokemon) throw new NotFoundException('Pokemon not found');
    // await pokemon.deleteOne();
    // return {
    //   message: 'Pokemon deleted',
    //   pokemon,
    // };

    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0) throw new NotFoundException('Pokemon not found');
    return;

    //return await this.pokemonModel.findByIdAndDelete(id);
  }

  async removeAll() {
    return await this.pokemonModel.deleteMany({});
  }

  async insertMany(pokemon: { name: string; no: number }[]) {
    return await this.pokemonModel.insertMany(pokemon);
  }
}
