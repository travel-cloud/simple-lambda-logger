

const leToken = process.env.LOGENTRIES_TOKEN;

const levels = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  ERROR: 'ERROR',
};

const { DEBUG, INFO, ERROR } = levels;

const createTimestamp = () => new Date().toISOString();

const debug = log => console.log(`${createTimestamp()} ${DEBUG} ${log}`);
const info = log => console.log(`${createTimestamp()} ${INFO} ${log}`);
const error = log => console.log(`${createTimestamp()} ${ERROR} ${log}`);

const logger = ({ logDebug = false, logInfo = false, logError = false }) => {
  if (leToken) {
    console.log(`${createTimestamp()} ${ERROR} Logentires disabled in current version please use 1.1.3`);
  }
  return {
    debug: logDebug ? debug : () => {},
    info: logInfo ? info : () => {},
    error: logError ? error : () => {},
    close: () => Promise.resolve(),
  };
};

const debugLogger = logger({ logDebug: true, logInfo: true, logError: true });
const infoLogger = logger({ logInfo: true, logError: true });
const errorLogger = logger({ logError: true });

const newLogger = (level = process.env.LOG_LEVEL || ERROR) => {
  switch (level.toUpperCase()) {
    case DEBUG:
      return debugLogger;
    case INFO:
      return infoLogger;
    case ERROR:
      return errorLogger;
    default:
      return errorLogger;
  }
};

//eslint-disable-next-line
module.exports = {
  newLogger,
  levels,
};
