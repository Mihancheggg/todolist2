import {TaskType} from '../../Todolist';
import {TasksStateType} from '../../App';
import {v1} from 'uuid';
import {addTodolistACType, removeTodolistACType} from './TodolistsReducer';

const initialState: TasksStateType = {

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionCreatorsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.taskTitle, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? ({
                    ...el,
                    isDone: action.payload.isDone
                }) : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? ({
                    ...el,
                    title: action.payload.title
                }) : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.payload.todolistID]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            /*let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState*/
            let {[action.payload.todolistId]:[], ...rest} = {...state}
            return rest
        }
        default: {
            return state
        }
    }
};

type ActionCreatorsType = RemoveTaskActionCreatorType
    | AddTaskActionCreatorType
    | ChangeTaskStatusActionCreatorType
    | ChangeTaskTitleActionCreatorType
    | addTodolistACType
    | removeTodolistACType

type RemoveTaskActionCreatorType = ReturnType<typeof removeTaskActionCreator>

type AddTaskActionCreatorType = ReturnType<typeof addTaskActionCreator>

type ChangeTaskStatusActionCreatorType = ReturnType<typeof changeTaskStatusActionCreator>

type ChangeTaskTitleActionCreatorType = ReturnType<typeof changeTaskTitleActionCreator>

export const removeTaskActionCreator = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId: taskId,
            todolistId: todolistId
        }
    } as const
}

export const addTaskActionCreator = (taskTitle: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            taskTitle: taskTitle,
            todolistId: todolistId
        }
    } as const
}

export const changeTaskStatusActionCreator = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId: taskId,
            isDone: isDone,
            todolistId: todolistId
        }
    } as const
}

export const changeTaskTitleActionCreator = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId: taskId,
            title: title,
            todolistId: todolistId
        }
    } as const
}