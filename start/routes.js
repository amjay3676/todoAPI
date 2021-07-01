'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')
Route.get('/', async({ response }) =>{
    return response.redirect('/api/v1/todos')
})

Route.group(() => {
    Route.get('', 'TodoController.index')
    Route.post('', 'TodoController.store')
    Route.get('/:id', 'TodoController.show')
    Route.put('/:id', 'TodoController.update')
    Route.delete('/:id', 'TodoController.destroy')
}).prefix('api/v1/todos').middleware(['auth'])

Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.get('', 'AuthController.show').middleware('auth')
    Route.post('/logout', 'AuthController.logout').middleware('auth')
}).prefix('api/v1/users')




