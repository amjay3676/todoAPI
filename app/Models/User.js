'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Encryption = use('Encryption')


class User extends Model {

  todos () {
    return this.hasMany('App/Models/Todo')
  }

  static get hidden () {
    return ['password']
  }

  static boot () {

    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
     this.addHook('beforeCreate', 'UserHook.hashPhone')
     this.addHook('afterSave', 'UserHook.DecryptPhone')

  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
