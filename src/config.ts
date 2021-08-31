import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      db_name: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10),
      password: process.env.DB_PASSWORD,
      db_user: process.env.DB_USER,
      host: process.env.DB_HOST,
    },
    api_key: process.env.API_KEY,
    jwt_secret: process.env.JWT_SECRET,
  };
});
