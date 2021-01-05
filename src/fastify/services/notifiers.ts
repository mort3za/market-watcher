// telegram
import serviceTelegram from "./api-telegram";
import servicePushAlert from "../components/notifiers/api-push-alert";
// sms
import serviceKavenegar from "./api-kavenegar";
const RECEPTORS = (process.env.KAVENEGAR_NOTIFY_NUMBERS || "")
  .split(",")
  .join(",");
const TELEGRAM_NOTIFY_GROUP_CHAT_ID = process.env.TELEGRAM_NOTIFY_GROUP_CHAT_ID;

export function sendNotifications({
  telegram_chat_id = TELEGRAM_NOTIFY_GROUP_CHAT_ID,
  title = "",
  text = "",
  telegram = false,
  push = false,
  sms = false,
}): Promise<Object>[] {
  let promise1;
  if (telegram) {
    try {
      promise1 = serviceTelegram.sendMessage({
        text,
        chat_id: telegram_chat_id,
      });
    } catch (error) {
      console.log("Telegram notify error", error);
    }
  }

  let promise2;
  if (push) {
    try {
      promise2 = servicePushAlert.sendMessage({ text, title });
    } catch (error) {
      console.log("Push notify error", error);
    }
  }

  let promise3;
  if (sms) {
    try {
      promise3 = serviceKavenegar.sendMessage({ text, receptors: RECEPTORS });
    } catch (error) {
      console.log("SMS notify error", error);
    }
  }

  return [promise1, promise2, promise3];
}
