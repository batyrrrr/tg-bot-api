const { getAxiosInstance } = require('./axios')
const { errorHandler } = require('./helper')

const MY_TOKEN = process.env.TELE_BOT_TOKEN;

const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);

function sendMessage(chatId, messageText) {
  return axiosInstance
    .get("sendMessage", {
      chat_id: chatId || '',
      text: messageText
    })
    .catch((ex) => {
      errorHandler(ex, "sendMessage", "axios");
    })
}

async function handleMessage(messageObj) {
  const messageText = messageObj.text || '';
  if (!messageText) {
    errorHandler("No message text", "handleMessage");
    return "";
  }

  try {
    const chatId = messageObj.chat.id;
    console.log(chatId)
    if (chatId === "871278491") {
      if (messageText.charAt(0) === '/') {
        const command = messageText.substr(1);
        switch (command) {
          case "start":
            return sendMessage(
              chatId,
              'Добро пожаловать на Батыр бот'
            );
          default:
            return sendMessage(chatId, 'Хей, я незнаю такую команду')
        }
      } else {
        return sendMessage(chatId, messageText)
      }

    } else {
      return sendMessage(chatId, 'Бот доступен только для админа')
    }

  } catch (error) {
    errorHandler(error, "handleMessage")
  }
}

module.exports = { sendMessage, handleMessage }