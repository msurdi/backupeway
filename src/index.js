import '@babel/polyfill';
import backup from './backup';
import app from './app';
import config from './config';

app.listen(config.port);

// eslint-disable-next-line no-console
backup().catch(console.error);
