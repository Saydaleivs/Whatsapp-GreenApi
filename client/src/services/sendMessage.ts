import axios from 'axios';

export default async function sendMessage(
  idInstance: number,
  apiTokenInstance: string,
  tel: number,
  msg: string
) {
  return await axios({
    method: 'POST',
    url: `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    data: {
      chatId: `${tel}@c.us`,
      message: `${msg}`,
    },
  });
}
