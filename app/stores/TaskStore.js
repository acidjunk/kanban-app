import uuid from 'uuid'

import TaskActions from '../actions/TaskActions';


export default class TaskStore {
  constructor() {

    this.bindActions(TaskActions);

    this.tasks = [
      {
        id: uuid.v4(),
        name: 'Implement a react scrumboard'
      },
      {
        id: uuid.v4(),
        name: 'Implement a react backlog'
      },
      {
        id: uuid.v4(),
        name: 'Fix the semantic-ui fluid text input'
      },
      {
        id: uuid.v4(),
        name: 'Fix saving a tasks to the backend'
      },
      {
        id: uuid.v4(),
        name: 'Implement the nested story/task model'
      },
      {
        id: uuid.v4(),
        name: 'Populate all components with live data from the backend'
      },
      {
        id: uuid.v4(),
        name: 'Add the missings fields to the react model: status, description, etc.'
      },
      {
        id: uuid.v4(),
        name: 'Make it possible to mark a task as done'
      },
      {
        id: uuid.v4(),
        name: 'Implement drag and drop in the backlog'
      },
      {
        id: uuid.v4(),
        name: 'Implement a way to search in the backlog'
      },
      {
        id: uuid.v4(),
        name: 'Finish the kanban implementation'
      }
    ];
  }

  create(task) {
    console.log('create task', task);
    this.setState({
      tasks: this.tasks.concat(task)
    });
  }
  update(updatedTask) {
    console.log('update task', updatedTask);
    this.setState({
      tasks: this.tasks.map(task => {
        if(task.id === updatedTask.id) {
          return Object.assign({}, task, updatedTask);
        }

        return task;
      })
    });
  }

  delete(id) {
    console.log('delete task', id);
    this.setState({
      tasks: this.tasks.filter(task => task.id !== id)
    });
  }

}
