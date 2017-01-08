
import storage from '../../libs/storage';
import persist from '../../libs/persist';

import TaskStore from '../../stores/TaskStore';
import LaneStore from '../../stores/LaneStore';

export default alt => {
  alt.addStore('TaskStore', TaskStore);
  alt.addStore('LaneStore', LaneStore);
  persist(alt, storage(localStorage), 'app');
}
