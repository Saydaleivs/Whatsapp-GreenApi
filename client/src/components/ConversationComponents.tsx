import * as React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import sendMessage from '../services/sendMessage';
import { MessageNotification } from '../types';
import * as io from 'socket.io-client';
import { getChatHistory } from '../services/getChatHistory';
const URL = 'http://localhost:3000';
const socket = io.connect(URL);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  flex: 2;
  background: #f6f7f8;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #ededed;
  padding: 15px;
  align-items: center;
  gap: 10px;
`;

const ChatBox = styled.div`
  display: flex;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  bottom: 0;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  background: url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg');
`;

const MessageDiv = styled('div')<{ isYours: boolean }>`
  justify-content: ${({ isYours }) => (isYours ? 'flex-end' : 'flex-start')};
  display: flex;
  margin: 5px 16px;
`;

const Message = styled('div')<{ isYours: boolean }>`
  background: ${({ isYours }) => (isYours ? '#daf8cb' : 'white')};
  max-width: 50%;
  color: #303030;
  padding: 8px 10px;
  font-size: 19px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 16px;
  width: 100%;
  padding: 20px 0;
`;

const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding-left: 15px;
  font-size: 17px;
  margin-left: 10px;
`;

export default function ConversationComponent({ number }) {
  const [message, setMessage] = React.useState<string>('');
  const [chats, setChats] = React.useState<MessageNotification[]>([]);
  const ApiTokenInstance: string =
    localStorage.getItem('ApiTokenInstance') || '';
  const idInstance: number = JSON.parse(
    localStorage.getItem('idInstance') || ''
  );

  function send() {
    if (message === '') return;

    sendMessage(idInstance, ApiTokenInstance, number, message)
      .then((res) => {
        setChats([
          ...chats,
          {
            messageId: res.data.idMessage,
            messageData: message,
            senderData: {
              sender: '',
              senderName: '',
            },
            isYours: true,
          },
        ]);
        setMessage('');
      })
      .catch((err) => console.log(err));
  }

  async function reveive(message: MessageNotification) {
    setChats((prev) =>
      [...prev, message].filter(
        (obj, index) =>
          [...prev, message].findIndex(
            (item) => item.messageId === obj.messageId
          ) === index
      )
    );
  }

  const dummy = React.useRef(document.createElement('div'));
  React.useEffect(() => {
    if (chats.length !== 0)
      dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  React.useEffect(() => {
    socket.emit('join', number);

    socket.on('receivingMessage', (socket) => {
      reveive(socket);
    });
  }, [socket, number]);

  React.useEffect(() => {
    getChatHistory(idInstance, ApiTokenInstance, number).then((res) => {
      setChats(res);
    });

    socket.emit('receiveNotification', {
      idInstance,
      ApiTokenInstance,
      number,
    });
  }, [number]);

  return (
    <>
      {number === '' ? (
        <h1>nothing</h1>
      ) : (
        <>
          <Container>
            <ProfileHeader>
              <div>+{number}</div>
            </ProfileHeader>
            <MessageContainer>
              {chats &&
                chats?.map((messageData, index) => (
                  <div key={index}>
                    <MessageDiv isYours={messageData.isYours}>
                      <Message isYours={messageData.isYours}>
                        {[messageData.messageData]}{' '}
                      </Message>
                    </MessageDiv>
                  </div>
                ))}
              <div ref={dummy} />
            </MessageContainer>
            <ChatBox>
              <SearchContainer>
                <SearchInput
                  onChange={(e: React.SyntheticEvent) =>
                    setMessage((e.target as HTMLTextAreaElement).value)
                  }
                  value={message}
                  placeholder='Type a message'
                />
                <Button
                  style={{
                    backgroundColor: '#daf8cb',
                    color: '#303030',
                    marginRight: 25,
                    display: message === '' ? 'none' : 'flex',
                  }}
                  variant='contained'
                  onClick={send}
                >
                  Send
                </Button>
              </SearchContainer>
            </ChatBox>
          </Container>
        </>
      )}
    </>
  );
}
