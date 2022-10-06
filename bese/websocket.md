## websocket
* 101代表协议转换
* connection: upgrade 协议升级
* upgrade: 必须设置Websocket，表示希望升级到Websocket协议
* WebSocket 也要有一个握手过程，然后才能正式收发数据
* HTTP/1.1 101 Switching Protocols：表示服务端接受 WebSocket 协议的客户端连接
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```