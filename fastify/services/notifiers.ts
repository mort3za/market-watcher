// telegram
import serviceTelegram from "./api-telegram.js";
import servicePushAlert from "./api-push-alert.js";
// sms
import serviceKavenegar from "./api-kavenegar.js";
const RECEPTORS = (process.env.KAVENEGAR_NOTIFY_NUMBERS || "")
  .split(",")
  .join(",");
const TELEGRAM_NOTIFY_GROUP_CHAT_ID = process.env.TELEGRAM_NOTIFY_GROUP_CHAT_ID;

export async function sendNotifications({
  telegram_chat_id = TELEGRAM_NOTIFY_GROUP_CHAT_ID,
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
        chat_id: telegram_chat_id,
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
}
