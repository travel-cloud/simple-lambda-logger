# simple-lambda-logger
Simple logging solution for Node.js AWS Lambda projects that supports multiple logging levels as well as 
optional support to send logs to third parties.

## Usage
```javascript
npm i @travel-cloud/simple-lambda-logger
```
Logging creation reads an ENV property to create a logger at the desired level, you can set this in AWS by simply setting the property as part of your configuration.

```javascript
process.env.LOG_LEVEL = 'DEBUG';

const logger = require('@travel-cloud/simple-lambda-logger');

mylogger = logger.newLogger();

mylogger.debug('Your logs');

```

By default logs are set to the console in the format 

```javascript
'${timestamp} ${level} ${log}'
```

Any calls to log against a logger of a higher level resolve to an empty function and are ignored. For example the following has no effect

```javaScript
process.env.LOG_LEVEL = 'ERROR';
const logger = require('@travel-cloud/simple-lambda-logger');

mylogger = logger.newLogger();

mylogger.debug('Your logs');
```


### Levels

1. DEBUG
2. INFO
3. ERROR

If no level property is specified or unknown value is configured this will result in a error level logger being created

## Third Parties

### logentries.com

If you would like to send your logs directly to logentries instead of the default console on AWS you can by simply setting your token in the environment

```javascript
process.env.LOGENTRIES_TOKEN = 'Your Token';
//then use the logger in the same way as normal
process.env.LOG_LEVEL = 'DEBUG';
const logger = require('@travel-cloud/simple-lambda-logger');
mylogger = logger.newLogger();
mylogger.debug('Your logs');
```

## Close
Usage of third party logger in aws lambda requires you to close the connection to the logger, failure to do this will result in the function not existing correctly. Using the simple logger you must just call close on your logger before the end of your lambda function.

```javascript
process.env.LOG_LEVEL = 'DEBUG';
const logger = require('@travel-cloud/simple-lambda-logger');
mylogger = logger.newLogger();
mylogger.debug('Your logs');
// terminate the logger
await mylogger.close();
//end the lambda function according to your requirements eg
callback(null, response);
```

Calling close returns a promise for you to await before terminating your lambda function, if the logger does not require closing a resolved promise is automatically returned.


# Dependencies

Logentries support is supplied by https://www.npmjs.com/package/le_node

