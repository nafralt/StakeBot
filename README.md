# StakeBot

A simple Discord bot in JS that notifies when a table tennis match has reached 2 sets to 0 in a discussion channel.


# Installation

Clone the repos :

`> git clone https://github.com/nafralt/StakeBot.git`

`> cd StakeBot`

Install dependencies :

`> npm i`

# To do before running

First, install the latest version of Google Chrome if you haven't already. Then, using Google Chrome, go to stake.bet, solve the captchas, and switch the website to French. After that, add the configuration informations in the file `config.json`. You can find Google informations by searching `chrome://version/`.
```json
{
    "googleChromeExePath" : "",
    "googleChromeDataDirPath" : "",
    "botToken" : "",
    "channelID" : ""
}
``` 

For example :

```json
{
    "googleChromeExePath" : "C://Program Files//Google//Chrome//Application//chrome.exe",
    "googleChromeDataDirPath" : "C://Users//User//AppData//Local//Google//Chrome//User Data//Default",
    "botToken" : "xxxxxxqpV3gY8eE20",
    "channelID" : "11260377818xxxx"
}
``` 

**WARNING : Use double slashes only if you are on a Windows system.**

# Run

`> node index.js`

# How does it work ?

Stake.bet does not provide an API to retrieve real-time match data, or if they do, it would require using a paid API that comes with limitations on the number of requests. To work around this issue, I used web scraping. However, the website is protected by Cloudflare, which makes it challenging to scrape information without being detected. Therefore, I decided to mimic a genuine user by leveraging the data directory of a human user using Puppeteer.

