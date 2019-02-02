
import axios from 'axios';
import logs from './logs';
import config from './config';

const MS_IN_A_DAY = 1000 * 60 * 60 * 24;

const getOldestBackupToKeepDate = () => new Date(Date.now() - config.retentionDays * MS_IN_A_DAY);
const backupInterval = config.retentionDays * MS_IN_A_DAY;
const logsInterval = config.logsDays * MS_IN_A_DAY;

const client = axios.create({
  baseURL: process.env.BAKUPPER_SCALEWAY_URL || 'https://cp-par1.scaleway.com/',
  headers: { 'X-Auth-Token': config.scalewayApiSecret },
});

const runBackup = async (server) => {
  logs.log('Requesting backup');
  await client.post(`/servers/${server}/action`, { action: 'backup' });
};

const cleanupImages = async () => {
  logs.log('Cleaning up old images');
  const response = await client.get('/images');
  const { images } = response.data;
  const outdatedImages = images
    .filter(image => !image.public)
    .filter(image => image.state === 'available')
    .filter(image => new Date(image.creation_date) < getOldestBackupToKeepDate());
  const deletions = outdatedImages.map((image) => {
    logs.log(`Deleting image ${image.name}`);
    return client.delete(`/images/${image.id}`);
  });
  await Promise.all(deletions);
};

const cleanupSnapshots = async () => {
  logs.log('Cleaning up old snapshots');
  const response = await client.get('/snapshots');
  const { snapshots } = response.data;
  const outdatedSnapshots = snapshots
    .filter(snapshot => snapshot.state === 'available')
    .filter(snapshot => new Date(snapshot.creation_date) < getOldestBackupToKeepDate());
  const deletions = outdatedSnapshots.map((snapshot) => {
    logs.log(`Deleting snapshot ${snapshot.name}`);
    return client.delete(`/snapshots/${snapshot.id}`);
  });
  await Promise.all(deletions);
};

const backup = async () => {
  const backups = config.servers.map(server => runBackup(server));
  await Promise.all(backups);
  await cleanupImages();
  await cleanupSnapshots();
  logs.log(`Completed at ${new Date()}`);
};

const periodicBackup = async () => {
  setInterval(logs.clear, logsInterval);

  // Initial 10s delay is to avoid DoS'ing if the application restarts too quickly
  setTimeout(async () => {
    try {
      await backup();
    } catch (error) {
      logs.log(error);
    }
    setTimeout(periodicBackup, backupInterval);
  }, 10 * 1000);
};

export default periodicBackup;
