import React from 'react';
import logo from './logo.svg';
import WsTester from './WsTester';
import './App.css';
import WsProvider from './providers/WsProvider';
import ChatProvider, { ChatContext } from './providers/ChatProvider';

function Message(({userName, message})) {
  return (
    <div className="message">
      <h6>{userName}</h6>
      <p>{message}</p>
    </div>
  );
}

export default AMessagepp;
