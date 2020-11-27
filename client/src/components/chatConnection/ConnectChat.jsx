import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';

const CHAT_MESSAGE_EVENT = 'ChatMessage';

const ConnectChat = (chatId) => {
    
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('http://localhost:3001', {
            query: {chatId}
        });

        socketRef.current.on(CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessages = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessages]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [chatId]);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    };

    return { messages, sendMessage };
};

export default ConnectChat;