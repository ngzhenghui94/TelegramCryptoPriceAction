import moment from "moment-timezone";
moment.tz.setDefault("Asia/Singapore");
import schedule from "node-schedule";
import dotenv from "dotenv";
dotenv.config();
import { channelID, apiUrls, cryptoTickers } from "./constants.js";
import axios from "axios";

/**
 * It sends a message to the channelID every 60 seconds.
 * @param bot - The bot object
 */
export const msgSender = async (bot) => {
  schedule.scheduleJob("*/60 * *  * * *", async () => {
    for (let i = 0; i < apiUrls.length; i++) {

      axios.get(apiUrls[i]).then(async (response) => {
        let price = response.data[0].current_price;
        let percentChange = response.data[0].price_change_percentage_24h;
        let high24h = response.data[0].high_24h;
        let low24h = response.data[0].low_24h;
        bot.sendMessage(
          channelID[i],
          `⬢ ${cryptoTickers[i]}/USD Price: $${price}\n⬢ 24H Low/24H High: $${low24h} / $${high24h}\n⬢ 24H Price Change: ${percentChange}%`
        );
      });
    }
  });
};

