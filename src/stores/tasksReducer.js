import { saveToLocalStorage, StorageEnum } from "../utils";
import ActionEnum from "./ActionEnum";
import { Task } from "./Task";
export const tasksReducer = (tasks, action) => {
  // tasks list sau khi thay đổi
  let newTasks = tasks;
  switch (action.type) {
    case ActionEnum.ADD_TASK: // payload is object
      newTasks = [...tasks, action.payload];
      break;
    case ActionEnum.REMOVE_TASK: // payload is id
      newTasks = tasks
        .filter(
          (
            task // xóa task được chọn
          ) => task.id !== action.payload
        )
        .map((task, index) => {
          // đánh số lại id
          return new Task({ ...task, id: index + 1 });
        });
      break;
    case ActionEnum.TOGGLE_TASK: //payload is id
      newTasks = tasks.map((task) => {
        if (task.id !== action.payload) return task;
        return new Task({ ...task, isDone: !task.isDone });
      });
      break;
    case ActionEnum.CHANGE_TASK: // payload is an object
      newTasks = tasks.map((task) => {
        if (task.id !== action.payload.id) return task;
        return action.payload;
      });
      break;
    // check quá hạn
    case ActionEnum.SET_OVERDUE: // payload is id
      newTasks = tasks.map((task) => {
        if (task.id !== action.payload) return task;
        task.isOverdue = true;
        return task;
      })
    default:
      newTasks = tasks;
      break;
  }
  saveToLocalStorage({ key: StorageEnum.TASKS_LIST, value: newTasks });
  return newTasks;
};