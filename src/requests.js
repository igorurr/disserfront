
const request = ( url, method, data ) => {}

export default {
  chat: {
    messages: {
      list: (startMessageId=null, count=50) => 
        request('chat/messages', 'get', { startMessageId, count }),
      create: (message) => 
        request('chat/messages', 'post', { message }),
    }
  }
}