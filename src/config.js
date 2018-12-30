import dotenv from 'dotenv';

dotenv.config();

export default {
  servers: process.env.BACKUPEWAY_SERVERS.split(','),
  retentionDays: parseInt(process.env.BACKUPEWAY_RETENTION_DAYS || 3, 10),
  intervalDays: parseInt(process.env.BACKUPEWAY_INTERVAL_DAYS || 1, 10),
  logsDays: parseInt(process.env.BACKUPEWAY_LOGS_DAYS || 7, 10),
  username: process.env.BACKUPEWAY_USERNAME,
  password: process.env.BACKUPEWAY_PASSWORD,
  port: parseInt(process.env.BACKUPEWAY_PORT || process.env.PORT || 8080, 10),
};
