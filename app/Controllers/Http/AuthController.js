'use strict'

const User = use('App/Models/User');

const { validateAll } = use('Validator')

const Hash = use('Hash')

const Event = use('Event')

class AuthController {
    
  async register ({request, response, auth}){
    const rules = {
      name: 'required|min:3|unique:users',
      phone: 'required|min:10|max:10|unique:users',
      password: 'required|min:6'
    }
      
    const messages = {
      'name.required': 'Name is required',
      'name.min': 'Name should not be less than 3 characters',
      'name.unique': 'That user name is already registered',
      'phone.required': 'Phone number is required',
      'phone.min': 'Phone number should be of 10 digits',
      'phone.max': 'Phone number should be of 10 digits',
      'phone.unique': 'User already registered with this number.',
      'password.required': 'password is required',
      'password.min': 'password should not be less than 6 charcters',      
    }

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()){
      return validation.messages()
    }
    const user = await User.create(request.only(['name','phone','password']));
    let token = await auth.generate(user)
    Object.assign(user, token)

    //firing a event when user register
    Event.fire('new::user', user)

    return response.json(user)
  }

  async login ({request, response, auth}){
    const { phone, password } =  request.all()
    try {
      if (await auth.attempt(phone, password)) {
        let user = await User.findBy('phone', phone)
        let token = await auth.generate(user)
        Object.assign(user, token)
        return response.json(user)
      }
    }
    catch (e) {
      console.log(e)
      return response.json({message: 'You are not registered!'})
    }
  }

  async show({resquest, response, auth}){
    const { id } = auth.user
    const user = await User.query().with('todos').where('id',id ).fetch()
    return response.json(user)
  }

  async logout ({resquest,auth, response}){
    const { id } = auth.user
    const user = await User.find(id)
    const logout = await auth.authenticator('jwt').revokeTokensForUser(user)
    return response.json({logout: logout, msg:'user logged out'})
  }

}

module.exports = AuthController
