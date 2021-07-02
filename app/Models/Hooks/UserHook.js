'use strict'

const Encryption = use('Encryption')

const Hash = use('Hash')

const UserHook = exports = module.exports = {}

UserHook.hashPhone = async (user) => {
  user.phone = await Encryption.encrypt(user.phone)
}

UserHook.DecryptPhone = async(user) => {
    user.phone = await Encryption.decrypt(user.phone)
}