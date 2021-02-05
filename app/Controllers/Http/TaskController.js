'use strict'

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const AuthService = use('App/Services/AuthService');

class TaskController {

  /**
   * @swagger
   * api/hello/:
   *   get:
   *     tags:
   *       - Test
   *     summary: Sample API
   *     parameters:
   *       - name: name
   *         description: Name of the user
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */

  async index({ request, auth, params }) {

    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);
    AuthService.verifyPermission(project, user);

    return await project.tasks().fetch();

  }


  async create({ auth, request, params}) {

    const user = await auth.getUser();
    const { description } = request.all();
    const { id } = params;
    const project = await Project.find(id);
    AuthService.verifyPermission(project, user);
    const task = new Task();
    task.fill({
      description
    });
    await project.tasks().save(task);
    return task;

  }

  async update({ auth, params, request }) {

    const user = await auth.getUser();
    const { id } = params;
    const task = await Task.find(id);
    const project = await task.project().fetch();
    AuthService.verifyPermission(project, user);

    const { description, completed } = request.all();
    task.merge({ description, completed });

    await task.save();

    return task;

  }

  async destroy({ auth, params }) {

    const user = await auth.getUser();
    const { id } = params;
    const task = await Task.find(id);
    const project = await task.project().fetch();
    AuthService.verifyPermission(project, user);

    await task.delete();

    return task;

  }
}

module.exports = TaskController
