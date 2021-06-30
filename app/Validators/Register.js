'use strict'

class Register {
  get rules () {
    return {
      Username: 'required|min:3|unique:users',
      email: 'required|min:10|max:10|unique:users',
      Password: 'required|min:6|confirmed'
    }
  }
  get messages () {
    return {
      'Username.required': 'Name is required',
      'Username.min': 'Name should not be less than 3 characters',
      'Username.unique': 'That user name is already registered',
      'email.required': 'Phone number is required',
      'email.min': 'Phone number should be of 10 digits',
      'email.max': 'Phone number should be of 10 digits',
      'email.unique': 'User already registered with this number.',
      'Password.required': 'Password is required',
      'Password.min': 'Password should not be less than 6 charcters',
      'Password.confirmed': 'Password field is do not matched!',
    }
  }
}

module.exports = Register
const rules = {
  username: 'required|min:3|unique:users',
  email: 'required|min:10|max:10|unique:users',
  password: 'required|min:6|confirmed'
}

const messages = {
  'username.required': 'Name is required',
  'username.min': 'Name should not be less than 3 characters',
  'username.unique': 'That user name is already registered',
  'email.required': 'Phone number is required',
  'email.min': 'Phone number should be of 10 digits',
  'email.max': 'Phone number should be of 10 digits',
  'email.unique': 'User already registered with this number.',
  'password.required': 'password is required',
  'password.min': 'password should not be less than 6 charcters',
  'password.confirmed': 'password field is do not matched!',

}
const validation = await validate(request.all(), rules, messages);

if (validation.fails()){
  return validation.messages()
}