let logs = [];

export default {
  log(message) {
    const date = new Date();
    logs.push(`${date} ${message}`);
  },
  clear() {
    logs = [];
  },
  get() {
    return logs;
  },
};
