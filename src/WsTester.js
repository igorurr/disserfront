import React, { Component } from 'react'


class WsTester extends Component {

  ws = null

  constructor(props) {
    super(props)

    this.onopen = this.onopen.bind(this)
    this.onmessage = this.onmessage.bind(this)
    this.onclose = this.onclose.bind(this)
  }

  onopen = function(e) {
    console.log("[open] Соединение установлено", e, this, this.ws);
    console.log("Отправляем данные на сервер");
    this.ws.send('kukuepta')
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
    this.ws = new WebSocket("ws://localhost/ws")
    if(!this.ws) return
    this.ws.onopen = this.onopen
    this.ws.onmessage = this.onmessage
    this.ws.onclose = this.onclose
  }

  render() {

    return <p>Websocket runned</p>
  }
}

export default WsTester