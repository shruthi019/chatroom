const express = require('express')
const socketio = require('socket.io')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running")
})

// initializing socket for the server
const io = socketio(server)

io.on('connection', socket => {
    console.log("New user connected")
    socket.username = "Anon"
    socket.on('change_username', data => {
        socket.username = data.username
    })

    // handle new message event
    socket.on('new_message', data => {
        console.log('New message')
        io.sockets.emit('receive_message', {message: data.message, username: socket.username})
    })
})
