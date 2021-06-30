'use strict'

const { validate } = use('Validator')

const Todo = use('App/Models/Todo')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index ({ request, response, view}) {
    const todos = await Todo.query().with('user').fetch();
    try {
      if(((todos.rows).length) ===0){
        return response.json({msg:'there is no task in a list!'})
      }
      return response.json(todos);
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Render a form to be used for creating a ne:w todo.
   * GET todos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const rules = {
      title: 'required|min:3',
    }
    const messages = {
      'title.required': 'Title field is require, Please add title!',
      'title.min':'Required title must be atleast 3 characters long'
    }
    const validation = await validate(request.all(), rules, messages);
    if (validation.fails()){
      return validation.messages()
    }
    const { title, description } = request.all();
    const { id } = auth.user;
    const todo = await Todo.create({
      title: title,
      description: description,
      user_id: id
    })
    return response.status(200).json(todo)
  }

  /**
   * Display a single todo.
   * GET todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const todo = await Todo.find(params.id)
    return response.status(200).json(todo)
  }

  /**
   * Render a form to update an existing todo.
   * GET todos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update todo details.
   * PUT or PATCH todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const rules = {
      title: 'required|min:3',
    }
    const messages = {
      'title.required': 'Title field is require, Please add title!',
      'title.min':'Required title must be atleast 3 characters long'
    }
    const validation = await validate(request.all(), rules, messages);
    if (validation.fails()){
      return response.status(401).send({message: validation.messages()})
    }
    const todo = await Todo.find(params.id)
    try {
      if(!todo){
        return response.json({message: `todo not found by this id:${params.id}`})
      }
      const { title, description } = request.all()
      todo.title = title
      todo.description = description
      await todo.save()
      return response.status(200).json(todo,{msg:'updated successfully'})
    }catch (error) {
      return response.status(401).json(error)
    }
  }
  /**
   * Delete a todo with id.
   * DELETE todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const todo = await Todo.find(params.id)
    if(!todo){
      return response.status(400).json({message:`Todo not found with this Id ${params.id}!`})
    }
    await todo.delete()
    return response.status(200).json({message:'Deleted succcessfully'})
  }
}

module.exports = TodoController
