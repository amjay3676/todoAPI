const Event = use('Event')

Event.on('new::user', async (user) => {
    
    console.log(`listner is listening event, user is registered successfully ${user.phone}`);
})
Event.on('new::user', 'User.print')