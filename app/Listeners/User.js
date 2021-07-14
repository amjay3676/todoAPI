'use strict'

const User = exports = module.exports = {}

User.print = async (user) => {
    console.log(`here is user ${user.name}`);
}


User.getListCount = async (user) => {
    console.log(Event.listenersCount('new::user'))
}
