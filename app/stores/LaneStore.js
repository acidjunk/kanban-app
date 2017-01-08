import LaneActions from '../actions/LaneActions';

export default class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [];
  }
  create(lane) {
    // If `notes` aren't provided for some reason,
    // default to an empty array.
    lane.tasks = lane.tasks || [];
    // Todo: filter on tasks without a story and add stories also

    this.setState({
      lanes: this.lanes.concat(lane)
    });
  }

  update(updatedLane) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.id === updatedLane.id) {
          return Object.assign({}, lane, updatedLane);
        }

        return lane;
      })
    });
  }

  delete(id) {
    this.setState({
      lanes: this.lanes.filter(lane => lane.id !== id)
    });
  }
  
  attachToLane({laneId, taskId}) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.tasks.includes(taskId)) {
          lane.tasks = lane.tasks.filter(task => task !== taskId);
        }

        if(lane.id === laneId) {
          lane.tasks = lane.tasks.concat([taskId]);
        }

        return lane;
      })
    });
  }

  detachFromLane({laneId, taskId}) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.id === laneId) {
          lane.tasks = lane.tasks.filter(task => task !== taskId);
        }

        return lane;
      })
    });
  }

}
