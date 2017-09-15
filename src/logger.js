const LeLogger = require('le_node');

const leToken = process.env.LOGENTRIES_TOKEN;
const leLogger = leToken ? new LeLogger({ token: leToken }) : null;

const levels = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  ERROR: 'ERROR',
};

const { DEBUG, INFO, ERROR } = levels;

const createTimestamp = () => {
  return new Date().toISOString();
}

const leDebug = log => leLogger.log(`${createTimestamp()} ${DEBUG} ${log}`);
const leInfo = log => leLogger.log(`${createTimestamp()} ${INFO} ${log}`);
const leError = log => leLogger.log(`${createTimestamp()} ${ERROR} ${log}`);
const leClose = async () => (
  new Promise((resolve) => {
    leLogger.once('buffer drain', () => {
      leLogger.closeConnection();
      leLogger.on('disconnected', () => {
        resolve();
      });
    });
  }));


const debug = log => console.log(`${createTimestamp()} ${DEBUG} ${log}`);
const info = log => console.log(`${createTimestamp()} ${INFO} ${log}`);
const error = log => console.log(`${createTimestamp()} ${ERROR} ${log}`);

const logger = ({ logDebug = false, logInfo = false, logError = false }) => {
  if (leLogger) {
    return {
      debug: logDebug ? leDebug : () => {},
      info: logInfo ? leInfo : () => {},
      error: logError ? leError : () => {},
      close: leClose,
    };
  }
  return {
    debug: logDebug ? debug : () => {},
    info: logInfo ? info : () => {},
    error: logError ? error : () => {},
    close: async () => Promise.resolve(),
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

module.exports = {
  newLogger,
  levels,
};
