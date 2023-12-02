import  {ChatBot}  from "../src/bard.js";
const psid = "Your __Secure-1PSID cookie value";
const psidts = "Your __Secure-1PSIDTS cookie value";
let cookies = `__Secure-1PSID=${psid}; __Secure-1PSIDTS=${psidts}`;
let bot = new ChatBot(cookies);

async function tesst() {
    await bot.getAPI();
    let response = await bot.ask("Your prompt");
console.log(response);
}

tesst() 