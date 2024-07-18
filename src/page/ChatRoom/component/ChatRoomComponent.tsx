import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {ListGroup} from "react-bootstrap";
import {userDto} from "../../../data/User.Type.ts";
import LoadingEffect from "./LoadingEffect.tsx";
import * as ChatApi from "../../../api/chat/chat.ts"
import {MessageDto} from "../../../data/Message.Type.ts";
import {baseUrl} from "../../../config/config.ts";


const socket = io(baseUrl);

type Props = {
  loginUser: userDto,
  receiverDto: userDto,
  room: string,
  username: string,
  uid: string,
};

const ChatRoomComponent = ({ room, username, uid, loginUser, receiverDto}: Props) => {
  const [historyMessage, setHistoryMessage] = useState<MessageDto[] | undefined>(undefined);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [message, setMessage] = useState('');

  // console.log(room, username, uid);

  useEffect(() => {
    if (room  && username){
      socket.emit('join', { room, username });

      socket.on('message', (message) => {
        console.log(message)
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.emit('leave', { room, username });
      };
    }
  }, [room, username]);

  useEffect(()=>{
    fetchHistoryMessages()
  }, []);

  const fetchHistoryMessages = async () => {
    const temMessagesDto = await ChatApi.getMessages(room);
    setHistoryMessage(temMessagesDto);
    console.log(temMessagesDto)
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    if (username != undefined) {
      console.log("Received message:", message);
      e.preventDefault();
      const newMessage = {username, content: message, uid};
      socket.emit('message', {room, message: newMessage});

      console.log(messages)
      setMessage('');
    }
  };

  return (
    <>
      <ListGroup className="mb-3">
        <ListGroup.Item variant="success" style={{display: 'flex', alignItems: 'center'}}>
          {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
          {/*     className="bi bi-person-circle" viewBox="0 0 16 16">*/}
          {/*  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>*/}
          {/*  <path fill-rule="evenodd"*/}
          {/*        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>*/}
          {/*</svg>*/}
          <strong>{receiverDto.username}</strong>
        </ListGroup.Item>

        {
          historyMessage
          ? historyMessage.map((msg, index) => {
            if (msg.username === 'system') {
              return <ListGroup.Item key={index + 'history'} variant="info" style={{display: 'flex', justifyContent: 'center'}}>
                {msg.content}
              </ListGroup.Item>
            } else if (msg.username === loginUser.username) {
              return (
                <ListGroup.Item key={index + 'history'} style={{display: 'flex', justifyContent: 'end'}}>
                  {msg.content}
                </ListGroup.Item>
              )
            } else {
              return(
                <ListGroup.Item key={index + 'history'}>
                  <strong>{msg.username}: </strong>{msg.content}
                </ListGroup.Item>
              )
            }
          })
          : <LoadingEffect/>
        }

        {
          messages.length < 1
          && <ListGroup.Item style={{display: 'flex', justifyContent: 'center'}}>
                <LoadingEffect/>
            </ListGroup.Item>
        }

        {username && messages.map((msg, index) => {
          if (msg.username === 'system') {
            return <ListGroup.Item variant="info" style={{display: 'flex', justifyContent: 'center'}}>
              {msg.content}
            </ListGroup.Item>
          } else if (msg.username === loginUser.username) {
            return (
              <ListGroup.Item key={index} style={{display: 'flex', justifyContent: 'end'}}>
                {msg.content}
              </ListGroup.Item>
            )
          } else {
            return(
              <ListGroup.Item key={index}>
                <strong>{msg.username}: </strong>{msg.content}
              </ListGroup.Item>
            )
          }
        })}
      </ListGroup>

      <Form onSubmit={sendMessage} className="d-flex">
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="me-2"
        />
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </>
  );
};

export default ChatRoomComponent;
