const { expect } = require('chai');

const logger = require('../src/logger');

describe('logger', () => {
  describe('levels', () => {
    const { levels } = logger;

    it('should return 3 valid levels', () => {
      const expected = {
        DEBUG: 'DEBUG',
        INFO: 'INFO',
        ERROR: 'ERROR',
      };
      expect(levels).to.be.deep.equal(expected);
    });
  });
});
