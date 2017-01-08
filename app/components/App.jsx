import _ from 'lodash'
import React from 'react';
import { Grid, Image } from 'semantic-ui-react'
import uuid from 'uuid';

import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import connect from '../libs/connect';
import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';

const App = ({LaneActions, lanes}) => {
  const addLane = () => {
    LaneActions.create({
      id: uuid.v4(),
      name: 'New lane'
    });
  };

  return (
    <div className="ui basic segment">
      {/* <link rel="stylesheet" type="text/css" href="/app/semantic-ui/semantic.min.css" /> */}
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.css" />
      {/* <script src="/app/semantic-ui/semantic.min.js"></script> */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.js"></script>
      <h1 className="ui header">Kanban board</h1>
      <button className="ui blue icon button" onClick={addLane}><i className="add icon"></i>Lane</button>
      <div className="ui hidden divider" />
      <Lanes lanes={lanes} />
    </div>
  );
};

export default compose(
  DragDropContext(HTML5Backend),
  connect(({lanes}) => ({
    lanes
  }), {
    LaneActions
  })
)(App)
