# Market Watcher

Watch cryptocurrency markets and receive notifications when there is differences in their prices.

## Supported Markets

Currently Nobitext and Exir are supported but you can easily add your own APIs

## Usage

1. Add your own `.env` file
2. Create a Telegram group and a bot using Telegram's BotFather, then add the bot to your new group
3. Run this project on vercel.com or other similar serverless services
4. Run a GET request for https://YOUR_PROJECT/watch every 5 or 10 minutes using an external service (e.g. [Uptime Robot](https://uptimerobot.com/))
5. Wait for recieving a notification in your configured Telegram group
