const ChatBot = require("../src/bard");
const { __Secure_1PSID, __Secure_1PSIDTS } = require("./config.json");

async function burh() {

  const cookie = `__Secure-1PSIDTS=${__Secure_1PSIDTS};__Secure-1PSID=${__Secure_1PSID}`;

  const chatbot = new ChatBot(cookie);

  await chatbot.getAPI();

  console.log(await chatbot.ask("best pc config fo programmming"));
}

burh();
