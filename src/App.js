import React from 'react';
import logo from './logo.svg';
import WsTester from './WsTester';
import './App.css';
import WsProvider from './providers/WsProvider';
import ChatProvider, { ChatContext } from './providers/ChatProvider';
import Message from './Message'

function App() {
  return (
    <div className="App">
      <WsProvider>
        <ChatProvider>
          <h1>ВЛАД ЗАЕБАЛ ДЕЛАЙ ЧАТ</h1>
          <ChatContext.Consumer>
            {({messages}) => messages.map( msg => <Message msg={msg} /> )}
          </ChatContext.Consumer>
        </ChatProvider>
      </WsProvider>
    </div>
  );
}

export default App;
