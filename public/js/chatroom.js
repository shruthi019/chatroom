(function connect() {
    let socket = io.connect('http://localhost:3000')

    let username = document.querySelector('#username')
    let usernameButton = document.querySelector('#usernameButton')
    let curUsername = document.querySelector('.card-header')

    usernameButton.addEventListener('click', e => {
        console.log(username.value)
        socket.emit('change_username', {username: username.value})
        curUsername.textContent = username.value
        username.value = ''
    })

    let message = document.querySelector('#message')
    let messageButton = document.querySelector('#messageButton')
    let messageList = document.querySelector('#message-list')

    messageButton.addEventListener('click', e => {
        console.log(message.value)
        socket.emit('new_message', {message: message.value})
        message.value = ''
    })

    socket.on('receive_message', data => {
        console.log(data)
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ': ' + data.message
        listItem.classList.add('list-group-item')
        messageList.appendChild(listItem)
    })

})()