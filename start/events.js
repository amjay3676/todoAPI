const Event = use('Event')

Event.on('new::user', async (user) => {
        console.log(`listner is listening event, user is registered successfully ${user.phone}`);
})
Event.on('new::user', 'User.print')

//call array of listeners
Event.on('new::user', ['User.print', 'Log.getListCount'])

// Event.removeListener('new::user', 'User.print')
// console.log(Event.getListeners('new::user'))
// console.log(Event.listenersCount('new::user'))
// console.log(Event.hasListeners('new::user'))
