import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import TaskActions from '../actions/TaskActions';
import LaneActions from '../actions/LaneActions';

import Editable from './Editable';

export default connect(() => ({}), {
  TaskActions,
  LaneActions
})(({lane, LaneActions, TaskActions, ...props}) => {
  const addTask = e => {
    e.stopPropagation();

    const taskId = uuid.v4();

    TaskActions.create({
      id: taskId,
      name: 'New task'
    });
    LaneActions.attachToLane({
      laneId: lane.id,
      taskId
    });
  };

  const activateLaneEdit = () => {
    LaneActions.update({
      id: lane.id,
      editing: true
    });
  };
  const editName = name => {
    LaneActions.update({
      id: lane.id,
      name,
      editing: false
    });
  };

  const deleteLane = e => {
    // Avoid bubbling to edit
    e.stopPropagation();
    LaneActions.delete(lane.id);
  };

  return (
    <div className="lane-header" onClick={activateLaneEdit} {...props}>
      <h2 className="ui header">
      <Editable className="lane-name" editing={lane.editing}
        value={lane.name} onEdit={editName} /></h2>
      <button className="ui icon button" onClick={addTask}><i className='add icon'></i> task</button>
      <button className="ui icon button" onClick={deleteLane}><i className='trash icon'></i> lane</button>
    </div>
  );
})
