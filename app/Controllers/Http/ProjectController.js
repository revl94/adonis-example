'use strict'

const Project = use('App/Models/Project');
const AuthService = use('App/Services/AuthService');

class ProjectController {

  // Get all
 async index({ auth }) {

   // check token and return the user
    const user = await auth.getUser();

    return await user.projects().fetch();
  }

  async create({ auth, request }) {
    const user = await auth.getUser();
    const { name } = request.all();

    const project = new Project();

    project.fill({
      name
    })
    await user.projects().save(project);

    return project;
  }

  async update({ auth, params, request }) {

    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);

    AuthService.verifyPermission( project, user )
    const { name } = request.all();
    project.merge({ name });
    await project.save();

    return project;

  }

  async destroy({ auth, params }) {

    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);

    AuthService.verifyPermission( project, user )
    await project.delete();

    return project;

  }
}

module.exports = ProjectController
