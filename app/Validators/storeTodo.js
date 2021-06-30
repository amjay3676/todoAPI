'use strict'

class storeTodo {
  get rules () {
    return {
      addtodo: 'required|min:3',
    }
  }
  get messages () {
    return {
      'addtodo.required': 'Title field is require, Please add title!',
      'addtodo.min':'Required title must be atleast 3 characters long'
    }
  }
}

module.exports = storeTodo
