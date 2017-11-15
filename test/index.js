/*
 * index.js: Strong Password Generator
 *
 * (C) 2017 Seth Black
 *
 */

const assert = require('assert');
const jsspg = require('../lib/jsspg');

describe('Strong Password Generator', () => {
  it('should init and set isetup up to a sane state', () => {
    jsspg.init();

    assert(jsspg.initialized);
  });

  it('should work out of the box', () => {
    jsspg.init();

    const password = jsspg.generate();

    assert(password.length > 0);
  });

  it('should should work with a length param', () => {
    jsspg.init();

    const password = jsspg.generate(46);

    assert(password.length >= 46);
  });
});
