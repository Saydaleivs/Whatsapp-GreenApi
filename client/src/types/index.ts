export type MessageNotification = {
  messageId: string;
  messageData: string;
  senderData: {
    sender: string;
    senderName: string;
  };
  isYours: boolean;
};
