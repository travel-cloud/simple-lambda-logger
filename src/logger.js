

const leToken = process.env.LOGENTRIES_TOKEN;

const levels = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  ERROR: 'ERROR',
};

const { DEBUG, INFO, ERROR } = levels;

const debug = message => console.log(typeof(message) === "object" ? JSON.stringify(message) : `${DEBUG} ${message}`);
const info = message => console.log(typeof(message) === "object" ? JSON.stringify(message) : `${INFO} ${message}`);
const error = message => console.log(typeof(message) === "object" ? JSON.stringify(message) : `${ERROR} ${message}`);

const logger = ({ logDebug = false, logInfo = false, logError = false }) => {
  if (leToken) {
    console.log(`${ERROR} Logentries disabled in current version please use 1.1.3`);
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
