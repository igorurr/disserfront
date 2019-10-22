import React, { Component } from 'react'
import get from 'lodash/get'
import merge from 'lodash/merge'
import unset from 'lodash/unset'
import { WsContext } from './WsProvider'
import requests from '../requests'

export const ChatContext = createContext({})

class InnerChatProvider extends Component {



  onGetMessages(newMessages) {
    this.setState( ({messages}) => ([ ...messages, ...newMessages ]) )
    return { status: 200 }
  }

  async requestLastMessages() {
    const messages = await requests.chat.messages.list()
    this.setState( { messages } )
  }

  componentDidMount() {
    this.props.wsContext.subscribe( 'chat/messages', 'get', this.onGetMessages )
    this.requestLastMessages()
  }

  componentWillUnmount() {
    this.props.wsContext.unsubscribe( 'chat/messages', 'get' )
  }

  render() {
    const context = {messages: this.state.messages}
    return (
      <ChatContext.Provider value={context}>{this.props.children}</ChatContext.Provider>
    )
  }
}

const ChatProvider = props => (
  <WsContext.Consumer>
    {wsContext => (
      <InnerChatProvider {...props} wsContext={wsContext} />
    )}
  </WsContext.Consumer>
)

export default ChatProvider