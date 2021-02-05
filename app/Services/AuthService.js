const InvalidAccessException = use('App/exceptions/InvalidAccessException');
const NotFoundException = use('App/exceptions/NotFoundException');

class AuthService {

  verifyPermission(resource, user) {

    if(!resource) {
      throw new NotFoundException();
    }

    if (resource.user_id !== user.id) {
      throw new InvalidAccessException();

    }

  }
}

module.exports = new AuthService();
