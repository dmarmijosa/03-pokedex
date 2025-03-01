import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(private readonly pokemonService: PokemonService) {}
  async executeSeed() {
    await this.pokemonService.removeAll(); // delete * from pokemons;
    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemonInsert: { name: string; no: number }[] = [];
    for (const { name, url } of data.results) {
      const start = url.lastIndexOf('pokemon/') + 8;
      const result = +url.slice(start, -1);
      pokemonInsert.push({ name: name, no: result });
      //await this.pokemonService.create({ name: name, no: result });
    }
    await this.pokemonService.insertMany(pokemonInsert);

    return 'Seed Executed';
  }
}
