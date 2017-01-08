import React from 'react';
import {compose} from 'redux';
import {DragSource, DropTarget} from 'react-dnd';

import ItemTypes from '../constants/itemTypes';

const Task = ({
  connectDragSource, connectDropTarget, isDragging, isOver,
  onMove, id, children, ...props
 }) => {
   return compose(connectDragSource, connectDropTarget)(
     <div style={{
       opacity: isDragging || isOver ? 0 : 1
     }} {...props}>{children}</div>
   );
};

const taskSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
};

const taskTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
};

export default compose(
  DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.TASK, taskTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))
)(Task)
