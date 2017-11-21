# javascript-strong-password-generator

JavaScript Strong Password Generator: based on Jeff Atwood's Post ["Password Rules Are Bullshit"](https://blog.codinghorror.com/password-rules-are-bullshit/).

You can view a working demo at [https://www.sethserver.com/strong-random-password-generator.html](https://www.sethserver.com/strong-random-password-generator.html)

Currently uses six unicode blocks, and I don't see why we can't use them all; this just makes the best looking passwords.

## Installation

`npm i javascript-strong-password-generator`

## Basic Usage

This is a quick out-of-the-box usage example. This is not how you'd use it in production if you want it to be secure, but it will give you a decent random unicode password.

```javascript
const jsspg = require('javascript-strong-password-generator');

jsspg.init();
const newPassword = jsspg.generate();

console.log(newPassword);
```

## Command-line Usage

JSSPG includes a simple command-line app that will generate a single random password seeded by your local environment.

```shell
$ js-spg
ƗÇŒk😪Ư2ëjOåęğ⚎Ŭ☦Ƙ🙅ēňxę😣☨😺Ú
```

## Advanced Usage

To reduce predictability add entropy from dynamic sytem state inforation such as CPU usage, number of active processes, availalbe ram and disk io.

```javascript
const jsspg = require('javascript-strong-password-generator');
const si = require('systeminformation');
const sha512 = require('js-sha512');

let entropyval;

function entropyAccumFunction() {
  return new Promise(async (resolve) => {
    const cpuSpeed = await si.cpu();
    const processes = await si.processes();
    const disksIO = await si.disksIO();
    const memory = await si.mem();

    entropyval = sha512(`${JSON.stringify(cpuSpeed)}:${JSON.stringify(processes)}:${JSON.stringify(disksIO)}:${JSON.stringify(memory)}`);

    resolve();
  });
}

function entropyFunction() {
  return entropyval;
}

async function run() {
  await entropyAccumFunction();

  jsspg.init({
    timeBasedEntropy: false,
    entropyFxn: entropyFunction,
  });

  process.stdout.write(`${jsspg.generate()}\n`);
}

run();
```

# Building for Browsers

This will generate a ./build/jsspg.min.js file for use in a web browser.

```shell
$ npm run webpack
```

## Basic Browser Usage

```javascript
<script src="js/jsspg.min.js"></script>
<script>
(function () {
  jsspg.init();

  var newPassword = jsspg.generate()
  alert(newPassword);
})();
</script>
```

# Core Concept

Just read ["Password Rules Are Bullshit"](https://blog.codinghorror.com/password-rules-are-bullshit/).

## API

### `jsspg.init(options)`

#### Options [{ k: v }]

- entropyFxn [function fxn()]: Custom entropy function. Must return an Array or string of length fortuna.entropySz (128 by default)
- timeBasedEntropy [bool]: Detaches the reseeding of the algorithm from the call to random().
- accumulateTimeout [int]: The amount of time in milliseconds between each timeBasedEntropy call. Requires timeBasedEntropy to be true.

### `jsspg.generate(passwordLength)`

Generates a random Unicode password of length `passwordLength` (length is Unicode characters, not bytes).
