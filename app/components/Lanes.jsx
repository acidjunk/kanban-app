import React from 'react';
import Lane from './Lane';

export default ({lanes}) => (
  <div className="ui six column grid lanes">{lanes.map(lane =>
    <Lane className="column lane" key={lane.id} lane={lane} />
  )}</div>
)
