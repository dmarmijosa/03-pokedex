import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGO_URI: Joi.required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(6),
  SEED: Joi.string().default('https://pokeapi.co/api/v2/pokemon?limit=650'),
});
