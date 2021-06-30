'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserInTodoSchema extends Schema {
  up () {
    this.table('todos', (table) => {
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('todos', (table) => {
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserInTodoSchema
