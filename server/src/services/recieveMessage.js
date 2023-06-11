const whatsAppClient = require('@green-api/whatsapp-api-client');
const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

app.use(express.json({ limit: '50mb' }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: 'http://localhost:5173',
  methods: ['GET', 'POST'],
});

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    console.log(room);
    socket.join(room);
  });

  socket.on(
    'receiveNotification',
    ({ idInstance, ApiTokenInstance, number }) => {
      receiveMessage(JSON.stringify(idInstance), ApiTokenInstance, number);
    }
  );
});

server.listen(3000, () => console.log('listening 3000'));

async function receiveMessage(idInstance, apiTokenInstance, number) {
  // Start Receiving Notifications
  const restAPI = whatsAppClient.restAPI({
    idInstance,
    apiTokenInstance,
  });

  try {
    await restAPI.webhookService.startReceivingNotifications();
    console.log('Notifications started');
    restAPI.webhookService.onReceivingMessageText((body) => {
      console.log(body);
      const senderNumber = body.senderData.sender;
      if (senderNumber.substring(0, senderNumber.length - 5) === number) {
        const dataToSend = {
          messageId: body.idMessage,
          messageData: body.messageData.textMessageData.textMessage,
          senderData: {
            sender: senderNumber.substring(0, senderNumber.length - 5),
            senderName: body.senderData.senderName,
          },
          isYours: false,
        };
        io.to(number).emit('receivingMessage', dataToSend);
      }
    });

    return 'ok';
  } catch (ex) {
    console.log(ex);
  }
}

exports.receiveMessage = receiveMessage;
