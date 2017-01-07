import React from 'react';
import uuid from 'uuid';
import Tasks from './Tasks';
import connect from '../libs/connect'

import TaskActions from '../actions/TaskActions'
class App extends React.Component {
  render() {
    const {tasks} = this.props;

    return (
      <div className="ui container">
        <link rel="stylesheet" type="text/css" href="/app/semantic-ui/semantic.min.css" />
        <script src="/app/semantic-ui/semantic.min.js"></script>
        <h1 className="ui header">Kanban Backlog</h1>
        <button className="ui blue icon button" onClick={this.addTask}><i className="add icon"></i>Task</button>
        <Tasks
          tasks={tasks}
          onTaskClick={this.activateTaskEdit}
          onEdit={this.editTask}
          onDelete={this.deleteTask}
          />
      </div>
    );
  }

  addTask = () => {
    this.props.TaskActions.create({
      id: uuid.v4(),
      name: 'Ow yeah baby'
    });
  }

  deleteTask = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();
    this.props.TaskActions.delete(id);
  }

  activateTaskEdit = (id) => {
    this.props.TaskActions.update({id, editing: true});
  }

  editTask = (id, name) => {
      const {TaskActions} = this.props;
      TaskActions.update({id, name, editing: false});
  }

}

export default connect(({tasks}) => ({
  tasks
}), {
  TaskActions
})(App)

// Debug settings

// log all alt stuff to console
//alt.dispatcher.register(console.log.bind(console));
