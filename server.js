const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

const clients = new Set()

wss.on('connection', (ws) => {
    console.log('New client connected')
    clients.add(ws)

    ws.on('message', (message) => {
        console.log(`Recieved message ${message}`)

        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
    })
})

console.log('WebSocket server is running on ws://localhost:8080')