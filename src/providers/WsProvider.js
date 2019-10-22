import React, { Component } from 'react'
import get from 'lodash/get'
import merge from 'lodash/merge'
import unset from 'lodash/unset'

export const WsContext = createContext({})

// должен быть какой то класс который реализует интерфейс вебсокета как рест
// где нибудь в проекте при загрузке аппликейшна делаем урлы как в джанге и обработчики
// которые будут выполнять шото в этот момент

class WsProvider extends Component {

  ws = null

  onopen = function(e) {
    console.log("ws: opened");
  };
  
  onmessage = async function(event) {
    const {path, method, data} = event.data
    const cb = get(this.state.methods, [path, method])
    console.log(`ws receive: ${event}, ${{cb}}`)
    if(!cb) {
      this.ws.send({path, method, data: null})
      return
    }

    this.ws.send({path, method, data: await cb(data)})
  };
  
  onclose = function(event) {
    if (event.wasClean) {
      console.log(`ws closed код=${event.code} причина=${event.reason}`);
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log('ws rejected');
    }
  };

  componentDidMount() {
    this.ws = new WebSocket("ws://127.0.0.1/ws")
    if(!this.ws) return
    this.ws.onopen = this.onopen
    this.ws.onmessage = this.onmessage
    this.ws.onclose = this.onclose
  }

  componentWillUnmount() {
    // метод на закрытие сокета
  }

  render() {
    const context = {
      subscribe: (path, method, cb) => {
        console.log(`ws subscribed: ${{path, method, cb}}`)
        this.setState( 
          ({ methods, ...state }) => ({ ...state, methods: merge(methods, { [path]: { [method]: cb } }) })
        )
      },
      unsubscribe: (path, method) => {
        console.log(`ws unsubscribed: ${{path, method}}`)
        this.setState( 
          ({ methods, ...state }) => ({ ...state, methods: unset(methods, [path, method]) })
        )
      }
    }

    return (
      <WsContext.Provider value={context}>{this.props.children}</WsContext.Provider>
    )
  }
}

export default WsProvider