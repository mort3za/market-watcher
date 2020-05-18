const serviceTelegram = require("./api-telegram.js").service;
const TELEGRAM_NOTIFY_GROUP_CHAT_ID = process.env.TELEGRAM_NOTIFY_GROUP_CHAT_ID;

exports.service = {
  async sendNotifications({ telegram = true, text = "" }) {
    if (telegram) {
      try {
        await serviceTelegram.sendMessage({
          text,
          chat_id: TELEGRAM_NOTIFY_GROUP_CHAT_ID,
        });
        console.log("sent?!!!!!!");
      } catch (error) {
        console.log("error", error);
      }
    }
  },
};
