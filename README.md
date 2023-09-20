# Google Bard API using node js

# Install

Using `npm install` to install all package

# Getting cookie

1. Go to https://bard.google.com/
2. Copy cookies in JSON by using cookie editor extensions

# Usage

```shell
/**
 * testing.js
 */
const { ChatBot } = require('./src/bard')

const cookie = 'Your-cookie-json'

var cookies = ""

cookie.forEach((coookie) => {
    cookies += `${coookie.name}=${coookie.value};`
})

const chatbot = new ChatBot(cookies);

async function testing() {
    await chatbot.getAPI();

    chatbot.ask('Your-prompt').then((data) => {
        console.log(data);
    })
}

testing()
```

```
node testing.js
```

# Contributors

<a href="https://github.com/kuumoneko/GoogleBard-js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kuumoneko/GoogleBard-js" />
</a>

