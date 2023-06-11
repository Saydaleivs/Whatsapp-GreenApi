import axios from 'axios';

export default function startReceivingNotification(
  idInstance: number,
  apiTokenInstance: string,
  number: number
) {
  return axios({
    url: 'http://localhost:8080/api/receiveMessage',
    params: { idInstance, apiTokenInstance, number },
    method: 'GET',
  });
}
