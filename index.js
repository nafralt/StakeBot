var config = require('./config.json');
const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const { Client, Events, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
})
client.once(Events.ClientReady, c => {
    console.log('Bot lancé !');
});
client.login(config.botToken);

puppeteer.use(stealthPlugin());

puppeteer
.launch({headless: "new", args: [
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--deterministic-fetch',
    '--disable-features=IsolateOrigins',
    '--disable-site-isolation-trials',
] ,executablePath: config.googleChromeExePath, userDataDir: config.googleChromeDataDirPath})
.then(async (browser) => {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36');
    await page.goto("https://stake.bet/sports/coupon?tournaments=b59b1934-0973-4bb1-ada3-df1d253565da%2C0ff7b9ac-f67e-4688-80a9-6f5943d1a4fb%2Cc8da5395-3ff7-4527-ac82-b85b83bfdb72", {waitUntil: "domcontentloaded",})
    await page.waitForTimeout(2000);
    cachePers = []
    while (true) {
        const targetElements = await page.$x('//div[contains(@class, "fixture-preview") and contains(., "En Direct")]/div[contains(@class, "fixture-score")]/div[contains(@class, "fixture-score-wrapper")]/div[contains(@class, "live") and contains(., "0") and contains (., "2")]')
        cacheTemp = []
        for (const elementHandle of targetElements) {
            const parentElementHandle = await page.evaluateHandle((element) => element.parentElement.parentElement.parentElement, elementHandle);
            const hrefValue = await page.evaluate((parentElement) => {
                const childElement = parentElement.querySelector('.link.variant-subtle-link.size-md.align-left.svelte-dnj9v0');
                return childElement.getAttribute('href');
            }, parentElementHandle);
            if(!(cachePers.includes(hrefValue))) {
                cacheTemp.push(hrefValue)
            }
        }
        for(hrefValue of cacheTemp) {
            client.channels.cache.get(config.channelID).send('@everyone ALERTE 2 - 0 !!! -> https://stake.bet'+hrefValue)
            cachePers.push(hrefValue)
        }
        if(cachePers.length > 20) {
            cachePers.shift()
        }
        await page.waitForTimeout(2000);
    }
})
.catch((err) => console.log(err));