let logs = [];

export default {
  log(message) {
    const date = new Date();
    const formattedMessage = `${date} ${message}`;
    logs.push(formattedMessage);
    // eslint-disable-next-line no-console
    console.log(formattedMessage);
  },
  clear() {
    logs = [];
  },
  get() {
    return logs;
  },
};
