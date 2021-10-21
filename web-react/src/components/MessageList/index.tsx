import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { api } from '../../services/api';

import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';

type Message = {
  id: string;
  created_at: string;
  text: string;
  user: {
    avatar_url: string;
    login: string;
    name?: string;
  };
}

const messagesQueue: Message[] = [];

const socket = io('http://localhost:3333');

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    api.get<Message[]>('/messages/last3').then(response => {
      setMessages(response?.data);
    })
  }, []);

  useEffect(() => {
    setInterval(() => {
      if(messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean));

        messagesQueue.shift();
      }
    }, 3000);
  }, []);
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map(message => (
          <li className={styles.message} key={message.id}>
            <p className={styles.messageContent}>{message.text}</p>

            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.login} />
              </div>
              <span>
                { message.user.name 
                ? message.user.name
                : message.user.login
                }
                </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}