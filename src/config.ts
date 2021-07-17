import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      db_name: process.env.DATABASE_NAME,
      port: parseInt(process.env.PORT, 10),
      password: process.env.PASSWORD,
      db_user: process.env.DATABASE_USER,
      host: process.env.HOST,
    },
    api_key: process.env.API_KEY,
  };
});
