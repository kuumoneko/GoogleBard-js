# Google Bard API using node js

# Install

```
npm i googlebard-js
```

# Getting cookie

1. Go to https://bard.google.com/
2. Copy cookies named `__Secure-1PSID` and `__Secure-1PSIDTS` by using cookie editor extensions

# Usage

```js
/**
 * test.js
 */
const ChatBot = require("googlebard-js");
// import ChatBot from "googlebard-js";
// if you use es6

const __Secure_1PSID = "Your __Secure-1PSID cookie value";
const __Secure_1PSIDTS = "Your __Secure-1PSIDTS cookie value";

async function test() {
  const cookie = `__Secure-1PSIDTS=${__Secure_1PSIDTS};__Secure-1PSID=${__Secure_1PSID}`;

  const chatbot = new ChatBot(cookie);

  await chatbot.getAPI();

  console.log(await chatbot.ask("Your-prompt"));
}

test();
```

```
node test.js
```

# Contributors

<a href="https://github.com/Kuumoneko/GoogleBard-js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Kuumoneko/GoogleBard-js" />
</a>
