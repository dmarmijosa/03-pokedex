export const envConfig = () => ({
  environment: process.env.NODE_ENV || 'development',
  mongodb: process.env.MONGO_URI,
  seed: process.env.SEED || 'https://pokeapi.co/api/v2/pokemon?limit=650',
  port: process.env.PORT || 3001,
  default_limit: process.env.DEFAULT_LIMIT || 10,
});
