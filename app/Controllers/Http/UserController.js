'use strict'

const User = use('App/Models/User');

class UserController {

  async login({ request, auth}) {
    const { username, email, password} = request.all();
    console.log(username, email, password)
    return await auth.attempt(email, password);

  }

  async store({ request }) {
    const { username, email, password} = request.all();
    console.log(username, email, password)

    const user = await User.create({
      username,
      email,
      password
    });
    return this.login(...arguments)
  };
}

module.exports = UserController
