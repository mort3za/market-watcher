# Market Watcher

Watch cryptocurrency markets and receive notifications when there is differences in their prices.

<img src="https://user-images.githubusercontent.com/510242/92992737-5a2f2400-f502-11ea-92a0-e1fc9161543a.png" alt="Telegram group notifications" />

## Supported Markets

Currently Nobitext and Exir are supported. You can add your own APIs if you want (PRs are welcome!)

## Usage

1. Add your own `.env` file
2. Create a Telegram group and a bot using Telegram's BotFather, then add the bot to your new group
3. Run this project on vercel.com or other similar serverless services
4. Run a GET request for https://YOUR_PROJECT/watch every 5 or 10 minutes using an external service (e.g. [Uptime Robot](https://uptimerobot.com/))
5. Wait for recieving a notification in your configured Telegram group
