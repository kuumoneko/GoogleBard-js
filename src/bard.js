
import vm from "vm";
import https from "https";
import { load } from "cheerio";
import axios from "axios";

export class ChatBot {
    options;
    axios;
    cookies = "";
	constructor(cookies) {
		this.cookies = cookies;
		
        const agent = new https.Agent({
            rejectUnauthorized: false,
		});
		
        const axiosOptions = {
            httpsAgent: agent,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                TE: "trailers",
            },
		};
		
        this.axios = axios.create(axiosOptions);
    }
    ParseResponse(text) {
		let responses = [];
        try {
            let parseData = (data) => {
                if (typeof data === "string") {
                    if (data?.startsWith("c_") || data?.startsWith("r_") || data?.startsWith("rc_")) {
                        return;
                    }
                    responses.push(data);
                }
                if (Array.isArray(data)) {
                    data.forEach((item) => {
                        parseData(item);
                    });
                }
            };
            try {
                const lines = text.split("\n");
                for (let i in lines) {
                    const line = lines[i];
                    if (line.includes("wrb.fr")) {
                        let data = JSON.parse(line);
                        let responsesData = JSON.parse(data[0][2]);
                        responsesData.forEach((response) => {
                            parseData(response);
                        });
		
                    }
                }
            }
            catch (e) {
                throw new Error(`Error parsing response: make sure you are using the correct cookie, copy the value of "__Secure-1PSID" and "__Secure-1PSIDTS" cookie and set it like this: \n\nnew Bard("__Secure-1PSID=<COOKIE_VALUE>;__Secure-1PSIDTS=<COOKIE_VALUE>")\n\nAlso using a US proxy is recommended.\n\nIf this error persists, please open an issue on github.\nhttps://github.com/kuumoneko/GoogleBard-js`);
            }
        }
        catch (err) {
            throw new Error(`Error parsing response: make sure you are using the correct cookie, copy the value of "__Secure-1PSID" and "__Secure-1PSIDTS" cookie and set it like this: \n\nnew Bard("__Secure-1PSID=<COOKIE_VALUE>;__Secure-1PSIDTS=<COOKIE_VALUE>")\n\nAlso using a US proxy is recommended.\n\nIf this error persists, please open an issue on github.\nhttps://github.com/kuumoneko/GoogleBard-js`);
        }
        return responses
	}
	
    async getAPI() {
        try {
            const response = await this.axios.get("https://bard.google.com", {
                headers: {
                    Cookie: this.cookies,
                },
            });
            let $ = load(response.data);
            let script = $("script[data-id=_gd]").html();
            script = script.replace("window.WIZ_global_data", "googleData");
            const context = { googleData: { cfb2h: "", SNlM0e: "" } };
            vm.createContext(context);
            vm.runInContext(script, context);
            const at = context.googleData.SNlM0e;
			const bl = context.googleData.cfb2h;
			this.snlm0e = at;
            this.cfb2h = bl;
            if (at !== undefined && bl !== undefined) {
                return { at, bl };
            }
            else {
                throw new Error(`Error parsing response: make sure you are using the correct cookie, copy the value of "__Secure-1PSID" and "__Secure-1PSIDTS" cookie and set it like this: \n\nnew Bard("__Secure-1PSID=<COOKIE_VALUE>;__Secure-1PSIDTS=<COOKIE_VALUE>")\n\nAlso using a US proxy is recommended.\n\nIf this error persists, please open an issue on github.\nhttps://github.com/kuumoneko/GoogleBard-js`);
            }
        }
        catch (e) {
            throw new Error(`Error parsing response: make sure you are using the correct cookie, copy the value of "__Secure-1PSID" and "__Secure-1PSIDTS" cookie and set it like this: \n\nnew Bard("__Secure-1PSID=<COOKIE_VALUE>;__Secure-1PSIDTS=<COOKIE_VALUE>")\n\nAlso using a US proxy is recommended.\n\nIf this error persists, please open an issue on github.\nhttps://github.com/kuumoneko/GoogleBard-js`);
        }
    }
    async ask(prompt) {
        let resData = await this.send(prompt);
        return resData[3];
	}
	
    async askStream(data, prompt) {
        let resData = await this.send(prompt);
        if (!resData)
            return "";
        if (!resData[3])
            return "";
        let responseChunks = resData[3].split(" ");
        for await (let chunk of responseChunks) {
            if (chunk === "")
                continue;
            data(`${chunk} `);
            await this.sleep(this.random(25, 250));
        }
        return resData[3];
	}
	
    async send(prompt) {
		try {
			let req = [null, JSON.stringify([[prompt], ["en"], ["", "", ""]])];
			const moi = JSON.stringify(req);
            const response = await this.axios.post("https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate", new URLSearchParams({
                at: this.snlm0e,
                "f.req": moi,
            }), {
                headers: {
                    Cookie: this.cookies,
                },
                params: {
                    bl: this.cfb2h,
                    rt: "c",
                    _reqid: "0",
                },
			});
            let parsedResponse = this.ParseResponse(response.data);
            return parsedResponse;
        }
        catch (e) {
            console.log(e.message);
        }
	}
	
	async sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}