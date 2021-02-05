'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  // Users
  Route.post('user', 'UserController.store');
  Route.post('login', 'UserController.login');

  // Projects
  Route.get('projects', 'ProjectController.index').middleware('auth');
  Route.post('projects', 'ProjectController.create').middleware('auth');
  Route.delete('projects/:id', 'ProjectController.destroy').middleware('auth');
  Route.put('projects/:id', 'ProjectController.update').middleware('auth');

  // Tasks
  Route.post('projects/:id/task', 'TaskController.create').middleware('auth');
  Route.get('projects/:id/task', 'TaskController.index').middleware('auth');
  Route.put('task/:id', 'TaskController.update').middleware('auth');
  Route.delete('task/:id', 'TaskController.destroy').middleware('auth');
}).prefix('api/v1');

