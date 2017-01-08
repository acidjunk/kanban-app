import React from 'react';

import {compose} from 'redux';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

import connect from '../libs/connect';
import TaskActions from '../actions/TaskActions';
import LaneActions from '../actions/LaneActions';
import Tasks from './Tasks';
import LaneHeader from './LaneHeader';

const Lane = ({
  connectDropTarget, lane, tasks, LaneActions, TaskActions, ...props
}) => {
  const editTask = (id, name) => {
    TaskActions.update({id, name, editing: false});
  };

  const deleteTask = (taskId, e) => {
    e.stopPropagation();
    LaneActions.detachFromLane({
      laneId: lane.id,
      taskId
    });
    TaskActions.delete(taskId);
  };
  const activateTaskEdit = id => {
    TaskActions.update({id, editing: true});
  };

  return connectDropTarget(
    <div {...props}>
      <LaneHeader lane={lane} />
      <Tasks
        tasks={selectTasksByIds(tasks, lane.tasks)}
        onTaskClick={activateTaskEdit}
        onEdit={editTask}
        onDelete={deleteTask} />
    </div>
  );
};

function selectTasksByIds(allTasks, taskIds = []) {
  // `reduce` is a powerful method that allows us to
  // fold data. You can implement `filter` and `map`
  // through it. Here we are using it to concatenate
  // notes matching to the ids.
  return taskIds.reduce((tasks, id) =>
    // Concatenate possible matching ids to the result
    tasks.concat(
      allTasks.filter(task => task.id === id)
    )
  , []);
}

const taskTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    // If the target lane doesn't have tasks,
    // attach the task to it.
    //
    // `attachToLane` performs necessarly
    // cleanup by default and it guarantees
    // a note can belong only to a single lane
    // at a time.
    if(!targetProps.lane.tasks.length) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        taskId: sourceId
      });
    }
  }
};

export default compose(
  DropTarget(ItemTypes.TASK, taskTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  connect(({tasks}) => ({
    tasks
  }), {
    TaskActions,
    LaneActions
  })
)(Lane)
