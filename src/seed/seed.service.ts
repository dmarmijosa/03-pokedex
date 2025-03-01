import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  async executeSeed() {
    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limint=10',
    );
    data.results.forEach(({ name, url }) => {
      const start = url.lastIndexOf('pokemon/') + 8;
      const result = +url.slice(start, -1);
      console.log({ name, result });
    });
    return data.results;
  }
}
