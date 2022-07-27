import {addTodolistAC, todolistsReducer} from './TodolistsReducer';
import {TasksStateType, TodolistType} from '../../App';
import {tasksReducer} from './TasksReducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistID);
    expect(idFromTodoLists).toBe(action.payload.todolistID);
});
