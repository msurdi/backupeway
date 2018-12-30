import express from 'express';
import basicAuth from 'express-basic-auth';
import logs from './logs';
import config from './config';

const app = express();

if (config.username && config.password) {
  app.use(
    basicAuth({
      challenge: true,
      users: {
        [config.username]: config.password,
      },
    }),
  );
}

app.get('/', (req, res) => {
  res.send(logs.get());
});

export default app;
