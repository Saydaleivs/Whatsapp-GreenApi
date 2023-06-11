import axios from 'axios';
import { MessageNotification } from '../types';

export async function getChatHistory(
  idInstance: number,
  apiTokenInstance: string,
  number: number
) {
  return axios({
    method: 'POST',
    url: `https://api.green-api.com/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
    data: {
      chatId: `${number}@c.us`,
      count: 12,
    },
  }).then((res) => {
    const chatHistory: MessageNotification[] = [];
    for (let i = res.data.length - 1; i >= 0; i--) {
      const m = res.data[i];
      chatHistory.push({
        messageId: m.idMessage,
        messageData: m.textMessage,
        senderData: {
          sender: m.senderId,
          senderName: m.senderName,
        },
        isYours: m.senderId === number + '@c.us' ? false : true,
      });
    }
    return chatHistory;
  });
}
