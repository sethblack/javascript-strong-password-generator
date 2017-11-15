/*
 * jsspg.js: Strong Password Generator
 *
 * (C) 2017 Seth Black
 *
 */

const fortuna = require('javascript-fortuna');
const sha512 = require('js-sha512');
const unicodeBlocks = require('./unicodeBlocks');

const jsspg = exports;

jsspg.initialized = false;

jsspg.init = (options = {}) => {
  if (jsspg.initialized === true) {
    return;
  }

  const entropyFxn = options.entropyFxn || jsspg.entropyFunction;
  const timeBasedEntropy = options.timeBasedEntropy || false;
  const accumulateTimeout = options.accumulateTimeout || 0;

  fortuna.init({
    timeBasedEntropy,
    accumulateTimeout,
    entropyFxn,
  });

  jsspg.initialized = true;
};

jsspg.entropyFunction = () => sha512(`${(new Date()).getTime()}`);

jsspg.rng = (min, max) => parseInt((fortuna.random() * (max - min)) + min, 10);

jsspg.generate = (passwordLength = 26) => {
  let newPassword = '';

  for (let x = 0; x < passwordLength; x += 1) {
    const block = jsspg.rng(0, unicodeBlocks.blocks.length);
    const randomPos = jsspg.rng(0, unicodeBlocks.blocks[block].length);
    const charCode = unicodeBlocks.blocks[block][randomPos];
    newPassword += charCode;
  }

  return newPassword;
};
