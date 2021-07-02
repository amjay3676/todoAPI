'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodoSchema extends Schema {
  up () {
    this.create('todos', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('description')
      table.integer('user_id')
        .references('id')
        .inTable('users')
      table.timestamps()
    })
    // this.alter('users', (table) => {
    //   table.integer('user_id')
    //     .references('id')
    //     .inTable('users')
    // })
  }

  down () {
    this.drop('todos')
  }
}

module.exports = TodoSchema
