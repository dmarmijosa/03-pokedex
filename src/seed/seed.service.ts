import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private http: AxiosAdapter,
  ) {}
  async executeSeed() {
    await this.pokemonService.removeAll(); // delete * from pokemons;
    const data = await this.http.get<PokemonResponse>(
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
