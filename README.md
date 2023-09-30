# Google Bard API using node js

# Install

```
npm i googlebard-js
```

# Getting cookie

1. Go to https://bard.google.com/
2. Copy cookies named `__Secure-1PSID` and `__Secure-1PSIDTS`

# Usage

```shell
/**
 * testing.js
 */
const ChatBot = require("../src/bard");

const __Secure_1PSIDTS = "";
const __Secure_1PSID = "";

async function test() {

  const cookie = `__Secure-1PSIDTS=${__Secure_1PSIDTS};__Secure-1PSID=${__Secure_1PSID}`;

  const chatbot = new ChatBot(cookie);

  await chatbot.getAPI();

  console.log(await chatbot.ask("Your-prompt"));
}

test();

```

```
node testing.js
```

# Contributors

<a href="https://github.com/Kuumoneko/GoogleBard-js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Kuumoneko/GoogleBard-js" />
</a>
