import React, { Component } from 'react'


class WsTester extends Component {

  ws = null

  onopen = function(e) {
    console.log("[open] Соединение установлено");
    console.log("Отправляем данные на сервер");
    this.socket.send("Меня зовут Джон");
  };
  
  onmessage = function(event) {
    console.log(`[message] Данные получены с сервера: ${event.data}`);
  };
  
  onclose = function(event) {
    if (event.wasClean) {
      console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log('[close] Соединение прервано');
    }
  };

  componentDidMount() {
    this.ws = new WebSocket("ws://127.0.0.1:8080/")
    if(!this.ws) return
    this.ws.onopen = this.onopen
    this.ws.onmessage = this.onmessage
    this.ws.onclose = this.onclose
    this.ws.send('kukuepta')
  }

  render() {

    return <p>Websocket runned</p>
  }
}

export default WsTester