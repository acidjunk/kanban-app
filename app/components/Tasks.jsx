import React from 'react';
import Task from './Task';
import Editable from './Editable';

export default ({
  tasks,
  onTaskClick=() => {}, onEdit=() => {}, onDelete=() => {}
}) => (
    <div className="ui segment">
      <div className="ui relaxed divided list">{tasks.map(({id, editing, name}) =>
        <div className="item" key={id}>
          <Task onClick={onTaskClick.bind(null, id)}>
            <Editable
               editing={editing}
               value={name}
               onEdit={onEdit.bind(null, id)} />
            <div className="right floated content">
              <button className="ui red mini icon button" onClick={onDelete.bind(null, id)}>
                <i className="trash icon"></i>
              </button>
            </div>
          </Task>
        </div>
      )}</div>
  </div>
)
