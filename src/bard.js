const https = require("https");

class ChatBot {
    constructor(cookie) {
        this.cookie = cookie;
        this.snlm0e = "";
        this.cfb2h = "";
        this.chaturl = "https://bard.google.com/u/1/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=";
        this.homeurl = "https://bard.google.com";
    }

    searchInText(textContent, regex) {
        let match = textContent.match(regex);

        if (match && match.length > 0) {
            return match[1]
        } else {
            return `Can't find ${regex} in the provided text content.`
        }
    }

    async getAPI() {

        const optionss = {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "cookie": this.cookie,
            },
            "method": "GET",
            "body": null,
            "referrerPolicy": "origin",
        }

        return new Promise((resolve) => {
            https.get(this.homeurl, optionss, (responseFromServer) => {
                let responseContent = "";

                if (responseFromServer.statusCode != 200)
                    resolve(`Status Code: ${responseFromServer.statusCode}`)

                responseFromServer.on("data", (chunk) => {
                    responseContent += chunk;
                });

                responseFromServer.on("end", () => {
                    let SNlM0e = this.searchInText(responseContent, /"SNlM0e":"([^"]*)"/);
                    let cfb2h = this.searchInText(responseContent, /"cfb2h":"([^"]*)"/);
                    this.snlm0e = SNlM0e;
                    this.cfb2h = cfb2h;
                    resolve({
                        snlm0e: SNlM0e,
                        cfb2h: cfb2h,
                    })
                });
            })
        })
    }

    async ask(prompt) {
        let req = [null, JSON.stringify([[prompt], ["en"], ["", "", ""]])]
        req = encodeURIComponent(JSON.stringify(req));

        let at = encodeURIComponent(this.snlm0e);

        const postBody = `f.req=${req}&at=${at}`

        const optionss = {
            "headers": {
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded;",
                "cookie": this.cookie
            },
            "method": "POST",
        }

        var uri = this.chaturl + this.cfb2h;

        return new Promise((resolve) => {
            const request = https.request(uri, optionss, (response) => {
                let responseText = "";

                if (response.statusCode != 200)
                    console.log("Server returned status code " + response.statusCode)

                response.on("data", (chunk) => {
                    responseText += chunk;
                });

                response.on("end", () => {
                    var data = responseText;

                    try {
                        let message = JSON.parse(data.slice(data.indexOf("wrb.fr") - 3))[0][2];
                        message = JSON.parse(message);

                        resolve(message[4][0][1][0])
                    }
                    catch (e) {
                        resolve("Can't get response, please check your value")
                    }

                });
            });
            request.write(postBody);

            request.end();
        })
    }
}

module.exports = {
    ChatBot
}