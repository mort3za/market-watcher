// telegram
const serviceTelegram = require("./api-telegram.js").service;
const servicePushAlert = require("./api-push-alert.js").service;
const TELEGRAM_NOTIFY_GROUP_CHAT_ID = process.env.TELEGRAM_NOTIFY_GROUP_CHAT_ID;
// sms
const serviceKavenegar = require("./api-kavenegar.js").service;
const RECEPTORS = process.env.KAVENEGAR_NOTIFY_NUMBERS.split(",").join(",");

exports.service = {
  async sendNotifications({
    title = "",
    text = "",
    telegram = false,
    push = false,
    sms = false,
  }) {
    if (telegram) {
      try {
        await serviceTelegram.sendMessage({
          text,
          chat_id: TELEGRAM_NOTIFY_GROUP_CHAT_ID,
        });
      } catch (error) {
        console.log("Telegram notify error", error);
      }
    }

    if (push) {
      try {
        await servicePushAlert.sendMessage({ text, title });
      } catch (error) {
        console.log("Push notify error", error);
      }
    }

    if (sms) {
      try {
        await serviceKavenegar.sendMessage({ text, receptors: RECEPTORS });
      } catch (error) {
        console.log("SMS notify error", error);
      }
    }
  },
};
