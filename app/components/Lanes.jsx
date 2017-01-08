import React from 'react';
import Lane from './Lane';

export default ({lanes}) => (
  <div className="ui sixteen column grid">{lanes.map(lane =>
    <Lane className="four wide column lane" key={lane.id} lane={lane} />
  )}</div>
)
