
import storage from '../../libs/storage';
import persist from '../../libs/persist';
import TaskStore from '../../stores/TaskStore';

export default alt => {
  alt.addStore('TaskStore', TaskStore);
  persist(alt, storage(localStorage), 'app');
}
