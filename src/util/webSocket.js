export default class WebSocketClient {
    constructor(serverUrl) {
        this.serverUrl = serverUrl;
        this.webSocket = null;
    }

    connect() {
        this.webSocket = new WebSocket(this.serverUrl);

        this.webSocket.onopen = () => {
            console.log('WebSocket connection successful');
            this.send('ping');
        };

        this.webSocket.onmessage = (event) => {
            console.log('Message received from server:', event.data);
        };

        this.webSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.webSocket.onclose = (e) => {
            console.log('WebSocket connection closed', e);
            // Implement reconnection logic here if necessary
        };
    }

    send(message) {
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(message);
        } else {
            console.log('WebSocket is not ready.');
        }
    }

    disconnect() {
        if (this.webSocket) {
            this.webSocket.close();
        }
    }
}